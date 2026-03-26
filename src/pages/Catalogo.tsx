import { useState, useEffect, useCallback, useMemo } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { CategoriaCard } from "@/components/catalogo/CategoriaCard";
import { SubcategoriaCard } from "@/components/catalogo/SubcategoriaCard";
import { ProdutoPaiCard } from "@/components/catalogo/ProdutoPaiCard";
import { KitComboCard } from "@/components/catalogo/KitComboCard";
import { CategoriaDialog } from "@/components/catalogo/CategoriaDialog";
import { SubcategoriaDialog } from "@/components/catalogo/SubcategoriaDialog";
import { ProdutoDialog } from "@/components/catalogo/ProdutoDialog";
import { KitComboDialog } from "@/components/catalogo/KitComboDialog";
import {
  categoriasMock, subcategoriasMock, produtosMock, variantesMock, kitCombosMock,
  type CatalogCategoria, type CatalogSubcategoria, type CatalogProduto, type CatalogVariante, type KitCombo,
} from "@/components/catalogo/mockCatalogoData";

export default function Catalogo() {
  const { setOpen } = useSidebar();
  useEffect(() => { setOpen(false); }, [setOpen]);

  const [categorias, setCategorias] = useState<CatalogCategoria[]>(categoriasMock);
  const [subcategorias, setSubcategorias] = useState<CatalogSubcategoria[]>(subcategoriasMock);
  const [produtos, setProdutos] = useState<CatalogProduto[]>(produtosMock);
  const [variantes, setVariantes] = useState<CatalogVariante[]>(variantesMock);
  const [kits, setKits] = useState<KitCombo[]>(kitCombosMock);

  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [expandedProdId, setExpandedProdId] = useState<string | null>(null);
  const [busca, setBusca] = useState("");

  // Dialog states
  const [catDialog, setCatDialog] = useState<{ open: boolean; edit: CatalogCategoria | null }>({ open: false, edit: null });
  const [subDialog, setSubDialog] = useState<{ open: boolean; edit: CatalogSubcategoria | null }>({ open: false, edit: null });
  const [prodDialog, setProdDialog] = useState<{ open: boolean; edit: CatalogProduto | null; editVars: CatalogVariante[] }>({ open: false, edit: null, editVars: [] });
  const [kitDialog, setKitDialog] = useState<{ open: boolean; edit: KitCombo | null }>({ open: false, edit: null });
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; type: string; id: string }>({ open: false, type: "", id: "" });

  // CRUD callbacks
  const saveCat = useCallback((cat: CatalogCategoria) => {
    setCategorias((prev) => {
      const idx = prev.findIndex((c) => c.id === cat.id);
      return idx >= 0 ? prev.map((c, i) => (i === idx ? cat : c)) : [...prev, cat];
    });
  }, []);

  const saveSub = useCallback((sub: CatalogSubcategoria) => {
    setSubcategorias((prev) => {
      const idx = prev.findIndex((s) => s.id === sub.id);
      return idx >= 0 ? prev.map((s, i) => (i === idx ? sub : s)) : [...prev, sub];
    });
  }, []);

  const saveProduto = useCallback((prod: CatalogProduto, vars: CatalogVariante[]) => {
    setProdutos((prev) => {
      const idx = prev.findIndex((p) => p.id === prod.id);
      return idx >= 0 ? prev.map((p, i) => (i === idx ? prod : p)) : [...prev, prod];
    });
    setVariantes((prev) => [...prev.filter((v) => v.produtoId !== prod.id), ...vars]);
  }, []);

  const saveKit = useCallback((kit: KitCombo) => {
    setKits((prev) => {
      const idx = prev.findIndex((k) => k.id === kit.id);
      return idx >= 0 ? prev.map((k, i) => (i === idx ? kit : k)) : [...prev, kit];
    });
  }, []);

  const confirmDelete = useCallback(() => {
    const { type, id } = deleteConfirm;
    if (type === "categoria") {
      setCategorias((p) => p.filter((c) => c.id !== id));
      if (selectedCatId === id) { setSelectedCatId(null); setSelectedSubId(null); }
    } else if (type === "subcategoria") {
      setSubcategorias((p) => p.filter((s) => s.id !== id));
      if (selectedSubId === id) setSelectedSubId(null);
    } else if (type === "produto") {
      setProdutos((p) => p.filter((pr) => pr.id !== id));
      setVariantes((p) => p.filter((v) => v.produtoId !== id));
    } else if (type === "variante") {
      setVariantes((p) => p.filter((v) => v.id !== id));
    } else if (type === "kit") {
      setKits((p) => p.filter((k) => k.id !== id));
    }
    setDeleteConfirm({ open: false, type: "", id: "" });
  }, [deleteConfirm, selectedCatId, selectedSubId]);

  const toggleDestaque = useCallback((id: string) => {
    setProdutos((prev) => prev.map((p) => p.id === id ? { ...p, destaque: !p.destaque } : p));
  }, []);

  // Search filtering
  const buscaLower = busca.toLowerCase().trim();
  const isSearching = buscaLower.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return produtos.filter((p) => {
      if (p.nome.toLowerCase().includes(buscaLower)) return true;
      if (p.descricao.toLowerCase().includes(buscaLower)) return true;
      const prodVars = variantes.filter((v) => v.produtoId === p.id);
      return prodVars.some((v) =>
        v.nome.toLowerCase().includes(buscaLower) ||
        v.tags.some((t) => t.toLowerCase().includes(buscaLower))
      );
    });
  }, [isSearching, buscaLower, produtos, variantes]);

  const filteredSubs = subcategorias.filter((s) => s.categoriaId === selectedCatId);
  const filteredProds = isSearching ? searchResults : produtos.filter((p) => p.subcategoriaId === selectedSubId);

  const showProducts = isSearching || selectedSubId;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="produtos" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Catálogo</h1>
            <TabsList>
              <TabsTrigger value="produtos">Produtos</TabsTrigger>
              <TabsTrigger value="kits">Kits e Combos</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="produtos" className="space-y-4">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, descrição ou tag..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-9 pr-9"
              />
              {busca && (
                <button onClick={() => setBusca("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Categories */}
            {!isSearching && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-semibold text-foreground">Categorias</h2>
                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setCatDialog({ open: true, edit: null })}>
                      <Plus className="mr-1 h-3 w-3" /> Nova
                    </Button>
                  </div>
                  <ScrollArea className="w-full">
                    <div className="flex gap-1 pb-2">
                      {categorias.map((cat) => (
                        <CategoriaCard
                          key={cat.id}
                          categoria={cat}
                          selected={selectedCatId === cat.id}
                          onSelect={(id) => { setSelectedCatId(id === selectedCatId ? null : id); setSelectedSubId(null); setExpandedProdId(null); }}
                          onEdit={(c) => setCatDialog({ open: true, edit: c })}
                          onDelete={(id) => setDeleteConfirm({ open: true, type: "categoria", id })}
                        />
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>

                {/* Subcategories */}
                {selectedCatId && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-sm font-semibold text-foreground">Subcategorias</h2>
                      <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setSubDialog({ open: true, edit: null })}>
                        <Plus className="mr-1 h-3 w-3" /> Nova
                      </Button>
                    </div>
                    <ScrollArea className="w-full">
                      <div className="flex gap-1.5 pb-2">
                        {filteredSubs.map((sub) => (
                          <SubcategoriaCard
                            key={sub.id}
                            subcategoria={sub}
                            selected={selectedSubId === sub.id}
                            onSelect={(id) => { setSelectedSubId(id === selectedSubId ? null : id); setExpandedProdId(null); }}
                            onEdit={(s) => setSubDialog({ open: true, edit: s })}
                            onDelete={(id) => setDeleteConfirm({ open: true, type: "subcategoria", id })}
                          />
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                )}
              </>
            )}

            {/* Products grid */}
            {showProducts && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-foreground">
                    {isSearching ? `Resultados (${filteredProds.length})` : "Produtos"}
                  </h2>
                  {!isSearching && (
                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setProdDialog({ open: true, edit: null, editVars: [] })}>
                      <Plus className="mr-1 h-3 w-3" /> Novo
                    </Button>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {filteredProds.map((prod) => (
                    <ProdutoPaiCard
                      key={prod.id}
                      produto={prod}
                      variantes={variantes.filter((v) => v.produtoId === prod.id)}
                      expanded={expandedProdId === prod.id}
                      onToggleExpand={(id) => setExpandedProdId(id === expandedProdId ? null : id)}
                      onEdit={(p) => setProdDialog({ open: true, edit: p, editVars: variantes.filter((v) => v.produtoId === p.id) })}
                      onDelete={(id) => setDeleteConfirm({ open: true, type: "produto", id })}
                      onToggleDestaque={toggleDestaque}
                      onEditVariante={(v) => {
                        const prod2 = produtos.find((p) => p.id === v.produtoId);
                        if (prod2) setProdDialog({ open: true, edit: prod2, editVars: variantes.filter((vv) => vv.produtoId === prod2.id) });
                      }}
                      onDeleteVariante={(id) => setDeleteConfirm({ open: true, type: "variante", id })}
                    />
                  ))}
                  {filteredProds.length === 0 && (
                    <p className="col-span-full text-center py-8 text-muted-foreground">
                      {isSearching ? "Nenhum produto encontrado." : "Nenhum produto nesta subcategoria."}
                    </p>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="kits" className="space-y-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">Kits e Combos</h2>
              <Button size="sm" onClick={() => setKitDialog({ open: true, edit: null })}>
                <Plus className="mr-1 h-4 w-4" /> Novo Kit/Combo
              </Button>
            </div>
            <div className="space-y-3">
              {kits.map((kit) => (
                <KitComboCard
                  key={kit.id}
                  kit={kit}
                  onEdit={(k) => setKitDialog({ open: true, edit: k })}
                  onDelete={(id) => setDeleteConfirm({ open: true, type: "kit", id })}
                />
              ))}
              {kits.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">Nenhum kit ou combo cadastrado.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <CategoriaDialog open={catDialog.open} onClose={() => setCatDialog({ open: false, edit: null })} onSave={saveCat} editItem={catDialog.edit} />
      <SubcategoriaDialog open={subDialog.open} onClose={() => setSubDialog({ open: false, edit: null })} onSave={saveSub} editItem={subDialog.edit} categoriaId={selectedCatId || ""} />
      <ProdutoDialog
        open={prodDialog.open} onClose={() => setProdDialog({ open: false, edit: null, editVars: [] })}
        onSave={saveProduto} editProduto={prodDialog.edit} editVariantes={prodDialog.editVars}
        categoriaId={selectedCatId || ""} subcategoriaId={selectedSubId || ""}
      />
      <KitComboDialog open={kitDialog.open} onClose={() => setKitDialog({ open: false, edit: null })} onSave={saveKit} editItem={kitDialog.edit} subcategorias={subcategorias} />
      <AlertDialog open={deleteConfirm.open} onOpenChange={(o) => !o && setDeleteConfirm({ open: false, type: "", id: "" })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

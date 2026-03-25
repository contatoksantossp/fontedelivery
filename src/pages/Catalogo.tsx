import { useState, useEffect, useCallback } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  // Dialog states
  const [catDialog, setCatDialog] = useState<{ open: boolean; edit: CatalogCategoria | null }>({ open: false, edit: null });
  const [subDialog, setSubDialog] = useState<{ open: boolean; edit: CatalogSubcategoria | null }>({ open: false, edit: null });
  const [prodDialog, setProdDialog] = useState<{ open: boolean; edit: CatalogProduto | null; editVars: CatalogVariante[] }>({ open: false, edit: null, editVars: [] });
  const [kitDialog, setKitDialog] = useState<{ open: boolean; edit: KitCombo | null }>({ open: false, edit: null });
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; type: string; id: string }>({ open: false, type: "", id: "" });

  // Category CRUD
  const saveCat = useCallback((cat: CatalogCategoria) => {
    setCategorias((prev) => {
      const idx = prev.findIndex((c) => c.id === cat.id);
      return idx >= 0 ? prev.map((c, i) => (i === idx ? cat : c)) : [...prev, cat];
    });
  }, []);

  // Subcategory CRUD
  const saveSub = useCallback((sub: CatalogSubcategoria) => {
    setSubcategorias((prev) => {
      const idx = prev.findIndex((s) => s.id === sub.id);
      return idx >= 0 ? prev.map((s, i) => (i === idx ? sub : s)) : [...prev, sub];
    });
  }, []);

  // Product CRUD
  const saveProduto = useCallback((prod: CatalogProduto, vars: CatalogVariante[]) => {
    setProdutos((prev) => {
      const idx = prev.findIndex((p) => p.id === prod.id);
      return idx >= 0 ? prev.map((p, i) => (i === idx ? prod : p)) : [...prev, prod];
    });
    setVariantes((prev) => [...prev.filter((v) => v.produtoId !== prod.id), ...vars]);
  }, []);

  // Kit CRUD
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

  const filteredSubs = subcategorias.filter((s) => s.categoriaId === selectedCatId);
  const filteredProds = produtos.filter((p) => p.subcategoriaId === selectedSubId);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="produtos" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">Catálogo</h1>
            <TabsList>
              <TabsTrigger value="produtos">Produtos</TabsTrigger>
              <TabsTrigger value="kits">Kits e Combos</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="produtos" className="space-y-6">
            {/* Level 1: Categorias */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-foreground">Categorias</h2>
                <Button size="sm" onClick={() => setCatDialog({ open: true, edit: null })}>
                  <Plus className="mr-1 h-4 w-4" /> Nova Categoria
                </Button>
              </div>
              <ScrollArea className="w-full">
                <div className="flex gap-4 pb-2">
                  {categorias.map((cat) => (
                    <CategoriaCard
                      key={cat.id}
                      categoria={cat}
                      selected={selectedCatId === cat.id}
                      onSelect={(id) => { setSelectedCatId(id === selectedCatId ? null : id); setSelectedSubId(null); }}
                      onEdit={(c) => setCatDialog({ open: true, edit: c })}
                      onDelete={(id) => setDeleteConfirm({ open: true, type: "categoria", id })}
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            {/* Level 2: Subcategorias */}
            {selectedCatId && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold text-foreground">Subcategorias</h2>
                  <Button size="sm" variant="outline" onClick={() => setSubDialog({ open: true, edit: null })}>
                    <Plus className="mr-1 h-4 w-4" /> Nova Subcategoria
                  </Button>
                </div>
                <ScrollArea className="w-full">
                  <div className="flex gap-2 pb-2">
                    {filteredSubs.map((sub) => (
                      <SubcategoriaCard
                        key={sub.id}
                        subcategoria={sub}
                        selected={selectedSubId === sub.id}
                        onSelect={(id) => setSelectedSubId(id === selectedSubId ? null : id)}
                        onEdit={(s) => setSubDialog({ open: true, edit: s })}
                        onDelete={(id) => setDeleteConfirm({ open: true, type: "subcategoria", id })}
                      />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            )}

            {/* Level 3: Produtos */}
            {selectedSubId && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold text-foreground">Produtos</h2>
                  <Button size="sm" onClick={() => setProdDialog({ open: true, edit: null, editVars: [] })}>
                    <Plus className="mr-1 h-4 w-4" /> Novo Produto
                  </Button>
                </div>
                <div className="space-y-4">
                  {filteredProds.map((prod) => (
                    <ProdutoPaiCard
                      key={prod.id}
                      produto={prod}
                      variantes={variantes.filter((v) => v.produtoId === prod.id)}
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
                    <p className="text-center py-8 text-muted-foreground">Nenhum produto nesta subcategoria.</p>
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

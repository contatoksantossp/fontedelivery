import { useState, useMemo, Fragment } from "react";
import { categoriasMock, produtosMock, Produto, Variante } from "./mockPdvData";
import { ProdutoCard } from "./ProdutoCard";
import { VarianteDrawer } from "./VarianteDrawer";
import { ComboSlots } from "./ComboSlots";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface VitrineProps {
  onAddItem: (produto: Produto, variante: Variante, qty: number) => void;
}

export function Vitrine({ onAddItem }: VitrineProps) {
  const [busca, setBusca] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [categoriaId, setCategoriaId] = useState<string | null>(null);
  const [subcategoriaId, setSubcategoriaId] = useState<string | null>(null);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [comboSlots, setComboSlots] = useState<Array<{ produto: Produto; variante: Variante } | null>>([]);
  const [activeCombo, setActiveCombo] = useState<{ slots: number; desconto: number } | null>(null);

  const categoriaSelecionada = categoriasMock.find((c) => c.id === categoriaId);

  const produtosFiltrados = useMemo(() => {
    let lista = produtosMock;
    if (categoriaId) lista = lista.filter((p) => p.categoriaId === categoriaId);
    if (subcategoriaId) lista = lista.filter((p) => p.subcategoriaId === subcategoriaId);
    if (busca.trim()) {
      const term = busca.toLowerCase();
      lista = lista.filter(
        (p) => p.nome.toLowerCase().includes(term) || p.codigoBarras?.includes(term)
      );
    }
    return lista;
  }, [categoriaId, subcategoriaId, busca]);

  const handleExpand = (produtoId: string) => {
    setExpandedProductId((prev) => (prev === produtoId ? null : produtoId));
  };

  const handleAddVariante = (produto: Produto, variante: Variante, qty: number) => {
    // Close drawer after adding
    setExpandedProductId(null);

    // Check if we're filling combo slots
    if (activeCombo) {
      const emptyIdx = comboSlots.findIndex((s) => s === null);
      if (emptyIdx !== -1) {
        const newSlots = [...comboSlots];
        newSlots[emptyIdx] = { produto, variante };
        setComboSlots(newSlots);

        if (newSlots.every(Boolean)) {
          newSlots.forEach((slot) => {
            if (slot) onAddItem(slot.produto, slot.variante, 1);
          });
          setActiveCombo(null);
          setComboSlots([]);
        }
        return;
      }
    }

    // Check if product has combo config
    if (produto.comboConfig && !activeCombo) {
      setActiveCombo(produto.comboConfig);
      const slots = Array(produto.comboConfig.slots).fill(null);
      slots[0] = { produto, variante };
      setComboSlots(slots);
      return;
    }

    onAddItem(produto, variante, qty);
  };

  const handleRemoveSlot = (index: number) => {
    const newSlots = [...comboSlots];
    newSlots[index] = null;
    setComboSlots(newSlots);
    if (newSlots.every((s) => s === null)) {
      setActiveCombo(null);
      setComboSlots([]);
    }
  };

  // Build grid items with inline drawers
  const gridItems: Array<{ type: "product"; produto: Produto } | { type: "drawer"; produto: Produto }> = [];
  const cols = 3;
  for (let i = 0; i < produtosFiltrados.length; i++) {
    const p = produtosFiltrados[i];
    gridItems.push({ type: "product", produto: p });

    // If this product is expanded, insert drawer after current row
    if (expandedProductId === p.id) {
      // Fill remaining cols in this row with nothing — drawer goes next
      const posInRow = gridItems.filter((g) => g.type === "product").length;
      // We just need to insert the drawer; CSS col-span-3 handles positioning
      gridItems.push({ type: "drawer", produto: p });
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search + qty */}
      <div className="p-3 border-b border-border flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produto ou código..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
        <div className="flex items-center gap-1 border border-border rounded-md">
          <Button
            variant="ghost" size="icon"
            className="h-9 w-9"
            onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm font-medium w-6 text-center text-foreground">{quantidade}</span>
          <Button
            variant="ghost" size="icon"
            className="h-9 w-9"
            onClick={() => setQuantidade(quantidade + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Category cards */}
      <div className="px-3 pt-2 flex gap-2 overflow-x-auto">
        <button
          onClick={() => { setCategoriaId(null); setSubcategoriaId(null); setExpandedProductId(null); }}
          className={cn(
            "flex-shrink-0 flex flex-col items-center w-16 rounded-lg border p-1.5 transition-colors",
            !categoriaId ? "border-primary bg-primary/10" : "border-border bg-card hover:bg-secondary"
          )}
        >
          <div className="h-10 w-full rounded bg-muted flex items-center justify-center">
            <span className="text-[10px] text-muted-foreground">✦</span>
          </div>
          <span className="text-[10px] font-medium text-foreground mt-1 truncate w-full text-center">Todos</span>
        </button>
        {categoriasMock.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setCategoriaId(cat.id); setSubcategoriaId(null); setExpandedProductId(null); }}
            className={cn(
              "flex-shrink-0 flex flex-col items-center w-16 rounded-lg border p-1.5 transition-colors",
              categoriaId === cat.id ? "border-primary bg-primary/10" : "border-border bg-card hover:bg-secondary"
            )}
          >
            <img src={cat.foto || "/placeholder.svg"} alt={cat.nome} className="h-10 w-full rounded object-cover" />
            <span className="text-[10px] font-medium text-foreground mt-1 truncate w-full text-center">{cat.nome}</span>
          </button>
        ))}
      </div>

      {/* Subcategory pills with photo */}
      {categoriaSelecionada && (
        <div className="px-3 pt-1.5 flex gap-2 overflow-x-auto">
          <button
            onClick={() => { setSubcategoriaId(null); setExpandedProductId(null); }}
            className={cn(
              "flex-shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1 border transition-colors",
              !subcategoriaId ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="text-[11px] font-medium">Todos</span>
          </button>
          {categoriaSelecionada.subcategorias.map((sub) => (
            <button
              key={sub.id}
              onClick={() => { setSubcategoriaId(sub.id); setExpandedProductId(null); }}
              className={cn(
                "flex-shrink-0 flex items-center gap-1.5 rounded-full px-2 py-0.5 border transition-colors",
                subcategoriaId === sub.id ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              <img src={sub.foto || "/placeholder.svg"} alt={sub.nome} className="h-6 w-6 rounded-full object-cover" />
              <span className="text-[11px] font-medium whitespace-nowrap">{sub.nome}</span>
            </button>
          ))}
        </div>
      )}

      {/* Product grid with inline variant drawers */}
      <ScrollArea className="flex-1 p-3">
        <div className="grid grid-cols-3 gap-2">
          {produtosFiltrados.map((p) => (
            <Fragment key={p.id}>
              <ProdutoCard
                produto={p}
                quantidade={quantidade}
                expanded={expandedProductId === p.id}
                onAddVariante={handleAddVariante}
                onExpand={handleExpand}
              />
              {expandedProductId === p.id && (
                <VarianteDrawer
                  produto={p}
                  quantidade={quantidade}
                  onAddVariante={handleAddVariante}
                  onClose={() => setExpandedProductId(null)}
                />
              )}
            </Fragment>
          ))}
        </div>
        {produtosFiltrados.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-8">Nenhum produto encontrado</p>
        )}
      </ScrollArea>

      {/* Combo slots */}
      {activeCombo && (
        <ComboSlots
          comboConfig={activeCombo}
          filledSlots={comboSlots}
          onRemoveSlot={handleRemoveSlot}
        />
      )}
    </div>
  );
}

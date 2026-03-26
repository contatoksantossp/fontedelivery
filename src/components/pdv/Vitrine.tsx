import { useState, useMemo, useCallback, Fragment } from "react";
import { categoriasMock, produtosMock, kitCombosPdv, Produto, Variante, KitCombo } from "./mockPdvData";
import { ProdutoCard } from "./ProdutoCard";
import { VarianteDrawer } from "./VarianteDrawer";
import { KitBanner } from "./KitBanner";
import { KitSlotDrawer, SlotSelection } from "./KitSlotDrawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, Minus, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface VitrineProps {
  onAddItem: (produto: Produto, variante: Variante, qty: number) => void;
}

export function Vitrine({ onAddItem }: VitrineProps) {
  const [busca, setBusca] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [categoriaId, setCategoriaId] = useState<string | null>(null);
  const [subcategoriaId, setSubcategoriaId] = useState<string | null>(null);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

  // Kit/Combo state
  const [slotSelections, setSlotSelections] = useState<Record<string, SlotSelection[]>>({});
  const [expandedSlotId, setExpandedSlotId] = useState<string | null>(null);

  const categoriaSelecionada = categoriasMock.find((c) => c.id === categoriaId);

  // Find kit linked to current subcategory
  const kitAtivo = useMemo<KitCombo | null>(
    () => (subcategoriaId ? kitCombosPdv.find((k) => k.subcategoriaVinculo === subcategoriaId) ?? null : null),
    [subcategoriaId]
  );

  // Reset kit state when subcategory changes
  const handleSetSubcategoria = useCallback((subId: string | null) => {
    setSubcategoriaId(subId);
    setExpandedProductId(null);
    setSlotSelections({});
    setExpandedSlotId(null);
  }, []);

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

  // Main grid add (slot 1 when kit is active, or normal add)
  const handleAddVariante = useCallback((produto: Produto, variante: Variante, qty: number) => {
    setExpandedProductId(null);

    if (kitAtivo) {
      // Add to slot 1 (first slot)
      const slot1Id = kitAtivo.slots[0].id;
      setSlotSelections((prev) => {
        const current = prev[slot1Id] || [];
        const existing = current.find((s) => s.variante.id === variante.id);
        if (existing) {
          return {
            ...prev,
            [slot1Id]: current.map((s) =>
              s.variante.id === variante.id ? { ...s, quantidade: s.quantidade + qty } : s
            ),
          };
        }
        return { ...prev, [slot1Id]: [...current, { produto, variante, quantidade: qty }] };
      });
    } else {
      onAddItem(produto, variante, qty);
    }
  }, [kitAtivo, onAddItem]);

  // Slot drawer add
  const handleSlotAddItem = useCallback((slotId: string, produto: Produto, variante: Variante, qty: number) => {
    setSlotSelections((prev) => {
      const current = prev[slotId] || [];
      const existing = current.find((s) => s.variante.id === variante.id);
      if (existing) {
        return {
          ...prev,
          [slotId]: current.map((s) =>
            s.variante.id === variante.id ? { ...s, quantidade: s.quantidade + qty } : s
          ),
        };
      }
      return { ...prev, [slotId]: [...current, { produto, variante, quantidade: qty }] };
    });
  }, []);

  const handleSlotRemoveItem = useCallback((slotId: string, varianteId: string) => {
    setSlotSelections((prev) => ({
      ...prev,
      [slotId]: (prev[slotId] || []).filter((s) => s.variante.id !== varianteId),
    }));
  }, []);

  // Check if all slots have at least 1 item
  const allSlotsFilled = useMemo(() => {
    if (!kitAtivo) return false;
    return kitAtivo.slots.every((slot) => (slotSelections[slot.id]?.length ?? 0) > 0);
  }, [kitAtivo, slotSelections]);

  // Finalize kit — send all items to cart with discount
  const handleFinalizarKit = useCallback(() => {
    if (!kitAtivo) return;

    const allItems: Array<{ produto: Produto; variante: Variante; qty: number; preco: number }> = [];
    kitAtivo.slots.forEach((slot) => {
      (slotSelections[slot.id] || []).forEach((sel) => {
        allItems.push({ produto: sel.produto, variante: sel.variante, qty: sel.quantidade, preco: sel.variante.preco });
      });
    });

    if (kitAtivo.tipoDesconto === "%") {
      const factor = 1 - kitAtivo.valorDesconto / 100;
      allItems.forEach((item) => {
        const discountedVariante = { ...item.variante, preco: +(item.preco * factor).toFixed(2) };
        onAddItem(item.produto, discountedVariante, item.qty);
      });
    } else {
      // R$ discount distributed proportionally
      const total = allItems.reduce((a, i) => a + i.preco * i.qty, 0);
      allItems.forEach((item) => {
        const proportion = (item.preco * item.qty) / total;
        const itemDiscount = kitAtivo.valorDesconto * proportion / item.qty;
        const discountedVariante = { ...item.variante, preco: +(item.preco - itemDiscount).toFixed(2) };
        onAddItem(item.produto, discountedVariante, item.qty);
      });
    }

    setSlotSelections({});
    setExpandedSlotId(null);
    toast.success(`${kitAtivo.nome} adicionado ao carrinho com desconto!`);
  }, [kitAtivo, slotSelections, onAddItem]);

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
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQuantidade(Math.max(1, quantidade - 1))}>
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm font-medium w-6 text-center text-foreground">{quantidade}</span>
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQuantidade(quantidade + 1)}>
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Category cards */}
      <div className="px-3 pt-2 flex gap-2 overflow-x-auto">
        <button
          onClick={() => { setCategoriaId(null); handleSetSubcategoria(null); }}
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
            onClick={() => { setCategoriaId(cat.id); handleSetSubcategoria(null); }}
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

      {/* Subcategory pills */}
      {categoriaSelecionada && (
        <div className="px-3 pt-1.5 flex gap-2 overflow-x-auto">
          <button
            onClick={() => handleSetSubcategoria(null)}
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
              onClick={() => handleSetSubcategoria(sub.id)}
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

      {/* Kit Banner */}
      {kitAtivo && <KitBanner kit={kitAtivo} />}

      {/* Product grid */}
      <ScrollArea className="flex-1 p-3">
        <div className="grid grid-cols-4 gap-2">
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

      {/* Kit slot drawers (slots 2+) */}
      {kitAtivo && kitAtivo.slots.length > 1 && (
        <div className="border-t border-border bg-secondary/20">
          {kitAtivo.slots.slice(1).map((slot, i) => (
            <KitSlotDrawer
              key={slot.id}
              slot={slot}
              slotIndex={i + 1}
              expanded={expandedSlotId === slot.id}
              onToggle={() => setExpandedSlotId((prev) => (prev === slot.id ? null : slot.id))}
              selections={slotSelections[slot.id] || []}
              onAddItem={(p, v, q) => handleSlotAddItem(slot.id, p, v, q)}
              onRemoveItem={(vId) => handleSlotRemoveItem(slot.id, vId)}
              quantidade={quantidade}
            />
          ))}

          {/* Finalize kit button */}
          {allSlotsFilled && (
            <div className="p-3 border-t border-border">
              <Button onClick={handleFinalizarKit} className="w-full gap-2" size="sm">
                <ShoppingCart className="h-3.5 w-3.5" />
                Adicionar {kitAtivo.nome} ao carrinho
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

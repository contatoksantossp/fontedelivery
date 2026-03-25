import { useState, useMemo } from "react";
import { categoriasMock, produtosMock, Produto, Variante } from "./mockPdvData";
import { ProdutoCard } from "./ProdutoCard";
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

  const handleAddVariante = (produto: Produto, variante: Variante, qty: number) => {
    // Check if we're filling combo slots
    if (activeCombo) {
      const emptyIdx = comboSlots.findIndex((s) => s === null);
      if (emptyIdx !== -1) {
        const newSlots = [...comboSlots];
        newSlots[emptyIdx] = { produto, variante };
        setComboSlots(newSlots);

        // If all slots filled, add all as combo items
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

      {/* Category pills */}
      <div className="px-3 pt-2 flex gap-2 overflow-x-auto">
        <button
          onClick={() => { setCategoriaId(null); setSubcategoriaId(null); }}
          className={cn(
            "rounded-full px-3 py-1 text-xs whitespace-nowrap transition-colors",
            !categoriaId ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          Todos
        </button>
        {categoriasMock.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setCategoriaId(cat.id); setSubcategoriaId(null); }}
            className={cn(
              "rounded-full px-3 py-1 text-xs whitespace-nowrap transition-colors",
              categoriaId === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {cat.nome}
          </button>
        ))}
      </div>

      {/* Subcategory pills */}
      {categoriaSelecionada && (
        <div className="px-3 pt-1.5 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setSubcategoriaId(null)}
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px] whitespace-nowrap border transition-colors",
              !subcategoriaId ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            Todos
          </button>
          {categoriaSelecionada.subcategorias.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSubcategoriaId(sub.id)}
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[10px] whitespace-nowrap border transition-colors",
                subcategoriaId === sub.id ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {sub.nome}
            </button>
          ))}
        </div>
      )}

      {/* Product grid */}
      <ScrollArea className="flex-1 p-3">
        <div className="grid grid-cols-3 gap-2">
          {produtosFiltrados.map((p) => (
            <ProdutoCard
              key={p.id}
              produto={p}
              quantidade={quantidade}
              onAddVariante={handleAddVariante}
            />
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

import { useState, useMemo } from "react";
import { KitComboSlot, Produto, Variante, produtosMock } from "./mockPdvData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SlotSelection {
  produto: Produto;
  variante: Variante;
  quantidade: number;
}

interface KitSlotDrawerProps {
  slot: KitComboSlot;
  slotIndex: number;
  expanded: boolean;
  onToggle: () => void;
  selections: SlotSelection[];
  onAddItem: (produto: Produto, variante: Variante, qty: number) => void;
  onRemoveItem: (varianteId: string) => void;
  quantidade: number;
}

export function KitSlotDrawer({
  slot, slotIndex, expanded, onToggle, selections, onAddItem, onRemoveItem, quantidade,
}: KitSlotDrawerProps) {
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

  const produtos = useMemo(
    () => produtosMock.filter((p) => p.subcategoriaId === slot.subcategoriaId),
    [slot.subcategoriaId]
  );

  const totalItens = selections.reduce((a, s) => a + s.quantidade, 0);

  return (
    <div className="border-t border-border">
      {/* Header — collapsible trigger */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-secondary/50 transition-colors"
      >
        {expanded ? (
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        )}
        <span className="text-xs font-medium text-foreground flex-1 text-left">
          Slot {slotIndex + 1}: {slot.nome}
        </span>
        <Badge
          variant="outline"
          className={cn(
            "text-[10px]",
            totalItens > 0 ? "border-success text-success" : "border-muted-foreground text-muted-foreground"
          )}
        >
          {totalItens} {totalItens === 1 ? "item" : "itens"}
        </Badge>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-3 pb-3">
          {/* Selected items summary */}
          {selections.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {selections.map((sel) => (
                <Badge key={sel.variante.id} variant="secondary" className="text-[10px] gap-1 pr-1">
                  {sel.produto.nome}
                  {sel.variante.nome !== "Único" && sel.variante.nome !== "Única" && ` (${sel.variante.nome})`}
                  {sel.quantidade > 1 && ` x${sel.quantidade}`}
                  <button
                    onClick={() => onRemoveItem(sel.variante.id)}
                    className="ml-0.5 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Product grid */}
          <ScrollArea className="max-h-[200px]">
            <div className="grid grid-cols-4 gap-2">
              {produtos.map((p) => {
                const hasMultiple = p.variantes.length > 1;
                const minPrice = Math.min(...p.variantes.map((v) => v.preco));
                const isExpanded = expandedProductId === p.id;

                return (
                  <div key={p.id} className="contents">
                    <button
                      onClick={() => {
                        if (hasMultiple) {
                          setExpandedProductId(isExpanded ? null : p.id);
                        } else {
                          onAddItem(p, p.variantes[0], quantidade);
                        }
                      }}
                      className={cn(
                        "w-full text-left rounded-lg border border-border bg-card overflow-hidden transition-colors hover:bg-secondary",
                        isExpanded && "border-primary ring-1 ring-primary/30"
                      )}
                    >
                      <img
                        src={p.foto || "/placeholder.svg"}
                        alt={p.nome}
                        className="h-16 w-full object-cover"
                      />
                      <div className="p-1.5">
                        <p className="text-[10px] font-medium text-foreground truncate">{p.nome}</p>
                        <span className="text-[10px] text-primary font-semibold">
                          {hasMultiple ? `a partir de R$ ${minPrice.toFixed(2)}` : `R$ ${minPrice.toFixed(2)}`}
                        </span>
                      </div>
                    </button>

                    {/* Inline variante sub-drawer */}
                    {isExpanded && (
                      <div className="col-span-3 border border-primary/30 bg-secondary/50 rounded-lg p-2 mb-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-semibold text-foreground">
                            Variantes de {p.nome}
                          </span>
                          <button onClick={() => setExpandedProductId(null)} className="text-muted-foreground hover:text-foreground">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1">
                          {p.variantes.map((v) => (
                            <div
                              key={v.id}
                              className="flex-shrink-0 w-24 rounded-lg border border-border bg-card overflow-hidden"
                            >
                              <img src={v.foto || "/placeholder.svg"} alt={v.nome} className="h-12 w-full object-cover" />
                              <div className="p-1">
                                <p className="text-[9px] text-foreground truncate">{v.nome}</p>
                                <div className="flex items-center justify-between mt-0.5">
                                  <span className="text-[9px] text-primary font-semibold">R$ {v.preco.toFixed(2)}</span>
                                  <Button
                                    size="icon" variant="ghost" className="h-4 w-4"
                                    onClick={(e) => { e.stopPropagation(); onAddItem(p, v, quantidade); }}
                                  >
                                    <Plus className="h-2.5 w-2.5" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {produtos.length === 0 && (
            <p className="text-[10px] text-muted-foreground text-center py-4">Nenhum produto nessa subcategoria</p>
          )}
        </div>
      )}
    </div>
  );
}

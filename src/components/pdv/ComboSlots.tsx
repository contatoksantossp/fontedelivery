import { Produto, Variante } from "./mockPdvData";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ComboSlotsProps {
  comboConfig: { slots: number; desconto: number };
  filledSlots: Array<{ produto: Produto; variante: Variante } | null>;
  onRemoveSlot: (index: number) => void;
}

export function ComboSlots({ comboConfig, filledSlots, onRemoveSlot }: ComboSlotsProps) {
  const filled = filledSlots.filter(Boolean).length;
  const allFilled = filled === comboConfig.slots;

  // Slot 1 is the main grid — only show slots 2+ in footer
  const remainingSlots = filledSlots.slice(1);

  return (
    <div className="border-t border-border bg-secondary/30 p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-foreground">
          Montando Combo ({filled}/{comboConfig.slots})
        </span>
        {allFilled && (
          <Badge className="bg-success/15 text-success text-[10px]">
            -{comboConfig.desconto}% aplicado
          </Badge>
        )}
      </div>

      {/* Slot 1 indicator */}
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[10px] text-muted-foreground font-medium">Slot 1:</span>
        {filledSlots[0] ? (
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-foreground">
              {filledSlots[0].produto.nome}
              {filledSlots[0].variante.nome !== "Único" && ` (${filledSlots[0].variante.nome})`}
            </span>
            <button onClick={() => onRemoveSlot(0)} className="text-muted-foreground hover:text-destructive">
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <span className="text-[10px] text-muted-foreground/50">Selecione na vitrine</span>
        )}
      </div>

      {/* Slots 2+ */}
      <div className="flex gap-2">
        {remainingSlots.map((slot, i) => (
          <div
            key={i + 1}
            className="flex-1 rounded-md border border-dashed border-border bg-card p-2 min-h-[40px] flex items-center justify-center"
          >
            {slot ? (
              <div className="flex items-center gap-1 w-full">
                <span className="text-[10px] text-foreground truncate flex-1">
                  {slot.produto.nome} {slot.variante.nome !== "Único" && `(${slot.variante.nome})`}
                </span>
                <button onClick={() => onRemoveSlot(i + 1)} className="text-muted-foreground hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <span className="text-[10px] text-muted-foreground">Slot {i + 2}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

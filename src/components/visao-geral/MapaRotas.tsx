import { Map } from "lucide-react";
import { Pedido } from "./mockData";
import { SlotRota } from "./SlotRota";

interface MapaRotasProps {
  pedidosProntos: Pedido[];
  expandedSlot: number | null;
  onExpandSlot: (index: number) => void;
  onCollapseSlot: () => void;
  rotasItens: [Pedido[], Pedido[]];
  onRemoveFromRota: (slotIndex: number, pedidoId: string) => void;
  onReorderRota: (slotIndex: number, items: Pedido[]) => void;
}

export function MapaRotas({ expandedSlot, onExpandSlot, onCollapseSlot, rotasItens, onRemoveFromRota, onReorderRota }: MapaRotasProps) {
  return (
    <div className="flex flex-col h-full gap-3">
      {/* Map Placeholder */}
      <div className="rounded-lg border bg-card/50 flex-1 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground">
        <div className="rounded-xl bg-primary/10 p-4 mb-2">
          <Map className="h-8 w-8 text-primary" />
        </div>
        <p className="text-xs">Mapa será integrado em breve</p>
      </div>

      {/* Slots de Rota */}
      <div className="grid grid-cols-2 gap-2">
        {[0, 1].map((i) => (
          <SlotRota
            key={i}
            slotIndex={i}
            rotaItens={rotasItens[i]}
            expanded={expandedSlot === i}
            onExpand={() => onExpandSlot(i)}
            onCollapse={onCollapseSlot}
            onRemove={(pedidoId) => onRemoveFromRota(i, pedidoId)}
            onReorder={(items) => onReorderRota(i, items)}
          />
        ))}
      </div>
    </div>
  );
}

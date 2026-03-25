import { Map } from "lucide-react";
import { Pedido } from "./mockData";
import { SlotRota } from "./SlotRota";

interface MapaRotasProps {
  pedidosProntos: Pedido[];
  expandedSlot: number | null;
  onExpandSlot: (index: number) => void;
  onCollapseSlot: () => void;
}

export function MapaRotas({ pedidosProntos, expandedSlot, onExpandSlot, onCollapseSlot }: MapaRotasProps) {
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
      <div className="space-y-2">
        {[0, 1].map((i) => (
          <SlotRota
            key={i}
            slotIndex={i}
            pedidosProntos={pedidosProntos}
            expanded={expandedSlot === i}
            onExpand={() => onExpandSlot(i)}
            onCollapse={onCollapseSlot}
          />
        ))}
      </div>
    </div>
  );
}

import { PedidoFila } from "./mockPdvData";
import { FilaPedidoCard } from "./FilaPedidoCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClipboardList } from "lucide-react";

interface FilaPedidosProps {
  pedidos: PedidoFila[];
  selectedId: string | null;
  onSelect: (pedido: PedidoFila) => void;
}

export function FilaPedidos({ pedidos, selectedId, onSelect }: FilaPedidosProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Fila de Pedidos</h2>
          <span className="ml-auto text-xs text-muted-foreground">{pedidos.length}</span>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {pedidos.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8">Nenhum pedido na fila</p>
          ) : (
            pedidos.map((p) => (
              <FilaPedidoCard
                key={p.id}
                pedido={p}
                selected={selectedId === p.id}
                onSelect={onSelect}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

import { PedidoFila } from "./mockPdvData";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock, Truck, MapPin } from "lucide-react";

interface FilaPedidoCardProps {
  pedido: PedidoFila;
  selected: boolean;
  onSelect: (pedido: PedidoFila) => void;
}

export function FilaPedidoCard({ pedido, selected, onSelect }: FilaPedidoCardProps) {
  const minutosAtras = Math.floor((Date.now() - pedido.criadoEm.getTime()) / 60000);

  const canalLabel: Record<string, string> = {
    balcao: "Balcão",
    whatsapp: "WhatsApp",
    "99food": "99Food",
    ifood: "iFood",
    app: "App",
  };

  return (
    <button
      onClick={() => onSelect(pedido)}
      className={cn(
        "w-full text-left rounded-lg border p-3 transition-colors",
        selected
          ? "border-primary bg-primary/10"
          : "border-border bg-card hover:bg-secondary"
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-foreground">{pedido.codigo}</span>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
          {canalLabel[pedido.canal]}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground truncate">{pedido.cliente}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1 text-muted-foreground">
          {pedido.modalidade === "entrega" ? (
            <Truck className="h-3 w-3" />
          ) : (
            <MapPin className="h-3 w-3" />
          )}
          <span className="text-[10px]">{pedido.modalidade === "entrega" ? "Entrega" : "Retirada"}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span className="text-[10px]">{minutosAtras}min</span>
        </div>
      </div>
      <p className="text-sm font-bold text-foreground mt-1">
        R$ {pedido.total.toFixed(2)}
      </p>
    </button>
  );
}

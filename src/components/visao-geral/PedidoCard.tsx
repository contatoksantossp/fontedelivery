import { Pedido } from "./mockData";
import { Clock, X, Check, Truck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface PedidoCardProps {
  pedido: Pedido;
  selected?: boolean;
  onSelect: (pedido: Pedido) => void;
  onAction: (pedidoId: string, action: "cancelar" | "pronto" | "despachar" | "finalizar") => void;
}

function useTimer(criadoEm: Date) {
  const [elapsed, setElapsed] = useState("");
  useEffect(() => {
    const update = () => {
      const diff = Math.floor((Date.now() - criadoEm.getTime()) / 1000);
      const m = Math.floor(diff / 60);
      const s = diff % 60;
      setElapsed(`${m}:${s.toString().padStart(2, "0")}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [criadoEm]);
  return elapsed;
}

export function PedidoCard({ pedido, selected, onSelect, onAction }: PedidoCardProps) {
  const elapsed = useTimer(pedido.criadoEm);
  const isPendente = pedido.status === "pendente";

  return (
    <div
      onClick={() => onSelect(pedido)}
      className={cn(
        "rounded-lg border bg-card p-3 cursor-pointer transition-all hover:border-primary/50",
        selected && "border-primary ring-1 ring-primary/30"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-sm text-foreground">{pedido.codigo}</span>
          <span className={cn(
            "text-[10px] font-medium px-1.5 py-0.5 rounded-full uppercase",
            pedido.tipo === "entrega"
              ? "bg-primary/15 text-primary"
              : "bg-accent/15 text-accent-foreground"
          )}>
            {pedido.tipo === "entrega" ? <Truck className="inline h-3 w-3 mr-0.5" /> : <MapPin className="inline h-3 w-3 mr-0.5" />}
            {pedido.tipo}
          </span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span className="text-xs font-mono">{elapsed}</span>
        </div>
      </div>

      <p className="text-sm font-medium text-foreground truncate">{pedido.cliente}</p>
      {pedido.tipo === "entrega" && (
        <p className="text-xs text-muted-foreground truncate">{pedido.endereco} — {pedido.bairro}</p>
      )}

      <div className="flex items-center justify-between mt-3">
        <span className="text-sm font-bold text-foreground">
          R$ {pedido.total.toFixed(2)}
        </span>
        <div className="flex gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10"
            onClick={(e) => { e.stopPropagation(); onAction(pedido.id, "cancelar"); }}
          >
            <X className="h-3 w-3 mr-0.5" />
            Cancelar
          </Button>
          {isPendente ? (
            <Button
              size="sm"
              className="h-7 px-2.5 text-xs"
              onClick={(e) => { e.stopPropagation(); onAction(pedido.id, "pronto"); }}
            >
              <Check className="h-3 w-3 mr-0.5" />
              Pronto
            </Button>
          ) : (
            <Button
              size="sm"
              className="h-7 px-2.5 text-xs"
              onClick={(e) => { e.stopPropagation(); onAction(pedido.id, "despachar"); }}
            >
              <Truck className="h-3 w-3 mr-0.5" />
              Despachar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

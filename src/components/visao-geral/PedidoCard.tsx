import { Pedido } from "./mockData";
import { Clock, X, Check, Truck, MapPin, Route, Timer, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";

interface PedidoCardProps {
  pedido: Pedido;
  selected?: boolean;
  selectionMode?: boolean;
  inRota?: boolean;
  rotaColor?: string;
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

export function PedidoCard({ pedido, selected, selectionMode, inRota, rotaColor, onSelect, onAction }: PedidoCardProps) {
  const elapsed = useTimer(pedido.criadoEm);
  const isPendente = pedido.status === "pendente";
  const isEligible = selectionMode && pedido.status === "pronto" && pedido.tipo === "entrega" && !inRota;

  return (
    <div
      onClick={() => {
        if (inRota) return;
        onSelect(pedido);
      }}
      className={cn(
        "rounded-lg border bg-card p-3 transition-all",
        inRota && !rotaColor && "opacity-50 cursor-not-allowed",
        inRota && rotaColor && "cursor-not-allowed",
        !inRota && "cursor-pointer hover:border-primary/50",
        selected && !inRota && "border-primary ring-1 ring-primary/30",
        isEligible && "border-dashed border-primary/60 animate-pulse"
      )}
      style={
        inRota && rotaColor
          ? { backgroundColor: rotaColor + "20", borderColor: rotaColor + "50" }
          : undefined
      }
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
          {inRota && (
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded-full flex items-center gap-0.5"
              style={rotaColor ? { backgroundColor: rotaColor + "30", color: rotaColor } : undefined}
            >
              <Route className="h-3 w-3" />
              Na Rota
            </span>
          )}
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
        {!selectionMode && (
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
            ) : pedido.tipo === "retirada" ? (
              <Button
                size="sm"
                className="h-7 px-2.5 text-xs"
                onClick={(e) => { e.stopPropagation(); onAction(pedido.id, "finalizar"); }}
              >
                <Check className="h-3 w-3 mr-0.5" />
                Retirado
              </Button>
            ) : (
              <Button
                size="sm"
                className="h-7 px-2.5 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.info("Selecione uma rota à direita ou crie uma nova para despachar este pedido.", {
                    duration: 4000,
                  });
                }}
              >
                <Truck className="h-3 w-3 mr-0.5" />
                Despachar
              </Button>
            )}
          </div>
        )}
        {isEligible && (
          <span className="text-xs text-primary font-medium">+ Adicionar</span>
        )}
      </div>

      {/* Rastreio */}
      <div className="mt-3 pt-2 border-t border-border/50">
        <div className="flex items-center gap-3 text-[10px]">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3 text-primary" />
            <span>{format(pedido.criadoEm, "HH:mm")}</span>
          </div>
          <div className="flex-1 h-px bg-border relative">
            {pedido.prontoEm && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
            )}
          </div>
          {pedido.prontoEm ? (
            <div className="flex items-center gap-1 text-primary">
              <CheckCircle2 className="h-3 w-3" />
              <span>{format(pedido.prontoEm, "HH:mm")}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-muted-foreground/50">
              <CheckCircle2 className="h-3 w-3" />
              <span>—</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-muted-foreground ml-1">
            <Timer className="h-3 w-3" />
            <span className="font-mono">{elapsed}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

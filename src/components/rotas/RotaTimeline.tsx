import { Parada } from "./mockRotasData";
import { Check, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface RotaTimelineProps {
  paradas: Parada[];
}

export function RotaTimeline({ paradas }: RotaTimelineProps) {
  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />

      {paradas.map((parada, i) => {
        const entregue = parada.paradaStatus === "entregue";
        return (
          <div key={parada.id} className="relative pb-4 last:pb-0">
            {/* Icon */}
            <div
              className={cn(
                "absolute left-[-13px] w-5 h-5 rounded-full flex items-center justify-center border-2",
                entregue
                  ? "bg-green-500/20 border-green-500 text-green-400"
                  : "bg-yellow-500/20 border-yellow-500 text-yellow-400"
              )}
            >
              {entregue ? (
                <Check className="h-3 w-3" />
              ) : (
                <Clock className="h-3 w-3" />
              )}
            </div>

            {/* Content */}
            <div className="ml-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-foreground">{parada.pedidoCodigo}</span>
                <span className={cn("text-[10px]", entregue ? "text-green-400" : "text-yellow-400")}>
                  {entregue ? "Entregue" : "Pendente"}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">{parada.cliente}</p>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                <MapPin className="h-3 w-3" />
                <span>{parada.endereco}, {parada.bairro}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

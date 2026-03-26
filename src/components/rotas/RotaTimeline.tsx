import { Parada } from "./mockRotasData";
import { Check, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface RotaTimelineProps {
  paradas: Parada[];
  cor: string;
}

export function RotaTimeline({ paradas, cor }: RotaTimelineProps) {
  // Sort: entregues first, then pendentes
  const sorted = [...paradas].sort((a, b) => {
    if (a.paradaStatus === "entregue" && b.paradaStatus !== "entregue") return -1;
    if (a.paradaStatus !== "entregue" && b.paradaStatus === "entregue") return 1;
    return 0;
  });

  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />

      {sorted.map((parada) => {
        const entregue = parada.paradaStatus === "entregue";
        return (
          <div key={parada.id} className="relative pb-4 last:pb-0">
            {/* Icon */}
            <div
              className={cn(
                "absolute left-[-13px] w-5 h-5 rounded-full flex items-center justify-center border-2"
              )}
              style={{
                background: entregue ? "hsl(var(--muted) / 0.5)" : `${cor}33`,
                borderColor: entregue ? "hsl(var(--muted-foreground))" : cor,
                color: entregue ? "hsl(var(--muted-foreground))" : cor,
              }}
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
                <span
                  className="text-[10px]"
                  style={{ color: entregue ? "hsl(var(--muted-foreground))" : cor }}
                >
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

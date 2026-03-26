import { useState, useEffect } from "react";
import { Rota, RotaStatus } from "./mockRotasData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Bike, Car, Truck as TruckIcon, Check, Clock, Timer } from "lucide-react";

function useElapsedTick(paradas: { criadoEm: string; paradaStatus: string }[]) {
  const [tick, setTick] = useState(0);
  const hasActive = paradas.some(p => p.paradaStatus !== "entregue");
  useEffect(() => {
    if (!hasActive) return;
    const id = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(id);
  }, [hasActive]);

  return (criadoEm: string, entregue: boolean) => {
    const start = new Date(criadoEm).getTime();
    const diffMin = Math.floor((Date.now() - start) / 60000);
    if (diffMin < 60) return `${diffMin}m`;
    const h = Math.floor(diffMin / 60);
    const m = diffMin % 60;
    return `${h}h${m > 0 ? String(m).padStart(2, "0") + "m" : ""}`;
  };
}

const statusConfig: Record<RotaStatus, { label: string; className: string }> = {
  pendente: { label: "Pendente", className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
  em_rota: { label: "Em Rota", className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  finalizada: { label: "Finalizada", className: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
  concluida: { label: "Concluída", className: "bg-muted text-muted-foreground border-border" },
};

const veiculoIcon: Record<string, React.ElementType> = {
  Moto: TruckIcon,
  Bicicleta: Bike,
  Carro: Car,
};

interface RotaCardProps {
  rota: Rota;
  cor: string;
  selected: boolean;
  onSelect: (rota: Rota) => void;
}

export function RotaCard({ rota, cor, selected, onSelect }: RotaCardProps) {
  const cfg = statusConfig[rota.status];
  const isConcluida = rota.status === "concluida";
  const VeiculoIcon = veiculoIcon[rota.entregadorVeiculo] || TruckIcon;
  const formatElapsed = useElapsedTick(rota.paradas);

  return (
    <div
      onClick={() => onSelect(rota)}
      style={{ borderLeftWidth: 3, borderLeftColor: cor }}
      className={cn(
        "rounded-lg border p-3 cursor-pointer transition-all",
        "hover:shadow-md",
        selected ? "shadow-lg border-border bg-card" : "border-border bg-card",
        isConcluida && "opacity-50 bg-muted"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cor }} />
          <VeiculoIcon className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-foreground text-lg">{rota.entregadorNome}</span>
        </div>
        <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", cfg.className)}>
          {cfg.label}
        </Badge>
      </div>

      {/* Ações */}
      <div className="text-[11px] text-muted-foreground mb-2 space-y-0.5">
        <p className="text-base"><span className="text-foreground/60 text-sm">Anterior:</span> {rota.acaoAnterior}</p>
        <p className="text-base"><span className="text-foreground/60 text-sm">Próxima:</span> {rota.proximaAcao}</p>
      </div>

      {/* Mini-cards de pedidos */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {rota.paradas.map((p, index) => {
          const allDone = rota.status === "finalizada" || rota.status === "concluida";
          const entregue = allDone || p.paradaStatus === "entregue";
          return (
            <div
              key={p.id}
              className={cn(
                "min-w-[120px] rounded-lg border px-2.5 py-2 text-[10px] flex-shrink-0 relative overflow-hidden transition-colors",
                entregue
                  ? "bg-muted/40 text-muted-foreground border-border/50"
                  : "bg-card border-border shadow-sm"
              )}
            >
              <div
                className="absolute top-0 left-0 w-full h-[2px]"
                style={{ background: entregue ? "hsl(var(--muted-foreground))" : cor }}
              />
              <div className="flex items-center gap-1.5 mb-0.5">
                <span
                  className={cn(
                    "inline-flex items-center justify-center h-4 w-4 rounded-full text-[9px] font-bold shrink-0",
                    entregue
                      ? "bg-muted-foreground/20 text-muted-foreground"
                      : "text-primary-foreground"
                  )}
                  style={!entregue ? { background: cor } : undefined}
                >
                  {index + 1}
                </span>
                {entregue ? (
                  <Check className="h-3 w-3 text-muted-foreground" />
                ) : (
                  <Clock className="h-3 w-3 text-yellow-400" />
                )}
                <span className="font-semibold text-sm">{p.pedidoCodigo}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="truncate text-muted-foreground flex-1 text-base">{p.cliente}</p>
                <span className={cn(
                  "flex items-center gap-0.5 shrink-0 ml-1",
                  entregue ? "text-muted-foreground" : "text-primary"
                )}>
                  <Timer className="h-2.5 w-2.5" />
                  {formatElapsed(p.criadoEm, entregue)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2 text-muted-foreground text-sm">
        <span>{rota.paradas.length} parada{rota.paradas.length !== 1 ? "s" : ""}</span>
        <span>{rota.kmTotal} km</span>
        <span>~{rota.tempoEstimado} min</span>
      </div>
    </div>
  );
}

import { Rota, RotaStatus } from "./mockRotasData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Bike, Car, Truck as TruckIcon, Check, Clock } from "lucide-react";

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

  return (
    <div
      onClick={() => onSelect(rota)}
      style={{ borderLeftWidth: 3, borderLeftColor: cor }}
      className={cn(
        "rounded-lg border p-3 cursor-pointer transition-all",
        "hover:border-primary/40",
        selected ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border bg-card",
        isConcluida && "opacity-50 bg-muted"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cor }} />
          <VeiculoIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">{rota.entregadorNome}</span>
        </div>
        <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", cfg.className)}>
          {cfg.label}
        </Badge>
      </div>

      {/* Ações */}
      <div className="text-[11px] text-muted-foreground mb-2 space-y-0.5">
        <p><span className="text-foreground/60">Anterior:</span> {rota.acaoAnterior}</p>
        <p><span className="text-foreground/60">Próxima:</span> {rota.proximaAcao}</p>
      </div>

      {/* Mini-cards de pedidos */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {rota.paradas.map((p, index) => {
          const entregue = p.paradaStatus === "entregue";
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
                <span className="font-semibold">{p.pedidoCodigo}</span>
              </div>
              <p className="truncate text-muted-foreground">{p.cliente}</p>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
        <span>{rota.paradas.length} parada{rota.paradas.length !== 1 ? "s" : ""}</span>
        <span>{rota.kmTotal} km</span>
        <span>~{rota.tempoEstimado} min</span>
      </div>
    </div>
  );
}

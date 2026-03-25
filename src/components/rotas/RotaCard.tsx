import { Rota, RotaStatus } from "./mockRotasData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Bike, Car, Truck as TruckIcon } from "lucide-react";

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
  selected: boolean;
  onSelect: (rota: Rota) => void;
}

export function RotaCard({ rota, selected, onSelect }: RotaCardProps) {
  const cfg = statusConfig[rota.status];
  const isConcluida = rota.status === "concluida";
  const VeiculoIcon = veiculoIcon[rota.entregadorVeiculo] || TruckIcon;

  return (
    <div
      onClick={() => onSelect(rota)}
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
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {rota.paradas.map((p) => (
          <div
            key={p.id}
            className={cn(
              "min-w-[110px] rounded-md border px-2 py-1.5 text-[10px] flex-shrink-0",
              p.paradaStatus === "entregue"
                ? "bg-muted/50 text-muted-foreground border-border"
                : "bg-card border-border text-foreground"
            )}
          >
            <p className="font-medium truncate">{p.pedidoCodigo}</p>
            <p className="truncate text-muted-foreground">{p.cliente}</p>
          </div>
        ))}
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

import { cn } from "@/lib/utils";
import { format } from "date-fns";

export type RastreioStatus = "rascunho" | "pendente" | "pronto";

interface PedidoRastreioProps {
  status: RastreioStatus;
  criadoEm: Date;
  prontoEm?: Date;
}

const steps: { key: RastreioStatus; label: string }[] = [
  { key: "rascunho", label: "Rascunho" },
  { key: "pendente", label: "Pendente" },
  { key: "pronto", label: "Pronto" },
];

const statusIndex: Record<RastreioStatus, number> = {
  rascunho: 0,
  pendente: 1,
  pronto: 2,
};

export function PedidoRastreio({ status, criadoEm, prontoEm }: PedidoRastreioProps) {
  const currentIdx = statusIndex[status];

  function getLabel(idx: number) {
    if (idx < currentIdx) {
      // Past step — show time
      if (idx === 0) return format(criadoEm, "HH:mm");
      if (idx === 1 && prontoEm) return format(prontoEm, "HH:mm");
      return format(criadoEm, "HH:mm");
    }
    return steps[idx].label;
  }

  return (
    <div className="flex items-center gap-0 w-full text-[10px]">
      {steps.map((step, idx) => {
        const isPast = idx < currentIdx;
        const isCurrent = idx === currentIdx;
        const isFuture = idx > currentIdx;

        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            {/* Dot + Label */}
            <div className="flex flex-col items-center gap-0.5 min-w-0">
              <div
                className={cn(
                  "w-2 h-2 rounded-full shrink-0",
                  isPast && "bg-primary",
                  isCurrent && "bg-primary ring-2 ring-primary/30",
                  isFuture && "bg-muted-foreground/30"
                )}
              />
              <span
                className={cn(
                  "truncate leading-none",
                  isPast && "text-primary font-medium",
                  isCurrent && "text-primary font-semibold",
                  isFuture && "text-muted-foreground/50"
                )}
              >
                {getLabel(idx)}
              </span>
            </div>

            {/* Line connector */}
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-px mx-1",
                  idx < currentIdx ? "bg-primary" : "bg-muted-foreground/20"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

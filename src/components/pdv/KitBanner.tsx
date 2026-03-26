import { KitCombo } from "./mockPdvData";
import { Badge } from "@/components/ui/badge";
import { Gift } from "lucide-react";

interface KitBannerProps {
  kit: KitCombo;
}

export function KitBanner({ kit }: KitBannerProps) {
  const descontoLabel = kit.tipoDesconto === "%" 
    ? `-${kit.valorDesconto}%` 
    : `-R$ ${kit.valorDesconto.toFixed(2)}`;

  return (
    <div className="mx-3 mt-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 flex items-center gap-2">
      <Gift className="h-4 w-4 text-primary flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium text-foreground">
          Kit/Combo disponível nessa subcategoria
        </span>
        <span className="text-[10px] text-muted-foreground ml-1.5">• {kit.nome}</span>
      </div>
      <Badge className="bg-success/15 text-success text-[10px] flex-shrink-0">
        {descontoLabel}
      </Badge>
    </div>
  );
}

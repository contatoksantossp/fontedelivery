import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { KitCombo } from "./mockCatalogoData";

interface Props {
  kit: KitCombo;
  onEdit: (k: KitCombo) => void;
  onDelete: (id: string) => void;
}

export function KitComboCard({ kit, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-start gap-4">
        <img src={kit.imagem} alt={kit.nome} className="h-16 w-16 rounded-lg object-cover bg-muted flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-card-foreground">{kit.nome}</h3>
            <Badge variant={kit.tipo === "combo" ? "default" : "secondary"}>
              {kit.tipo === "combo" ? "Combo" : "Kit"}
            </Badge>
            {!kit.ativo && <Badge variant="secondary">Inativo</Badge>}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Desconto: {kit.tipoDesconto === "%" ? `${kit.valorDesconto}%` : `R$ ${kit.valorDesconto.toFixed(2).replace(".", ",")}`}
          </p>
          <p className="text-xs text-muted-foreground">{kit.slots.length} slot(s): {kit.slots.map(s => s.nome).join(", ")}</p>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <Button size="sm" variant="ghost" onClick={() => onEdit(kit)}>
            <Edit className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onDelete(kit.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

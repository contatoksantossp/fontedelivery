import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { CatalogVariante } from "./mockCatalogoData";

interface Props {
  variante: CatalogVariante;
  onEdit: (v: CatalogVariante) => void;
  onDelete: (id: string) => void;
}

export function VarianteCard({ variante, onEdit, onDelete }: Props) {
  return (
    <div className="group min-w-[140px] max-w-[160px] rounded-lg border border-border bg-card p-2 flex flex-col items-center text-center">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted">
        <img src={variante.foto} alt={variante.nome} className="h-full w-full object-cover" />
      </div>
      <p className="mt-2 text-xs font-medium text-card-foreground line-clamp-2">{variante.nome}</p>
      <p className="mt-0.5 text-sm font-semibold text-primary">
        R$ {variante.valorVenda.toFixed(2).replace(".", ",")}
      </p>
      <div className="mt-1 flex items-center justify-center gap-1">
        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => onEdit(variante)}>
          <Edit className="h-3 w-3" />
        </Button>
        <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={() => onDelete(variante.id)}>
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

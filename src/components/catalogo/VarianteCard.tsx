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
    <div className="min-w-[180px] rounded-lg border border-border bg-card p-3">
      <img src={variante.foto} alt={variante.nome} className="mb-2 h-16 w-full rounded object-cover bg-muted" />
      <p className="text-sm font-medium text-card-foreground">{variante.nome}</p>
      <p className="text-xs text-muted-foreground">EAN: {variante.ean}</p>
      <p className="mt-1 text-sm font-semibold text-primary">
        R$ {variante.valorVenda.toFixed(2).replace(".", ",")}
      </p>
      <div className="mt-1 flex flex-wrap gap-1">
        {variante.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">{tag}</Badge>
        ))}
      </div>
      <div className="mt-2 flex gap-1">
        <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => onEdit(variante)}>
          <Edit className="mr-1 h-3 w-3" /> Editar
        </Button>
        <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive" onClick={() => onDelete(variante.id)}>
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

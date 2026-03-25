import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { CatalogCategoria } from "./mockCatalogoData";

interface Props {
  categoria: CatalogCategoria;
  selected: boolean;
  onSelect: (id: string) => void;
  onEdit: (cat: CatalogCategoria) => void;
  onDelete: (id: string) => void;
}

export function CategoriaCard({ categoria, selected, onSelect, onEdit, onDelete }: Props) {
  return (
    <div
      onClick={() => onSelect(categoria.id)}
      className={`relative min-w-[200px] cursor-pointer rounded-lg border p-4 transition-all ${
        selected ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
      }`}
    >
      <img src={categoria.imagem} alt={categoria.nome} className="mb-3 h-24 w-full rounded-md object-cover bg-muted" />
      <h3 className="font-semibold text-card-foreground">{categoria.nome}</h3>
      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{categoria.descricao}</p>
      {!categoria.ativo && (
        <Badge variant="secondary" className="mt-2">Inativo</Badge>
      )}
      <div className="mt-3 flex gap-1">
        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); onEdit(categoria); }}>
          <Edit className="h-3.5 w-3.5" />
        </Button>
        <Button size="sm" variant="ghost" className="text-destructive" onClick={(e) => { e.stopPropagation(); onDelete(categoria.id); }}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

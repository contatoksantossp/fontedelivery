import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <button
      onClick={() => onSelect(categoria.id)}
      className={`group relative flex w-[140px] flex-shrink-0 flex-col items-center gap-1 rounded-lg p-2 transition-all ${
        selected ? "bg-primary ring-1 ring-primary text-primary-foreground" : "hover:bg-secondary"
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
        <img src={categoria.imagem} alt={categoria.nome} className="h-full w-full object-cover" />
        {!categoria.ativo && (
          <div className="absolute inset-0 bg-background/60" />
        )}
      </div>
      <span className={`w-full truncate text-center text-xs font-medium ${
        selected ? "text-primary-foreground" : "text-muted-foreground"
      }`}>
        {categoria.nome}
      </span>
      <div className={`items-center justify-center gap-1 ${selected ? "flex" : "hidden group-hover:flex"}`}>
        <Button
          size="icon"
          variant="ghost"
          className="h-5 w-5 text-muted-foreground hover:text-foreground"
          onClick={(e) => { e.stopPropagation(); onEdit(categoria); }}
        >
          <Edit className="h-3 w-3" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-5 w-5 text-muted-foreground hover:text-destructive"
          onClick={(e) => { e.stopPropagation(); onDelete(categoria.id); }}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
      {!categoria.ativo && (
        <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-destructive" />
      )}
    </button>
  );
}

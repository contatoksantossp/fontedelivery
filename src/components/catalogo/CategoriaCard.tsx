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
      className={`group relative flex w-20 flex-shrink-0 flex-col items-center gap-1 rounded-lg p-1.5 transition-all ${
        selected ? "bg-primary/15 ring-1 ring-primary" : "hover:bg-secondary"
      }`}
    >
      <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-muted">
        <img src={categoria.imagem} alt={categoria.nome} className="h-full w-full object-cover" />
        {!categoria.ativo && (
          <div className="absolute inset-0 bg-background/60" />
        )}
        {/* Hover overlay with actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-0.5 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-white hover:bg-white/20 hover:text-white"
            onClick={(e) => { e.stopPropagation(); onEdit(categoria); }}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-white hover:bg-white/20 hover:text-white"
            onClick={(e) => { e.stopPropagation(); onDelete(categoria.id); }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <span className={`w-full truncate text-center text-[10px] font-medium ${
        selected ? "text-primary" : "text-muted-foreground"
      }`}>
        {categoria.nome}
      </span>
      {!categoria.ativo && (
        <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-destructive" />
      )}
    </button>
  );
}

import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CatalogSubcategoria } from "./mockCatalogoData";

interface Props {
  subcategoria: CatalogSubcategoria;
  selected: boolean;
  onSelect: (id: string) => void;
  onEdit: (sub: CatalogSubcategoria) => void;
  onDelete: (id: string) => void;
}

export function SubcategoriaCard({ subcategoria, selected, onSelect, onEdit, onDelete }: Props) {
  return (
    <button
      onClick={() => onSelect(subcategoria.id)}
      className={`group relative flex flex-shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 transition-all ${
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-card-foreground hover:border-primary/50"
      }`}
    >
      <img
        src={subcategoria.imagem}
        alt={subcategoria.nome}
        className="h-8 w-8 rounded-full object-cover bg-muted flex-shrink-0"
      />
      <span className="whitespace-nowrap text-xs font-medium">{subcategoria.nome}</span>
      {!subcategoria.ativo && (
        <span className="h-1.5 w-1.5 rounded-full bg-destructive flex-shrink-0" />
      )}
      {/* Hover actions */}
      <div className={`ml-0.5 flex gap-0 transition-opacity ${selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
        <Button
          size="icon"
          variant="ghost"
          className={`h-6 w-6 ${selected ? "text-primary-foreground hover:bg-white/20 hover:text-primary-foreground" : "hover:bg-secondary"}`}
          onClick={(e) => { e.stopPropagation(); onEdit(subcategoria); }}
        >
          <Edit className="h-3 w-3" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className={`h-6 w-6 ${selected ? "text-primary-foreground hover:bg-white/20 hover:text-primary-foreground" : "text-destructive hover:bg-secondary"}`}
          onClick={(e) => { e.stopPropagation(); onDelete(subcategoria.id); }}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </button>
  );
}

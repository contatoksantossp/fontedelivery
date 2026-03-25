import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <div
      onClick={() => onSelect(subcategoria.id)}
      className={`flex min-w-[160px] cursor-pointer items-center gap-3 rounded-full border px-4 py-2 transition-all ${
        selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-card-foreground hover:border-primary/50"
      }`}
    >
      <img src={subcategoria.imagem} alt={subcategoria.nome} className="h-8 w-8 rounded-full object-cover bg-muted" />
      <span className="whitespace-nowrap text-sm font-medium">{subcategoria.nome}</span>
      {!subcategoria.ativo && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Off</Badge>}
      <div className="ml-auto flex gap-0.5">
        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); onEdit(subcategoria); }}>
          <Edit className="h-3 w-3" />
        </Button>
        <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={(e) => { e.stopPropagation(); onDelete(subcategoria.id); }}>
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

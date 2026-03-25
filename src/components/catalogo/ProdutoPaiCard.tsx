import { Edit, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { VarianteCard } from "./VarianteCard";
import type { CatalogProduto, CatalogVariante } from "./mockCatalogoData";

interface Props {
  produto: CatalogProduto;
  variantes: CatalogVariante[];
  onEdit: (p: CatalogProduto) => void;
  onDelete: (id: string) => void;
  onToggleDestaque: (id: string) => void;
  onEditVariante: (v: CatalogVariante) => void;
  onDeleteVariante: (id: string) => void;
}

export function ProdutoPaiCard({ produto, variantes, onEdit, onDelete, onToggleDestaque, onEditVariante, onDeleteVariante }: Props) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-start gap-4">
        <img src={produto.foto} alt={produto.nome} className="h-20 w-20 rounded-lg object-cover bg-muted flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-card-foreground">{produto.nome}</h3>
            <button onClick={() => onToggleDestaque(produto.id)} className="ml-1">
              <Star className={`h-4 w-4 ${produto.destaque ? "fill-primary text-primary" : "text-muted-foreground"}`} />
            </button>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">{produto.descricao}</p>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <Button size="sm" variant="ghost" onClick={() => onEdit(produto)}>
            <Edit className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onDelete(produto.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      {variantes.length > 0 && (
        <div className="mt-3 border-t border-border pt-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Variantes ({variantes.length})</p>
          <ScrollArea className="w-full">
            <div className="flex gap-3 pb-2">
              {variantes.map((v) => (
                <VarianteCard key={v.id} variante={v} onEdit={onEditVariante} onDelete={onDeleteVariante} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

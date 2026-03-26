import { Edit, Trash2, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VarianteCard } from "./VarianteCard";
import type { CatalogProduto, CatalogVariante } from "./mockCatalogoData";

interface Props {
  produto: CatalogProduto;
  variantes: CatalogVariante[];
  expanded: boolean;
  onToggleExpand: (id: string) => void;
  onEdit: (p: CatalogProduto) => void;
  onDelete: (id: string) => void;
  onToggleDestaque: (id: string) => void;
  onEditVariante: (v: CatalogVariante) => void;
  onDeleteVariante: (id: string) => void;
}

export function ProdutoPaiCard({
  produto, variantes, expanded, onToggleExpand,
  onEdit, onDelete, onToggleDestaque, onEditVariante, onDeleteVariante,
}: Props) {
  const minPrice = variantes.length > 0
    ? Math.min(...variantes.map((v) => v.valorVenda))
    : 0;

  return (
    <div className="flex flex-col">
      {/* Compact card — grid item */}
      <button
        onClick={() => onToggleExpand(produto.id)}
        className={`group w-full text-left rounded-lg border overflow-hidden transition-colors ${
          expanded ? "border-primary ring-1 ring-primary/30" : "border-border bg-card hover:bg-secondary"
        }`}
      >
        <div className="relative">
          <img
            src={produto.foto || "/placeholder.svg"}
            alt={produto.nome}
            className="w-full aspect-square object-cover"
          />
          {produto.destaque && (
            <Star className="absolute top-1 right-1 h-3.5 w-3.5 fill-primary text-primary" />
          )}
          {!produto.ativo && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <Badge variant="secondary" className="text-[10px]">Inativo</Badge>
            </div>
          )}
        </div>
        <div className="p-2">
          <p className="text-xs font-medium text-foreground truncate">{produto.nome}</p>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-[11px] text-primary font-semibold">
              {variantes.length > 1
                ? `a partir de R$ ${minPrice.toFixed(2)}`
                : variantes.length === 1
                  ? `R$ ${minPrice.toFixed(2)}`
                  : "Sem variantes"}
            </span>
            <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
          </div>
        </div>
      </button>

      {/* Expanded panel — full width below */}
      {expanded && (
        <div className="col-span-full mt-2 rounded-lg border border-primary/30 bg-card p-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={produto.foto} alt="" className="h-8 w-8 rounded object-cover bg-muted" />
              <div>
                <p className="text-sm font-semibold text-card-foreground">{produto.nome}</p>
                <p className="text-[11px] text-muted-foreground line-clamp-1">{produto.descricao}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onToggleDestaque(produto.id)}>
                <Star className={`h-3.5 w-3.5 ${produto.destaque ? "fill-primary text-primary" : "text-muted-foreground"}`} />
              </Button>
              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onEdit(produto)}>
                <Edit className="h-3.5 w-3.5" />
              </Button>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => onDelete(produto.id)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          {variantes.length > 0 && (
            <div>
              <p className="mb-2 text-[11px] font-medium text-muted-foreground">Variantes ({variantes.length})</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {variantes.map((v) => (
                  <VarianteCard key={v.id} variante={v} onEdit={onEditVariante} onDelete={onDeleteVariante} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

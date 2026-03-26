import { Edit, Trash2, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
      {/* Compact row */}
      <button
        onClick={() => onToggleExpand(produto.id)}
        className={`group flex w-full items-center gap-3 rounded-lg border p-2 text-left transition-colors ${
          expanded ? "border-primary ring-1 ring-primary/30 bg-card" : "border-border bg-card hover:bg-secondary"
        }`}
      >
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
          <img
            src={produto.foto || "/placeholder.svg"}
            alt={produto.nome}
            className="h-full w-full object-cover"
          />
          {!produto.ativo && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <Badge variant="secondary" className="text-[9px] px-1">Inativo</Badge>
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-sm font-medium text-foreground">{produto.nome}</p>
              {produto.destaque && (
                <Star className="h-3.5 w-3.5 flex-shrink-0 fill-primary text-primary" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {variantes.length} variante{variantes.length !== 1 ? "s" : ""}
            </p>
          </div>

          <span className="flex-shrink-0 text-sm font-semibold text-primary">
            {variantes.length > 1
              ? `a partir de R$ ${minPrice.toFixed(2).replace(".", ",")}`
              : variantes.length === 1
                ? `R$ ${minPrice.toFixed(2).replace(".", ",")}`
                : "Sem variantes"}
          </span>

          <ChevronDown className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
        </div>
      </button>

      {/* Expanded panel */}
      {expanded && (
        <div className="mt-1 rounded-lg border border-primary/30 bg-card p-3 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground line-clamp-2 flex-1 mr-3">
              {produto.descricao || "Sem descrição"}
            </p>
            <div className="flex gap-1 flex-shrink-0">
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
              <ScrollArea className="w-full">
                <div className="flex gap-2 pb-1">
                  {variantes.map((v) => (
                    <VarianteCard key={v.id} variante={v} onEdit={onEditVariante} onDelete={onDeleteVariante} />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

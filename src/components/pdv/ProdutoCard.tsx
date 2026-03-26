import { Produto } from "./mockPdvData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProdutoCardProps {
  produto: Produto;
  quantidade: number;
  expanded: boolean;
  onAddVariante: (produto: Produto, variante: typeof produto.variantes[0], qty: number) => void;
  onExpand: (produtoId: string) => void;
}

export function ProdutoCard({ produto, quantidade, expanded, onAddVariante, onExpand }: ProdutoCardProps) {
  const hasMultipleVariants = produto.variantes.length > 1;
  const minPrice = Math.min(...produto.variantes.map((v) => v.preco));

  const handleClick = () => {
    if (hasMultipleVariants) {
      onExpand(produto.id);
    } else {
      onAddVariante(produto, produto.variantes[0], quantidade);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full text-left rounded-lg border border-border bg-card overflow-hidden transition-colors hover:bg-secondary",
        expanded && "border-primary ring-1 ring-primary/30"
      )}
    >
      <img
        src={produto.foto || "/placeholder.svg"}
        alt={produto.nome}
        className="h-24 w-full object-cover"
      />
      <div className="p-2">
        <p className="text-xs font-medium text-foreground truncate">{produto.nome}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[11px] text-primary font-semibold">
            {hasMultipleVariants ? `a partir de R$ ${minPrice.toFixed(2)}` : `R$ ${minPrice.toFixed(2)}`}
          </span>
        </div>
    </button>
  );
}

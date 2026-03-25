import { Produto, Variante } from "./mockPdvData";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface ProdutoCardProps {
  produto: Produto;
  quantidade: number;
  onAddVariante: (produto: Produto, variante: Variante, qty: number) => void;
}

export function ProdutoCard({ produto, quantidade, onAddVariante }: ProdutoCardProps) {
  const [open, setOpen] = useState(false);
  const hasMultipleVariants = produto.variantes.length > 1;

  const handleClick = () => {
    if (hasMultipleVariants) {
      setOpen(!open);
    } else {
      onAddVariante(produto, produto.variantes[0], quantidade);
    }
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button
          onClick={handleClick}
          className={cn(
            "w-full text-left rounded-lg border border-border bg-card p-3 transition-colors hover:bg-secondary",
            open && "border-primary"
          )}
        >
          <p className="text-sm font-medium text-foreground truncate">{produto.nome}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-primary font-semibold">
              R$ {produto.preco.toFixed(2)}
            </span>
            {hasMultipleVariants && (
              <ChevronDown className={cn("h-3 w-3 text-muted-foreground transition-transform", open && "rotate-180")} />
            )}
          </div>
          {produto.comboConfig && (
            <span className="text-[10px] text-warning mt-1 block">
              Combo {produto.comboConfig.slots} itens • -{produto.comboConfig.desconto}%
            </span>
          )}
        </button>
      </CollapsibleTrigger>
      {hasMultipleVariants && (
        <CollapsibleContent className="mt-1 space-y-1">
          {produto.variantes.map((v) => (
            <button
              key={v.id}
              onClick={() => onAddVariante(produto, v, quantidade)}
              className="w-full text-left rounded-md border border-border bg-secondary/50 px-3 py-2 text-xs hover:bg-secondary transition-colors"
            >
              <span className="text-foreground">{v.nome}</span>
              <span className="float-right text-primary font-semibold">R$ {v.preco.toFixed(2)}</span>
            </button>
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}

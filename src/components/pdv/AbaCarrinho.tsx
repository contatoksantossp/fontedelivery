import { ItemCarrinho } from "./mockPdvData";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";

interface AbaCarrinhoProps {
  itens: ItemCarrinho[];
  onUpdateQty: (itemId: string, delta: number) => void;
  onRemove: (itemId: string) => void;
  onProximo: () => void;
}

export function AbaCarrinho({ itens, onUpdateQty, onRemove, onProximo }: AbaCarrinhoProps) {
  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {itens.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <ShoppingCart className="h-8 w-8 mb-2" />
              <p className="text-xs">Carrinho vazio</p>
              <p className="text-[10px]">Adicione produtos da vitrine</p>
            </div>
          ) : (
            itens.map((item) => (
              <div key={item.id} className="flex items-center gap-2 rounded-lg border border-border bg-card p-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate text-base">{item.nome}</p>
                  {item.varianteNome && (
                    <p className="text-muted-foreground text-sm">{item.varianteNome}</p>
                  )}
                  <p className="text-primary font-semibold mt-0.5 text-base">
                    R$ {(item.preco * item.quantidade).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost" size="icon"
                    className="h-7 w-7"
                    onClick={() => onUpdateQty(item.id, -1)}
                  >
                    <Minus className="w-[20px] h-[20px]" />
                  </Button>
                  <span className="font-medium w-5 text-center text-foreground text-base">{item.quantidade}</span>
                  <Button
                    variant="ghost" size="icon"
                    className="h-7 w-7"
                    onClick={() => onUpdateQty(item.id, 1)}
                  >
                    <Plus className="w-[20px] h-[20px]" />
                  </Button>
                  <Button
                    variant="ghost" size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => onRemove(item.id)}
                  >
                    <Trash2 className="w-[20px] h-[20px]" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      <div className="border-t border-border p-3">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground text-3xl">Total</span>
          <span className="font-bold text-foreground text-3xl">R$ {total.toFixed(2)}</span>
        </div>
        <Button onClick={onProximo} className="w-full" disabled={itens.length === 0}>
          Próximo
        </Button>
      </div>
    </div>
  );
}

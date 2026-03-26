import { Produto, Variante } from "./mockPdvData";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface VarianteDrawerProps {
  produto: Produto;
  quantidade: number;
  onAddVariante: (produto: Produto, variante: Variante, qty: number) => void;
  onClose: () => void;
}

export function VarianteDrawer({ produto, quantidade, onAddVariante, onClose }: VarianteDrawerProps) {
  return (
    <div className="col-span-4 border border-primary/30 bg-secondary/50 rounded-lg p-2 mb-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-foreground">
          Variantes de {produto.nome}
        </span>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {produto.variantes.map((v) => (
          <div
            key={v.id}
            className="flex-shrink-0 w-28 rounded-lg border border-border bg-card overflow-hidden"
          >
            <img
              src={v.foto || "/placeholder.svg"}
              alt={v.nome}
              className="h-16 w-full object-cover"
            />
            <div className="p-1.5">
              <p className="text-[10px] text-foreground truncate">{v.nome}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-primary font-semibold">
                  R$ {v.preco.toFixed(2)}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-5 w-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddVariante(produto, v, quantidade);
                  }}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

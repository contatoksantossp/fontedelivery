import { Produto, Variante } from "./mockPdvData";
import { X } from "lucide-react";

interface VarianteDrawerProps {
  produto: Produto;
  quantidade: number;
  onAddVariante: (produto: Produto, variante: Variante, qty: number) => void;
  onClose: () => void;
}

export function VarianteDrawer({ produto, quantidade, onAddVariante, onClose }: VarianteDrawerProps) {
  return (
    <div className="col-span-4 border border-primary/30 bg-secondary/50 rounded-lg p-2 mb-1">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-foreground">
          Variantes de {produto.nome}
        </span>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {produto.variantes.map((v) => (
          <button
            key={v.id}
            onClick={() => onAddVariante(produto, v, quantidade)}
            className="flex-shrink-0 w-28 rounded-lg border border-border bg-card overflow-hidden text-left cursor-pointer hover:bg-secondary transition-colors"
          >
            <div className="aspect-square w-full overflow-hidden">
              <img
                src={v.foto || "/placeholder.svg"}
                alt={v.nome}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-1.5">
              <p className="text-[10px] text-foreground truncate">{v.nome}</p>
              <span className="text-[10px] text-primary font-semibold">
                R$ {v.preco.toFixed(2)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

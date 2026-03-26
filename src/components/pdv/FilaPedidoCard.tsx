import { PedidoFila } from "./mockPdvData";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Truck, MapPin, Banknote, QrCode, CreditCard } from "lucide-react";
import { PedidoRastreio } from "@/components/PedidoRastreio";

interface FilaPedidoCardProps {
  pedido: PedidoFila;
  selected: boolean;
  onSelect: (pedido: PedidoFila) => void;
}

const metodoIconMap: Record<string, typeof Banknote> = {
  dinheiro: Banknote,
  pix: QrCode,
  qr: QrCode,
  cartao_credito: CreditCard,
  cartao_debito: CreditCard,
};

const canalLabel: Record<string, string> = {
  balcao: "Balcão",
  whatsapp: "WhatsApp",
  "99food": "99Food",
  ifood: "iFood",
  app: "App",
};

export function FilaPedidoCard({ pedido, selected, onSelect }: FilaPedidoCardProps) {
  // Deduplicate payment icons
  const paymentIcons = Array.from(
    new Set(pedido.pagamentos.map((p) => p.metodo))
  ).map((metodo) => metodoIconMap[metodo]).filter(Boolean);

  return (
    <button
      onClick={() => onSelect(pedido)}
      className={cn(
        "w-full text-left rounded-lg border p-2 transition-colors",
        selected
          ? "border-primary bg-primary/10"
          : "border-border bg-card hover:bg-secondary"
      )}
    >
      {/* L1: Código + Canal */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground">{pedido.codigo}</span>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
          {canalLabel[pedido.canal]}
        </Badge>
      </div>

      {/* L2: Cliente + Modalidade */}
      <div className="flex items-center justify-between mt-1">
        <p className="text-muted-foreground truncate flex-1 text-base">{pedido.cliente}</p>
        <div className="flex items-center gap-0.5 text-muted-foreground ml-1">
          {pedido.modalidade === "entrega" ? (
            <Truck className="w-[40px] h-[20px]" />
          ) : (
            <MapPin className="h-3 w-3" />
          )}
        </div>
      </div>

      {/* L3: Endereço (somente entrega) */}
      {pedido.modalidade === "entrega" && pedido.endereco && (
        <p className="text-muted-foreground/70 truncate mt-0.5 text-xs">
          {pedido.endereco}
        </p>
      )}

      {/* L4: Valor + Ícones pagamento */}
      <div className="flex items-center justify-between mt-1">
        <span className="font-bold text-foreground text-lg">
          R$ {pedido.total.toFixed(2)}
        </span>
        <div className="flex items-center gap-1">
          {paymentIcons.map((Icon, idx) => (
            <Icon key={idx} className="text-muted-foreground w-[40px] h-[20px]" />
          ))}
        </div>
      </div>

      {/* Rastreio */}
      <div className="border-t border-border/50 mt-1.5 pt-1.5">
        <PedidoRastreio status="rascunho" criadoEm={pedido.criadoEm} />
      </div>
    </button>
  );
}

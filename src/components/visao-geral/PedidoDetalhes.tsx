import { Pedido } from "./mockData";
import { Phone, MapPin, FileText, CreditCard } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface PedidoDetalhesProps {
  pedido: Pedido | null;
}

export function PedidoDetalhes({ pedido }: PedidoDetalhesProps) {
  if (!pedido) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        Selecione um pedido para ver os detalhes
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display font-bold text-lg text-foreground">{pedido.codigo}</span>
            <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full capitalize">
              {pedido.status}
            </span>
          </div>
          <p className="text-sm font-medium text-foreground">{pedido.cliente}</p>
        </div>

        <Separator />

        {/* Contato e Endereço */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span>{pedido.telefone}</span>
          </div>
          {pedido.tipo === "entrega" && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>{pedido.endereco}, {pedido.bairro}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Itens */}
        <div>
          <h4 className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-2">
            Itens do Pedido
          </h4>
          <div className="space-y-1.5">
            {pedido.itens.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <div>
                  <span className="text-foreground">{item.qtd}x {item.nome}</span>
                  {item.obs && (
                    <p className="text-xs text-muted-foreground ml-4">↳ {item.obs}</p>
                  )}
                </div>
                <span className="text-foreground font-medium whitespace-nowrap">
                  R$ {(item.qtd * item.preco).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {pedido.observacoes && (
          <>
            <Separator />
            <div className="flex items-start gap-2 text-sm">
              <FileText className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground" />
              <p className="text-muted-foreground">{pedido.observacoes}</p>
            </div>
          </>
        )}

        <Separator />

        {/* Financeiro */}
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>R$ {pedido.subtotal.toFixed(2)}</span>
          </div>
          {pedido.taxaEntrega > 0 && (
            <div className="flex justify-between text-muted-foreground">
              <span>Taxa de Entrega</span>
              <span>R$ {pedido.taxaEntrega.toFixed(2)}</span>
            </div>
          )}
          {pedido.desconto > 0 && (
            <div className="flex justify-between text-primary">
              <span>Desconto</span>
              <span>-R$ {pedido.desconto.toFixed(2)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-bold text-foreground text-base">
            <span>Total</span>
            <span>R$ {pedido.total.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
            <CreditCard className="h-3 w-3" />
            <span>{pedido.formaPagamento}</span>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

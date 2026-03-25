import { Rota } from "./mockRotasData";
import { RotaTimeline } from "./RotaTimeline";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Clock, Navigation, DollarSign, Bike, Car, Truck } from "lucide-react";

const veiculoIcon: Record<string, React.ElementType> = {
  Moto: Truck,
  Bicicleta: Bike,
  Carro: Car,
};

interface RotaDetalhesProps {
  rota: Rota | null;
}

export function RotaDetalhes({ rota }: RotaDetalhesProps) {
  if (!rota) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground p-4">
        <div className="text-center">
          <Navigation className="h-8 w-8 mx-auto mb-2 opacity-40" />
          <p className="text-xs">Selecione uma rota</p>
        </div>
      </div>
    );
  }

  const VeiculoIcon = veiculoIcon[rota.entregadorVeiculo] || Truck;
  const totalTaxas = rota.paradas.reduce((s, p) => s + p.taxaEntrega, 0);
  const totalPedidos = rota.paradas.reduce((s, p) => s + p.totalPedido, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <VeiculoIcon className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">{rota.entregadorNome}</h3>
        </div>
        <p className="text-[10px] text-muted-foreground">{rota.entregadorVeiculo} · {rota.paradas.length} parada{rota.paradas.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Timeline */}
      <div className="px-3 py-2 border-b border-border">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Rota</p>
        <RotaTimeline paradas={rota.paradas} />
      </div>

      {/* Pedidos detalhados */}
      <ScrollArea className="flex-1">
        <div className="p-3">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Pedidos</p>
          <Accordion type="single" collapsible className="space-y-1">
            {rota.paradas.map((parada) => (
              <AccordionItem key={parada.id} value={parada.id} className="border rounded-md border-border px-2">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <div className="flex flex-col items-start text-left">
                    <span className="text-xs font-semibold">{parada.pedidoCodigo} — {parada.cliente}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {parada.endereco}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Distância</span>
                      <span>{parada.km} km</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Taxa entrega</span>
                      <span>R$ {parada.taxaEntrega.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-foreground">
                      <span>Total pedido</span>
                      <span>R$ {parada.totalPedido.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Pagamento</span>
                      <span>{parada.formaPagamento}</span>
                    </div>

                    {/* Itens */}
                    <div className="pt-1 border-t border-border">
                      <p className="text-[10px] font-semibold text-muted-foreground mb-1">Itens:</p>
                      {parada.itens.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-muted-foreground">
                          <span>{item.qtd}x {item.nome}</span>
                          <span>R$ {(item.qtd * item.preco).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {parada.observacoes && (
                      <p className="text-[10px] text-muted-foreground italic pt-1">
                        Obs: {parada.observacoes}
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>

      {/* Footer metrics */}
      <div className="p-3 border-t border-border grid grid-cols-2 gap-2 text-[10px]">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>~{rota.tempoEstimado} min</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Navigation className="h-3 w-3" />
          <span>{rota.kmTotal} km</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <DollarSign className="h-3 w-3" />
          <span>Taxas: R$ {totalTaxas.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-1 text-foreground font-semibold">
          <DollarSign className="h-3 w-3" />
          <span>Total: R$ {totalPedidos.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

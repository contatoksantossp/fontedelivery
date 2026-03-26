import { useState, useEffect } from "react";
import { Rota } from "./mockRotasData";
import { RotaTimeline } from "./RotaTimeline";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Navigation, DollarSign, Bike, Car, Truck, Gift, Timer } from "lucide-react";

const veiculoIcon: Record<string, React.ElementType> = {
  Moto: Truck,
  Bicicleta: Bike,
  Carro: Car,
};

interface RotaDetalhesProps {
  rota: Rota | null;
  cor: string;
  onBonificacaoChange?: (rotaId: string, valor: number) => void;
}

export function RotaDetalhes({ rota, cor, onBonificacaoChange }: RotaDetalhesProps) {
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    if (!rota?.inicioRota) { setElapsed(""); return; }

    const calcElapsed = () => {
      const start = new Date(rota.inicioRota!).getTime();
      const end = rota.fimRota ? new Date(rota.fimRota).getTime() : Date.now();
      const diffMs = Math.max(0, end - start);
      const h = Math.floor(diffMs / 3600000);
      const m = Math.floor((diffMs % 3600000) / 60000);
      const s = Math.floor((diffMs % 60000) / 1000);
      setElapsed(h > 0 ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m ${String(s).padStart(2, "0")}s`);
    };

    calcElapsed();
    if (!rota.fimRota) {
      const interval = setInterval(calcElapsed, 1000);
      return () => clearInterval(interval);
    }
  }, [rota?.inicioRota, rota?.fimRota]);

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
  const canEditBonus = rota.status !== "finalizada" && rota.status !== "concluida";

  return (
    <div className="flex flex-col h-full">
      {/* Header with driver color */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: cor }} />
          <VeiculoIcon className="h-4 w-4" style={{ color: cor }} />
          <h3 className="text-sm font-bold text-foreground">{rota.entregadorNome}</h3>
        </div>
        <p className="text-[10px] text-muted-foreground">{rota.entregadorVeiculo} · {rota.paradas.length} parada{rota.paradas.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Timeline - top half */}
      <div className="px-3 py-2 border-b border-border max-h-[40%] overflow-y-auto scrollbar-thin">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Rota</p>
        <RotaTimeline paradas={rota.paradas} cor={cor} />
      </div>

      {/* Bonificação */}
      <div className="px-3 py-2 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Gift className="h-3.5 w-3.5" />
            <span className="font-medium">Bonificação</span>
          </div>
          {canEditBonus ? (
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground">R$</span>
              <Input
                type="number"
                min={0}
                step={0.5}
                value={rota.bonificacao}
                onChange={(e) => onBonificacaoChange?.(rota.id, parseFloat(e.target.value) || 0)}
                className="w-16 h-6 text-[11px] px-1.5 py-0 text-right"
              />
            </div>
          ) : (
            <span className="text-[11px] font-medium text-foreground">R$ {rota.bonificacao.toFixed(2)}</span>
          )}
        </div>
      </div>

      {/* Pedidos detalhados - bottom half */}
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
                    <div className="flex justify-between text-muted-foreground">
                      <span>Origem</span>
                      <span>{parada.origem}</span>
                    </div>

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
      <div className="p-3 border-t border-border grid grid-cols-3 gap-2 text-[10px]">
        {elapsed && (
          <div className={`flex items-center gap-1 ${rota.fimRota ? "text-muted-foreground" : "text-primary font-semibold"}`}>
            <Timer className="h-3 w-3" />
            <span>{elapsed}{!rota.fimRota && " ⏱"}</span>
          </div>
        )}
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

import { useState } from "react";
import { Pagamento } from "./mockPdvData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Banknote, CreditCard, QrCode, Smartphone, X, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AbaPagamentosProps {
  subtotal: number;
  desconto: number;
  taxaEntrega: number;
  pagamentos: Pagamento[];
  onAddPagamento: (p: Pagamento) => void;
  onRemovePagamento: (id: string) => void;
  onFinalizar: () => void;
}

type MetodoPag = Pagamento["metodo"];

const metodos: { id: MetodoPag; label: string; icon: React.ReactNode }[] = [
  { id: "dinheiro", label: "Dinheiro", icon: <Banknote className="h-3.5 w-3.5" /> },
  { id: "pix", label: "PIX", icon: <Smartphone className="h-3.5 w-3.5" /> },
  { id: "cartao_credito", label: "Crédito", icon: <CreditCard className="h-3.5 w-3.5" /> },
  { id: "cartao_debito", label: "Débito", icon: <CreditCard className="h-3.5 w-3.5" /> },
  { id: "qr", label: "QR Code", icon: <QrCode className="h-3.5 w-3.5" /> },
];

const atalhosTroco = [10, 20, 50, 100];

export function AbaPagamentos({
  subtotal, desconto, taxaEntrega,
  pagamentos, onAddPagamento, onRemovePagamento, onFinalizar,
}: AbaPagamentosProps) {
  const total = subtotal - desconto + taxaEntrega;
  const pago = pagamentos.reduce((a, p) => a + p.valor, 0);
  const falta = Math.max(0, total - pago);

  const [metodoSelecionado, setMetodoSelecionado] = useState<MetodoPag>("pix");
  const [valorInput, setValorInput] = useState("");
  const [trocoExtra, setTrocoExtra] = useState(0);

  const valorNumerico = parseFloat(valorInput) || 0;
  const trocoCalculado = metodoSelecionado === "dinheiro" && valorNumerico > 0
    ? Math.max(0, (valorNumerico + trocoExtra) - falta)
    : 0;

  const handleFracao = (fracao: number) => {
    setValorInput((total * fracao).toFixed(2));
    setTrocoExtra(0);
  };

  const handleLancar = () => {
    const valor = parseFloat(valorInput);
    if (isNaN(valor) || valor <= 0) return;

    const troco = metodoSelecionado === "dinheiro" ? Math.max(0, (valor + trocoExtra) - falta) : undefined;

    onAddPagamento({
      id: crypto.randomUUID(),
      metodo: metodoSelecionado,
      valor: metodoSelecionado === "dinheiro" ? Math.min(valor, falta) : valor,
      troco: troco && troco > 0 ? troco : undefined,
    });
    setValorInput("");
    setTrocoExtra(0);
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {/* Resumo financeiro */}
          <div className="rounded-lg border border-border bg-card p-3 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">R$ {subtotal.toFixed(2)}</span>
            </div>
            {desconto > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Desconto</span>
                <span className="text-success">-R$ {desconto.toFixed(2)}</span>
              </div>
            )}
            {taxaEntrega > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Taxa entrega</span>
                <span className="text-foreground">R$ {taxaEntrega.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline border-t border-border pt-2 mt-1">
              <span className="text-sm font-semibold text-foreground">Total</span>
              <span className="text-lg font-bold text-foreground">R$ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Pagamentos adicionados */}
          {pagamentos.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">Pagamentos</p>
              {pagamentos.map((p) => {
                const met = metodos.find((m) => m.id === p.metodo);
                return (
                  <div key={p.id} className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2">
                    <div className="flex items-center gap-2">
                      {met?.icon}
                      <span className="text-xs text-foreground">{met?.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-foreground">R$ {p.valor.toFixed(2)}</span>
                      {p.troco !== undefined && p.troco > 0 && (
                        <span className="text-[10px] text-warning">Troco: R$ {p.troco.toFixed(2)}</span>
                      )}
                      <button onClick={() => onRemovePagamento(p.id)} className="text-muted-foreground hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Falta */}
          {falta > 0 && (
            <div className="flex justify-between items-baseline px-1">
              <span className="text-xs font-bold text-warning uppercase tracking-wider">Falta:</span>
              <span className="text-base font-bold text-warning">R$ {falta.toFixed(2)}</span>
            </div>
          )}
          {falta <= 0 && pago > 0 && (
            <div className="flex justify-between items-baseline px-1">
              <span className="text-xs font-bold text-success uppercase tracking-wider">Pago</span>
              <span className="text-base font-bold text-success">R$ {pago.toFixed(2)}</span>
            </div>
          )}

          {/* Frações */}
          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" className="flex-1 text-[10px] h-7" onClick={() => handleFracao(1/3)}>1/3</Button>
            <Button variant="outline" size="sm" className="flex-1 text-[10px] h-7" onClick={() => handleFracao(0.5)}>Metade</Button>
            <Button variant="outline" size="sm" className="flex-1 text-[10px] h-7" onClick={() => handleFracao(1)}>Total</Button>
          </div>

          {/* Input valor */}
          <Input
            type="number"
            placeholder="R$ 0,00"
            value={valorInput}
            onChange={(e) => { setValorInput(e.target.value); setTrocoExtra(0); }}
            className="h-9 text-sm"
          />

          {/* Métodos de pagamento — grid-cols-5 */}
          <div className="grid grid-cols-5 gap-1">
            {metodos.map((m) => (
              <button
                key={m.id}
                onClick={() => setMetodoSelecionado(m.id)}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-lg border p-1.5 text-[9px] transition-colors",
                  metodoSelecionado === m.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
          </div>

          {/* Troco inline (dinheiro) */}
          {metodoSelecionado === "dinheiro" && valorNumerico > 0 && (
            <div className="rounded-lg border border-border bg-card p-2.5 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Troco para:</span>
                <span className="text-sm font-bold text-primary">R$ {trocoCalculado.toFixed(2)}</span>
              </div>
              <div className="flex gap-1.5">
                {atalhosTroco.map((val) => (
                  <Button
                    key={val}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-[10px] h-7"
                    onClick={() => setTrocoExtra((prev) => prev + val)}
                  >
                    +R${val}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Lançar Valor */}
          <Button onClick={handleLancar} className="w-full gap-1.5" size="sm" disabled={!valorInput || valorNumerico <= 0}>
            <Plus className="h-3.5 w-3.5" /> Lançar Valor
          </Button>
        </div>
      </ScrollArea>

      {/* Finalizar */}
      <div className="border-t border-border p-3">
        <Button onClick={onFinalizar} className="w-full gap-2" disabled={pago < total}>
          <Check className="h-4 w-4" /> Finalizar Pedido
        </Button>
      </div>
    </div>
  );
}

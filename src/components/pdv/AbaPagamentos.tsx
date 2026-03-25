import { useState } from "react";
import { Pagamento } from "./mockPdvData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Banknote, CreditCard, QrCode, Smartphone, X, Check } from "lucide-react";
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
  { id: "dinheiro", label: "Dinheiro", icon: <Banknote className="h-4 w-4" /> },
  { id: "pix", label: "Pix", icon: <Smartphone className="h-4 w-4" /> },
  { id: "cartao_credito", label: "Crédito", icon: <CreditCard className="h-4 w-4" /> },
  { id: "cartao_debito", label: "Débito", icon: <CreditCard className="h-4 w-4" /> },
  { id: "qr", label: "QR Code", icon: <QrCode className="h-4 w-4" /> },
];

export function AbaPagamentos({
  subtotal, desconto, taxaEntrega,
  pagamentos, onAddPagamento, onRemovePagamento, onFinalizar,
}: AbaPagamentosProps) {
  const total = subtotal - desconto + taxaEntrega;
  const pago = pagamentos.reduce((a, p) => a + p.valor, 0);
  const falta = Math.max(0, total - pago);
  const excedente = Math.max(0, pago - total);

  const [metodoSelecionado, setMetodoSelecionado] = useState<MetodoPag>("pix");
  const [valorInput, setValorInput] = useState("");
  const [showTrocoDialog, setShowTrocoDialog] = useState(false);
  const [valorDinheiro, setValorDinheiro] = useState(0);

  const handleFracao = (fracao: number) => {
    const val = total * fracao;
    setValorInput(val.toFixed(2));
  };

  const handleAdicionar = () => {
    const valor = parseFloat(valorInput);
    if (isNaN(valor) || valor <= 0) return;

    if (metodoSelecionado === "dinheiro") {
      setValorDinheiro(valor);
      setShowTrocoDialog(true);
      return;
    }

    onAddPagamento({
      id: crypto.randomUUID(),
      metodo: metodoSelecionado,
      valor,
    });
    setValorInput("");
  };

  const handleConfirmarDinheiro = () => {
    onAddPagamento({
      id: crypto.randomUUID(),
      metodo: "dinheiro",
      valor: Math.min(valorDinheiro, falta + valorDinheiro - pago > 0 ? falta : valorDinheiro),
      troco: Math.max(0, valorDinheiro - falta),
    });
    setShowTrocoDialog(false);
    setValorInput("");
  };

  const trocoAtual = Math.max(0, valorDinheiro - falta);
  const atalhosTroco = [2, 5, 10, 20, 50, 100];

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {/* Demonstrativo */}
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
            <div className="flex justify-between text-sm font-bold border-t border-border pt-1">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">R$ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Falta / Excedente */}
          {falta > 0 && (
            <div className="text-center py-2 rounded-lg bg-warning/10">
              <p className="text-xs text-warning font-semibold">Falta R$ {falta.toFixed(2)}</p>
            </div>
          )}
          {excedente > 0 && (
            <div className="text-center py-2 rounded-lg bg-success/10">
              <p className="text-xs text-success font-semibold">Excedente R$ {excedente.toFixed(2)} (gorjeta)</p>
            </div>
          )}

          {/* Frações */}
          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" className="flex-1 text-[10px] h-7" onClick={() => handleFracao(1/3)}>1/3</Button>
            <Button variant="outline" size="sm" className="flex-1 text-[10px] h-7" onClick={() => handleFracao(0.5)}>Metade</Button>
            <Button variant="outline" size="sm" className="flex-1 text-[10px] h-7" onClick={() => handleFracao(1)}>Total</Button>
          </div>

          {/* Valor + Método */}
          <div>
            <Input
              type="number"
              placeholder="Valor R$"
              value={valorInput}
              onChange={(e) => setValorInput(e.target.value)}
              className="h-9 text-sm mb-2"
            />
            <div className="grid grid-cols-3 gap-1.5">
              {metodos.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMetodoSelecionado(m.id)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-lg border p-2 text-[10px] transition-colors",
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
            <Button onClick={handleAdicionar} className="w-full mt-2" size="sm" disabled={!valorInput}>
              Adicionar Pagamento
            </Button>
          </div>

          {/* Lista pagamentos */}
          {pagamentos.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">Pagamentos</p>
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
        </div>
      </ScrollArea>

      {/* Finalizar */}
      <div className="border-t border-border p-3">
        <Button onClick={onFinalizar} className="w-full gap-2" disabled={pago < total}>
          <Check className="h-4 w-4" /> Finalizar Pedido
        </Button>
      </div>

      {/* Dialog Troco */}
      <Dialog open={showTrocoDialog} onOpenChange={setShowTrocoDialog}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-sm">Troco para Dinheiro</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Valor recebido</p>
              <p className="text-lg font-bold text-foreground">R$ {valorDinheiro.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">Troco</p>
              <p className="text-lg font-bold text-primary">R$ {trocoAtual.toFixed(2)}</p>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {atalhosTroco.map((val) => (
                <Button
                  key={val}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setValorDinheiro(valorDinheiro + val)}
                >
                  +{val}
                </Button>
              ))}
            </div>
            <Button onClick={handleConfirmarDinheiro} className="w-full">
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

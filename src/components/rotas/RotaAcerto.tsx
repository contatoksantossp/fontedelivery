import { useState } from "react";
import { Rota, Parada, PagamentoParada } from "./mockRotasData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, DollarSign, Receipt, Pencil, X, Banknote, Smartphone, CreditCard, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

const metodos = [
  { id: "dinheiro", label: "Dinheiro", icon: Banknote },
  { id: "pix", label: "PIX", icon: Smartphone },
  { id: "credito", label: "Crédito", icon: CreditCard },
  { id: "debito", label: "Débito", icon: CreditCard },
  { id: "qr", label: "QR", icon: QrCode },
];

interface RotaAcertoProps {
  rota: Rota;
  onDarBaixa: (paradaId: string) => void;
  onConcluirRota: (rotaId: string) => void;
  onAlterarPagamento: (paradaId: string, forma: string) => void;
  onAlterarPagamentos: (paradaId: string, pagamentos: PagamentoParada[]) => void;
}

export function RotaAcerto({ rota, onDarBaixa, onConcluirRota, onAlterarPagamento, onAlterarPagamentos }: RotaAcertoProps) {
  const todasComBaixa = rota.paradas.every((p) => p.baixaRealizada);
  const totalGeral = rota.paradas.reduce((s, p) => s + p.totalPedido, 0);
  const totalTaxas = rota.paradas.reduce((s, p) => s + p.taxaEntrega, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary" />
          <div>
            <h3 className="text-sm font-bold text-foreground">Acerto de Contas</h3>
            <p className="text-[10px] text-muted-foreground">{rota.entregadorNome} · {rota.paradas.length} entregas</p>
          </div>
        </div>
      </div>

      {/* List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {rota.paradas.map((parada) => (
            <ParadaAcertoItem
              key={parada.id}
              parada={parada}
              onDarBaixa={() => onDarBaixa(parada.id)}
              onAlterarPagamentos={(pags) => onAlterarPagamentos(parada.id, pags)}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-border space-y-2">
        <div className="grid grid-cols-2 gap-1 text-[11px]">
          <span className="text-muted-foreground">Total Pedidos:</span>
          <span className="text-right font-semibold text-foreground">R$ {totalGeral.toFixed(2)}</span>
          <span className="text-muted-foreground">Total Taxas:</span>
          <span className="text-right text-foreground">R$ {totalTaxas.toFixed(2)}</span>
          <span className="text-muted-foreground">Bonificação:</span>
          <span className="text-right text-foreground">R$ {rota.bonificacao.toFixed(2)}</span>
        </div>

        <Button
          className="w-full"
          disabled={!todasComBaixa}
          onClick={() => onConcluirRota(rota.id)}
        >
          <DollarSign className="h-4 w-4 mr-1" />
          Concluir Rota
        </Button>

        {!todasComBaixa && (
          <p className="text-[10px] text-muted-foreground text-center">
            Dê baixa em todos os pedidos para concluir
          </p>
        )}
      </div>
    </div>
  );
}

function ParadaAcertoItem({
  parada,
  onDarBaixa,
  onAlterarPagamentos,
}: {
  parada: Parada;
  onDarBaixa: () => void;
  onAlterarPagamentos: (pags: PagamentoParada[]) => void;
}) {
  const [editando, setEditando] = useState(false);
  const [metodoSel, setMetodoSel] = useState("pix");
  const [valorInput, setValorInput] = useState("");
  const [trocoInput, setTrocoInput] = useState("");

  const pagamentos = parada.pagamentos || [];
  const desconto = parada.desconto || 0;
  const subtotal = parada.totalPedido;
  const taxa = parada.taxaEntrega;
  const total = subtotal - desconto + taxa;
  const pago = pagamentos.reduce((a, p) => a + p.valor, 0);
  const falta = Math.max(0, total - pago);

  const podeDarBaixa = parada.baixaRealizada || (pagamentos.length > 0 && falta <= 0.01);

  const trocoRecebido = parseFloat(trocoInput || "0");
  const valorNum = parseFloat(valorInput || "0");
  const trocoCalculado = metodoSel === "dinheiro" ? Math.max(0, trocoRecebido - valorNum) : 0;

  const handleLancar = () => {
    const valor = parseFloat(valorInput);
    if (isNaN(valor) || valor <= 0) return;

    const valorEfetivo = Math.min(valor, falta);
    const novoPag: PagamentoParada = {
      id: crypto.randomUUID(),
      metodo: metodoSel,
      valor: valorEfetivo,
      troco: metodoSel === "dinheiro" && trocoCalculado > 0 ? trocoCalculado : undefined,
    };
    onAlterarPagamentos([...pagamentos, novoPag]);
    setValorInput("");
    setTrocoInput("");
  };

  const handleMetodoClick = (id: string) => {
    setMetodoSel(id);
    if (id !== "dinheiro" && valorInput && parseFloat(valorInput) > 0) {
      // Auto-launch for non-cash methods
      const valor = parseFloat(valorInput);
      if (!isNaN(valor) && valor > 0) {
        const valorEfetivo = Math.min(valor, falta);
        const novoPag: PagamentoParada = {
          id: crypto.randomUUID(),
          metodo: id,
          valor: valorEfetivo,
        };
        onAlterarPagamentos([...pagamentos, novoPag]);
        setValorInput("");
      }
    }
    setTrocoInput("");
  };

  const handleRemoverPag = (id: string) => {
    onAlterarPagamentos(pagamentos.filter((p) => p.id !== id));
  };

  const handleFracao = (frac: number) => {
    setValorInput((falta * frac).toFixed(2));
  };

  const handleAddTroco = (val: number) => {
    const current = parseFloat(trocoInput || "0");
    setTrocoInput((current + val).toString());
  };

  const handleDarBaixaClick = () => {
    // If no custom payments yet, create one from original formaPagamento
    if (pagamentos.length === 0) {
      onAlterarPagamentos([{
        id: crypto.randomUUID(),
        metodo: parada.formaPagamento,
        valor: total,
      }]);
    }
    onDarBaixa();
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-3 space-y-2",
        parada.baixaRealizada
          ? "bg-muted/30 border-border opacity-60"
          : "bg-card border-border"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-foreground">{parada.pedidoCodigo} — {parada.cliente}</p>
          <p className="text-[10px] text-muted-foreground">{parada.endereco}</p>
        </div>
        <span className="text-sm font-bold text-foreground">R$ {parada.totalPedido.toFixed(2)}</span>
      </div>

      {/* Actions row */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
          {parada.formaPagamento}
        </span>
        <div className="flex-1" />
        {!parada.baixaRealizada && (
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-[11px] px-2"
            onClick={() => setEditando(!editando)}
          >
            <Pencil className="h-3 w-3 mr-1" />
            {editando ? "Fechar" : "Editar"}
          </Button>
        )}
        <Button
          size="sm"
          variant={parada.baixaRealizada ? "secondary" : "default"}
          className="h-7 text-[11px] px-3"
          disabled={parada.baixaRealizada || (editando && !podeDarBaixa)}
          onClick={handleDarBaixaClick}
        >
          {parada.baixaRealizada ? (
            <><Check className="h-3 w-3 mr-1" /> OK</>
          ) : (
            "Dar Baixa"
          )}
        </Button>
      </div>

      {/* Expanded edit panel */}
      {editando && !parada.baixaRealizada && (
        <div className="border-t border-border pt-2 space-y-2">
          {/* Existing payments */}
          {pagamentos.length > 0 && (
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase">Pagamentos</p>
              {pagamentos.map((p) => {
                const met = metodos.find((m) => m.id === p.metodo) || metodos[1];
                const Icon = met.icon;
                return (
                  <div key={p.id} className="flex items-center justify-between rounded border border-border bg-muted/20 px-2 py-1">
                    <div className="flex items-center gap-1.5">
                      <Icon className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] text-foreground">{met.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold text-foreground">R$ {p.valor.toFixed(2)}</span>
                      {p.troco && p.troco > 0 && (
                        <span className="text-[9px] text-warning">Troco: R$ {p.troco.toFixed(2)}</span>
                      )}
                      <button onClick={() => handleRemoverPag(p.id)} className="text-muted-foreground hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Financial summary */}
          <div className="rounded border border-border bg-muted/10 p-2 space-y-0.5 text-[10px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">R$ {subtotal.toFixed(2)}</span>
            </div>
            {desconto > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Desconto</span>
                <span className="text-accent-foreground">-R$ {desconto.toFixed(2)}</span>
              </div>
            )}
            {taxa > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxa Entrega</span>
                <span className="text-foreground">R$ {taxa.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-border pt-0.5 font-bold text-xs">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">R$ {total.toFixed(2)}</span>
            </div>
            {falta > 0.01 && (
              <div className="flex justify-between pt-0.5">
                <span className="font-semibold text-destructive">FALTA</span>
                <span className="font-bold text-destructive text-xs">R$ {falta.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Fraction buttons */}
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="flex-1 text-[9px] h-6" onClick={() => handleFracao(1 / 3)}>1/3</Button>
            <Button variant="outline" size="sm" className="flex-1 text-[9px] h-6" onClick={() => handleFracao(0.5)}>Metade</Button>
            <Button variant="outline" size="sm" className="flex-1 text-[9px] h-6" onClick={() => handleFracao(1)}>Total</Button>
          </div>

          {/* Input + payment methods */}
          <div className="space-y-1.5">
            <Input
              type="number"
              placeholder="Valor R$"
              value={valorInput}
              onChange={(e) => setValorInput(e.target.value)}
              className="h-7 text-[11px]"
            />
            <div className="grid grid-cols-5 gap-1">
              {metodos.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleMetodoClick(m.id)}
                    className={cn(
                      "flex flex-col items-center gap-0.5 rounded border p-1.5 text-[8px] transition-colors",
                      metodoSel === m.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    {m.label}
                  </button>
                );
              })}
            </div>

            {/* Troco section for dinheiro */}
            {metodoSel === "dinheiro" && valorInput && (
              <div className="space-y-1">
                <p className="text-[9px] font-semibold text-muted-foreground uppercase">Troco recebido</p>
                <Input
                  type="number"
                  placeholder="Valor recebido R$"
                  value={trocoInput}
                  onChange={(e) => setTrocoInput(e.target.value)}
                  className="h-7 text-[11px]"
                />
                <div className="flex gap-1">
                  {[2, 5, 10, 20, 50].map((v) => (
                    <Button key={v} variant="outline" size="sm" className="flex-1 text-[9px] h-5 px-1"
                      onClick={() => handleAddTroco(v)}
                    >
                      +{v}
                    </Button>
                  ))}
                </div>
                {trocoCalculado > 0 && (
                  <p className="text-[10px] font-semibold text-primary text-center">
                    Troco: R$ {trocoCalculado.toFixed(2)}
                  </p>
                )}
              </div>
            )}

            <Button size="sm" className="w-full h-7 text-[11px]" onClick={handleLancar} disabled={!valorInput}>
              + Lançar Valor
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

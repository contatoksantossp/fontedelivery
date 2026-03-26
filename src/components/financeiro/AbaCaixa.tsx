import { useState } from "react";
import { DollarSign, ArrowUpCircle, ArrowDownCircle, Wallet, AlertTriangle, Lock, Unlock, ChevronDown, Banknote, CreditCard, QrCode, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MetricCard } from "@/components/MetricCard";
import { ValorOculto } from "./ValorOculto";
import { EntregadorAcerto } from "./EntregadorAcerto";
import type { CaixaState, EntregadorTurno, Transacao } from "./mockFinanceiroData";

interface AbaCaixaProps {
  caixa: CaixaState;
  entregadores: EntregadorTurno[];
  recebimentosPorMetodo: { dinheiro: number; pix: number; cartao: number; qrcode: number };
  onAbrirCaixa: (fundo: number) => void;
  onFecharCaixa: (contagem: number) => void;
  onSangriaReforco: (tipo: "sangria" | "reforco", valor: number, descricao: string) => void;
  onRegistrarAcerto: (id: string, diaria: number, extras: { valor: number; descricao: string }[]) => void;
}

export function AbaCaixa({ caixa, entregadores, recebimentosPorMetodo, onAbrirCaixa, onFecharCaixa, onSangriaReforco, onRegistrarAcerto }: AbaCaixaProps) {
  const [fundoInput, setFundoInput] = useState("500");
  const [dialogSR, setDialogSR] = useState(false);
  const [srTipo, setSrTipo] = useState<"sangria" | "reforco">("sangria");
  const [srValor, setSrValor] = useState("");
  const [srDescricao, setSrDescricao] = useState("");
  const [dialogFechar, setDialogFechar] = useState(false);
  const [contagem, setContagem] = useState("");
  const [detalhesAberto, setDetalhesAberto] = useState(false);

  return (
    <div className="space-y-6">
      {/* Gestão da Gaveta */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold font-display text-foreground">Gestão da Gaveta</h3>

        {caixa.status === "fechado" ? (
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div className="flex items-center gap-3 text-warning">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Caixa fechado</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Último fechamento: {new Date(caixa.ultimoFechamento.data).toLocaleString("pt-BR")} — Total: R$ {caixa.ultimoFechamento.total.toFixed(2)}
            </p>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                value={fundoInput}
                onChange={e => setFundoInput(e.target.value)}
                placeholder="Fundo inicial"
                className="w-40"
              />
              <Button onClick={() => onAbrirCaixa(Number(fundoInput))}>
                <Unlock className="h-4 w-4 mr-1" /> Abrir Caixa
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Fundo Inicial</p>
                <ValorOculto valor={`R$ ${caixa.fundoInicial.toFixed(2)}`} className="text-lg" />
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Entradas</p>
                <ValorOculto valor={`R$ ${caixa.entradas.toFixed(2)}`} className="text-lg text-success" />
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Saídas</p>
                <ValorOculto valor={`R$ ${caixa.saidas.toFixed(2)}`} className="text-lg text-destructive" />
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Saldo Esperado</p>
                <ValorOculto valor={`R$ ${caixa.saldoEsperado.toFixed(2)}`} className="text-lg" />
              </div>
            </div>

            <Collapsible open={detalhesAberto} onOpenChange={setDetalhesAberto}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between text-muted-foreground hover:text-foreground">
                  Detalhamento por forma de pagamento
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${detalhesAberto ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="rounded-lg border bg-card p-4 flex items-start gap-3">
                    <Banknote className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Dinheiro</p>
                      <ValorOculto valor={`R$ ${recebimentosPorMetodo.dinheiro.toFixed(2)}`} className="text-sm" />
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card p-4 flex items-start gap-3">
                    <Smartphone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">PIX</p>
                      <ValorOculto valor={`R$ ${recebimentosPorMetodo.pix.toFixed(2)}`} className="text-sm" />
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card p-4 flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-accent-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Cartão</p>
                      <ValorOculto valor={`R$ ${recebimentosPorMetodo.cartao.toFixed(2)}`} className="text-sm" />
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card p-4 flex items-start gap-3">
                    <QrCode className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">QR Code</p>
                      <ValorOculto valor={`R$ ${recebimentosPorMetodo.qrcode.toFixed(2)}`} className="text-sm" />
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => { setSrTipo("sangria"); setDialogSR(true); }}>
                <ArrowDownCircle className="h-4 w-4 mr-1" /> Sangria
              </Button>
              <Button variant="outline" onClick={() => { setSrTipo("reforco"); setDialogSR(true); }}>
                <ArrowUpCircle className="h-4 w-4 mr-1" /> Reforço
              </Button>
              <Button variant="destructive" onClick={() => setDialogFechar(true)}>
                <Lock className="h-4 w-4 mr-1" /> Fechar Caixa
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Acerto de Entregadores */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold font-display text-foreground">Acerto de Entregadores</h3>
        <div className="space-y-3">
          {entregadores.map(e => (
            <EntregadorAcerto key={e.id} entregador={e} onRegistrar={onRegistrarAcerto} />
          ))}
        </div>
      </div>

      {/* Dialog Sangria/Reforço */}
      <Dialog open={dialogSR} onOpenChange={setDialogSR}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{srTipo === "sangria" ? "Sangria" : "Reforço"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Valor (R$)</label>
              <Input type="number" value={srValor} onChange={e => setSrValor(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Descrição</label>
              <Input value={srDescricao} onChange={e => setSrDescricao(e.target.value)} placeholder="Motivo" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogSR(false)}>Cancelar</Button>
            <Button onClick={() => { onSangriaReforco(srTipo, Number(srValor), srDescricao); setSrValor(""); setSrDescricao(""); setDialogSR(false); }}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Fechar Caixa */}
      <Dialog open={dialogFechar} onOpenChange={setDialogFechar}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Fechar Caixa</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Saldo esperado: R$ {caixa.saldoEsperado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
            <div>
              <label className="text-sm text-muted-foreground">Contagem em caixa (R$)</label>
              <Input type="number" value={contagem} onChange={e => setContagem(e.target.value)} />
            </div>
            {contagem && Number(contagem) !== caixa.saldoEsperado && (
              <p className="text-sm text-warning">
                Diferença: R$ {(Number(contagem) - caixa.saldoEsperado).toFixed(2)}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogFechar(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => { onFecharCaixa(Number(contagem)); setContagem(""); setDialogFechar(false); }}>
              Fechar Caixa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState, useMemo } from "react";
import { Plus, Banknote, CreditCard, Smartphone, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ValorOculto } from "./ValorOculto";
import { LancamentoDialog } from "./LancamentoDialog";
import type { Transacao, TransacaoTipo, TransacaoMetodo } from "./mockFinanceiroData";

interface AbaExtratoProps {
  transacoes: Transacao[];
  onLancar: (dados: { tipo: TransacaoTipo; valor: number; metodo: TransacaoMetodo; descricao: string }) => void;
}

const metodoLabel: Record<TransacaoMetodo, string> = {
  dinheiro: "Dinheiro",
  pix: "PIX",
  cartao: "Cartão",
  qrcode: "QR Code",
};

const MetodoIcon: Record<TransacaoMetodo, typeof Banknote> = {
  dinheiro: Banknote,
  pix: Smartphone,
  cartao: CreditCard,
  qrcode: QrCode,
};

export function AbaExtrato({ transacoes, onLancar }: AbaExtratoProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filtroMetodo, setFiltroMetodo] = useState<string>("todos");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [limite, setLimite] = useState(20);

  const saldoTotal = useMemo(() =>
    transacoes.reduce((s, t) => s + (t.tipo === "entrada" ? t.valor : -t.valor), 0),
    [transacoes]
  );

  const saldoDinheiro = useMemo(() =>
    transacoes.filter(t => t.metodo === "dinheiro").reduce((s, t) => s + (t.tipo === "entrada" ? t.valor : -t.valor), 0),
    [transacoes]
  );

  const saldoContas = useMemo(() =>
    transacoes.filter(t => t.metodo !== "dinheiro").reduce((s, t) => s + (t.tipo === "entrada" ? t.valor : -t.valor), 0),
    [transacoes]
  );

  const filtered = useMemo(() => {
    return transacoes.filter(t => {
      if (filtroMetodo !== "todos" && t.metodo !== filtroMetodo) return false;
      if (filtroTipo !== "todos" && t.tipo !== filtroTipo) return false;
      return true;
    });
  }, [transacoes, filtroMetodo, filtroTipo]);

  const displayed = filtered.slice(0, limite);

  return (
    <div className="space-y-6">
      {/* Saldos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Saldo Total</p>
          <ValorOculto valor={`R$ ${saldoTotal.toFixed(2)}`} className="text-xl" />
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Saldo Dinheiro</p>
          <ValorOculto valor={`R$ ${saldoDinheiro.toFixed(2)}`} className="text-xl" />
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Saldo Contas</p>
          <ValorOculto valor={`R$ ${saldoContas.toFixed(2)}`} className="text-xl" />
        </div>
      </div>

      {/* Filtros + Botão Lançar */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={filtroMetodo} onValueChange={setFiltroMetodo}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Método" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="dinheiro">Dinheiro</SelectItem>
            <SelectItem value="pix">PIX</SelectItem>
            <SelectItem value="cartao">Cartão</SelectItem>
            <SelectItem value="qrcode">QR Code</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filtroTipo} onValueChange={setFiltroTipo}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="entrada">Entrada</SelectItem>
            <SelectItem value="saida">Saída</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-1" />

        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> Lançar
        </Button>
      </div>

      {/* Tabela */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Método</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayed.map(t => {
              const Icon = MetodoIcon[t.metodo];
              return (
                <TableRow key={t.id}>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(t.dataHora).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                  </TableCell>
                  <TableCell className="text-sm">{t.descricao}</TableCell>
                  <TableCell>
                    <Badge className={t.tipo === "entrada"
                      ? "bg-success/20 text-success border-0"
                      : "bg-destructive/20 text-destructive border-0"
                    }>
                      {t.tipo === "entrada" ? "Entrada" : "Saída"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1.5 text-sm">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      {metodoLabel[t.metodo]}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <ValorOculto
                      valor={`${t.tipo === "saida" ? "-" : "+"} R$ ${t.valor.toFixed(2)}`}
                      className="text-sm"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {displayed.length < filtered.length && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setLimite(l => l + 20)}>
            Carregar mais ({filtered.length - displayed.length} restantes)
          </Button>
        </div>
      )}

      <LancamentoDialog open={dialogOpen} onOpenChange={setDialogOpen} onLancar={onLancar} />
    </div>
  );
}

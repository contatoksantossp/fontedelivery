import { useState, useMemo } from "react";
import { Plus, Banknote, CreditCard, Smartphone, QrCode, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
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

// Simula datas de caixas abertos/fechados para filtro
const caixasMock = [
  { id: "cx1", label: "Caixa 25/03 — Aberto", data: "2026-03-25" },
  { id: "cx2", label: "Caixa 24/03 — R$ 2.780,00", data: "2026-03-24" },
  { id: "cx3", label: "Caixa 23/03 — R$ 3.120,50", data: "2026-03-23" },
  { id: "cx4", label: "Caixa 22/03 — R$ 2.450,00", data: "2026-03-22" },
  { id: "cx5", label: "Caixa 21/03 — R$ 1.980,00", data: "2026-03-21" },
];

export function AbaExtrato({ transacoes, onLancar }: AbaExtratoProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filtroMetodo, setFiltroMetodo] = useState<string>("todos");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [filtroCaixa, setFiltroCaixa] = useState<string>("todos");
  const [dataInicio, setDataInicio] = useState<Date | undefined>(undefined);
  const [dataFim, setDataFim] = useState<Date | undefined>(undefined);
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

      // Filtro por intervalo de datas
      if (dataInicio) {
        const tDate = new Date(t.dataHora);
        const inicio = new Date(dataInicio);
        inicio.setHours(0, 0, 0, 0);
        if (tDate < inicio) return false;
      }
      if (dataFim) {
        const tDate = new Date(t.dataHora);
        const fim = new Date(dataFim);
        fim.setHours(23, 59, 59, 999);
        if (tDate > fim) return false;
      }

      // Filtro por caixa (baseado na data do caixa)
      if (filtroCaixa !== "todos") {
        const caixa = caixasMock.find(c => c.id === filtroCaixa);
        if (caixa) {
          const tDateStr = new Date(t.dataHora).toISOString().split("T")[0];
          if (tDateStr !== caixa.data) return false;
        }
      }

      return true;
    });
  }, [transacoes, filtroMetodo, filtroTipo, dataInicio, dataFim, filtroCaixa]);

  const displayed = filtered.slice(0, limite);

  const limparFiltrosDatas = () => {
    setDataInicio(undefined);
    setDataFim(undefined);
  };

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
        {/* Filtro intervalo de datas */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[160px] justify-start text-left font-normal text-sm",
                !dataInicio && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="h-4 w-4 mr-1.5" />
              {dataInicio ? format(dataInicio, "dd/MM/yyyy") : "Data início"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dataInicio}
              onSelect={setDataInicio}
              initialFocus
              locale={ptBR}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[160px] justify-start text-left font-normal text-sm",
                !dataFim && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="h-4 w-4 mr-1.5" />
              {dataFim ? format(dataFim, "dd/MM/yyyy") : "Data fim"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dataFim}
              onSelect={setDataFim}
              initialFocus
              locale={ptBR}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        {(dataInicio || dataFim) && (
          <Button variant="ghost" size="sm" onClick={limparFiltrosDatas} className="text-xs text-muted-foreground">
            Limpar datas
          </Button>
        )}

        {/* Filtro por caixa */}
        <Select value={filtroCaixa} onValueChange={setFiltroCaixa}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Caixa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os caixas</SelectItem>
            {caixasMock.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filtros existentes */}
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

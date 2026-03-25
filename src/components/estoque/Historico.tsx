import { useState, useMemo } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Movimentacao, MovimentacaoTipo } from "./mockEstoqueData";

interface HistoricoProps {
  movimentacoes: Movimentacao[];
}

const tipoBadgeMap: Record<MovimentacaoTipo, { label: string; className: string }> = {
  entrada: { label: "Entrada", className: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30" },
  saida: { label: "Saída", className: "bg-blue-500/15 text-blue-700 border-blue-500/30" },
  perda: { label: "Perda", className: "bg-red-500/15 text-red-700 border-red-500/30" },
  correcao: { label: "Correção", className: "bg-muted text-muted-foreground border-border" },
};

export function Historico({ movimentacoes }: HistoricoProps) {
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

  const filtered = useMemo(() => {
    return movimentacoes
      .filter(m => {
        if (tipoFiltro !== "todos" && m.tipo !== tipoFiltro) return false;
        const d = new Date(m.dataHora);
        if (dateFrom && d < dateFrom) return false;
        if (dateTo) {
          const endOfDay = new Date(dateTo);
          endOfDay.setHours(23, 59, 59, 999);
          if (d > endOfDay) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime());
  }, [movimentacoes, tipoFiltro, dateFrom, dateTo]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
          <SelectTrigger className="sm:w-[160px]"><SelectValue placeholder="Tipo" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Tipos</SelectItem>
            <SelectItem value="entrada">Entrada</SelectItem>
            <SelectItem value="saida">Saída</SelectItem>
            <SelectItem value="perda">Perda</SelectItem>
            <SelectItem value="correcao">Correção</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("sm:w-[160px] justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFrom ? format(dateFrom, "dd/MM/yyyy") : "Data início"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} locale={ptBR} className="p-3 pointer-events-auto" />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("sm:w-[160px] justify-start text-left font-normal", !dateTo && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateTo ? format(dateTo, "dd/MM/yyyy") : "Data fim"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={dateTo} onSelect={setDateTo} locale={ptBR} className="p-3 pointer-events-auto" />
          </PopoverContent>
        </Popover>
        {(dateFrom || dateTo || tipoFiltro !== "todos") && (
          <Button variant="ghost" size="sm" onClick={() => { setTipoFiltro("todos"); setDateFrom(undefined); setDateTo(undefined); }}>Limpar filtros</Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Variante</TableHead>
              <TableHead className="text-center">Tipo</TableHead>
              <TableHead className="text-center">Quantidade</TableHead>
              <TableHead className="text-center">Saldo Final</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(m => {
              const badge = tipoBadgeMap[m.tipo];
              return (
                <TableRow key={m.id}>
                  <TableCell className="text-muted-foreground text-sm">{format(new Date(m.dataHora), "dd/MM/yyyy HH:mm")}</TableCell>
                  <TableCell className="font-medium">{m.produtoNome}</TableCell>
                  <TableCell>{m.varianteNome}</TableCell>
                  <TableCell className="text-center"><Badge variant="outline" className={badge.className}>{badge.label}</Badge></TableCell>
                  <TableCell className={cn("text-center font-semibold", m.quantidade > 0 ? "text-emerald-600" : "text-red-600")}>
                    {m.quantidade > 0 ? `+${m.quantidade}` : m.quantidade}
                  </TableCell>
                  <TableCell className="text-center">{m.saldoFinal}</TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Nenhuma movimentação encontrada</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

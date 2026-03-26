import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, CheckCircle2 } from "lucide-react";
import { format, isPast, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ContaDialog, type ContaPagar, type CategoriaContas } from "./ContaDialog";

const categoriasLabel: Record<CategoriaContas, string> = {
  aluguel: "Aluguel",
  luz: "Energia / Luz",
  fornecedor: "Fornecedor",
  outro: "Outro",
};

const contasMock: ContaPagar[] = [
  { id: "c1", descricao: "Aluguel do ponto", valor: 2500, dataVencimento: "2026-03-10T00:00:00", categoria: "aluguel", paga: false },
  { id: "c2", descricao: "Conta de Luz", valor: 380, dataVencimento: "2026-03-15T00:00:00", categoria: "luz", paga: false },
  { id: "c3", descricao: "Fornecedor Bebidas", valor: 4200, dataVencimento: "2026-03-20T00:00:00", categoria: "fornecedor", paga: false },
  { id: "c4", descricao: "Internet", valor: 150, dataVencimento: "2026-03-05T00:00:00", categoria: "outro", paga: true, dataPagamento: "2026-03-04T10:00:00" },
];

type FiltroStatus = "todas" | "pendentes" | "pagas" | "vencidas";

interface AbaContasProps {
  contas: ContaPagar[];
  onAdicionarConta: (conta: Omit<ContaPagar, "id" | "paga" | "dataPagamento">) => void;
  onDarBaixa: (id: string) => void;
}

function getStatus(conta: ContaPagar): "paga" | "vencida" | "pendente" {
  if (conta.paga) return "paga";
  if (isPast(startOfDay(new Date(conta.dataVencimento)))) return "vencida";
  return "pendente";
}

export { contasMock };

export function AbaContas({ contas, onAdicionarConta, onDarBaixa }: AbaContasProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filtro, setFiltro] = useState<FiltroStatus>("todas");

  const filtered = useMemo(() => {
    if (filtro === "todas") return contas;
    return contas.filter(c => getStatus(c) === (filtro === "pendentes" ? "pendente" : filtro === "pagas" ? "paga" : "vencida"));
  }, [contas, filtro]);

  const totalPendente = useMemo(() => contas.filter(c => !c.paga).reduce((s, c) => s + c.valor, 0), [contas]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Select value={filtro} onValueChange={v => setFiltro(v as FiltroStatus)}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="pendentes">Pendentes</SelectItem>
              <SelectItem value="pagas">Pagas</SelectItem>
              <SelectItem value="vencidas">Vencidas</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            Total pendente: <strong className="text-foreground">R$ {totalPendente.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
          </span>
        </div>
        <Button onClick={() => setDialogOpen(true)} size="sm">
          <Plus className="mr-1 h-4 w-4" /> Nova Conta
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Nenhuma conta encontrada</TableCell></TableRow>
            )}
            {filtered.map(conta => {
              const status = getStatus(conta);
              return (
                <TableRow key={conta.id}>
                  <TableCell className="font-medium">{conta.descricao}</TableCell>
                  <TableCell>{categoriasLabel[conta.categoria]}</TableCell>
                  <TableCell>{format(new Date(conta.dataVencimento), "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                  <TableCell className="text-right">R$ {conta.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell>
                    {status === "paga" && <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-500/30">Paga</Badge>}
                    {status === "pendente" && <Badge className="bg-amber-500/15 text-amber-600 border-amber-500/30">Pendente</Badge>}
                    {status === "vencida" && <Badge className="bg-destructive/15 text-destructive border-destructive/30">Vencida</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    {!conta.paga && (
                      <Button variant="ghost" size="sm" onClick={() => onDarBaixa(conta.id)} className="text-emerald-600 hover:text-emerald-700">
                        <CheckCircle2 className="mr-1 h-4 w-4" /> Dar baixa
                      </Button>
                    )}
                    {conta.paga && conta.dataPagamento && (
                      <span className="text-xs text-muted-foreground">Paga em {format(new Date(conta.dataPagamento), "dd/MM", { locale: ptBR })}</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <ContaDialog open={dialogOpen} onOpenChange={setDialogOpen} onSalvar={onAdicionarConta} />
    </div>
  );
}

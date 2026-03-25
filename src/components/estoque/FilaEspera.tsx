import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { FilaEsperaItem } from "./mockEstoqueData";

interface FilaEsperaProps {
  items: FilaEsperaItem[];
}

export function FilaEspera({ items }: FilaEsperaProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
        <Clock className="h-10 w-10" />
        <p className="text-lg font-medium">Nenhum cliente na fila de espera</p>
        <p className="text-sm">Quando itens esgotados forem solicitados, aparecerão aqui.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Variante Desejada</TableHead>
            <TableHead>Data Solicitação</TableHead>
            <TableHead>Contato</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.clienteNome}</TableCell>
              <TableCell>{item.varianteNome}</TableCell>
              <TableCell className="text-muted-foreground">{format(new Date(item.dataSolicitacao), "dd/MM/yyyy HH:mm")}</TableCell>
              <TableCell className="text-muted-foreground">{item.contato}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

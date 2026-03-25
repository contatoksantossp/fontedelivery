import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, UserMinus } from "lucide-react";
import { Cliente, Colaborador } from "./mockParceirosData";
import { ColaboradorDialog } from "./ColaboradorDialog";

interface AbaColaboradoresProps {
  colaboradores: Colaborador[];
  clientes: Cliente[];
  onEdit: (id: string, cargo: string, dataInicio: string) => void;
  onDemitir: (id: string) => void;
}

export function AbaColaboradores({ colaboradores, clientes, onEdit, onDemitir }: AbaColaboradoresProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editColab, setEditColab] = useState<Colaborador | null>(null);

  const getNome = (clienteId: string) => clientes.find((c) => c.id === clienteId)?.nome || "—";

  const ativos = colaboradores.filter((c) => c.ativo);

  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Início</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ativos.map((co) => (
              <TableRow key={co.id}>
                <TableCell className="font-medium">{getNome(co.clienteId)}</TableCell>
                <TableCell>{co.cargo}</TableCell>
                <TableCell>{new Date(co.dataInicio).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell>
                  <Badge variant="default" className="bg-emerald-600 text-white">Ativo</Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditColab(co); setDialogOpen(true); }}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { if (confirm(`Demitir ${getNome(co.clienteId)}?`)) onDemitir(co.id); }}>
                    <UserMinus className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {ativos.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  Nenhum colaborador ativo
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ColaboradorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        colaborador={editColab}
        onSave={onEdit}
      />
    </div>
  );
}

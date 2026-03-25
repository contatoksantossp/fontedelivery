import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Pencil, UserPlus } from "lucide-react";
import { Cliente } from "./mockParceirosData";
import { ClienteDialog } from "./ClienteDialog";
import { PromoverDialog } from "./PromoverDialog";

interface AbaClientesProps {
  clientes: Cliente[];
  onAddCliente: (data: Omit<Cliente, "id" | "dataCadastro">) => void;
  onEditCliente: (id: string, data: Omit<Cliente, "id" | "dataCadastro">) => void;
  onPromover: (clienteId: string, tipo: "colaborador" | "entregador", dados: { cargo?: string; veiculo?: string }) => void;
}

export function AbaClientes({ clientes, onAddCliente, onEditCliente, onPromover }: AbaClientesProps) {
  const [busca, setBusca] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCliente, setEditCliente] = useState<Cliente | undefined>();
  const [promoverOpen, setPromoverOpen] = useState(false);
  const [promoverCliente, setPromoverCliente] = useState<Cliente | null>(null);

  const filtrados = clientes.filter((c) => {
    const term = busca.toLowerCase();
    return (
      c.nome.toLowerCase().includes(term) ||
      (c.apelido?.toLowerCase().includes(term)) ||
      c.telefone.includes(term)
    );
  });

  const endPrincipal = (c: Cliente) => {
    const p = c.enderecos.find((e) => e.principal);
    return p ? `${p.rua}, ${p.numero} — ${p.bairro}` : "—";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Buscar por nome, apelido ou telefone…" value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>
        <Button onClick={() => { setEditCliente(undefined); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Novo Cliente
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome / Apelido</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Endereço Principal</TableHead>
              <TableHead className="text-center">End. Salvos</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtrados.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <span className="font-medium">{c.nome}</span>
                  {c.apelido && <span className="text-muted-foreground ml-1">({c.apelido})</span>}
                </TableCell>
                <TableCell>{c.telefone}</TableCell>
                <TableCell className="text-sm">{endPrincipal(c)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">{c.enderecos.length}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditCliente(c); setDialogOpen(true); }}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setPromoverCliente(c); setPromoverOpen(true); }}>
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtrados.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  Nenhum cliente encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ClienteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        cliente={editCliente}
        onSave={(data) => {
          if (editCliente) onEditCliente(editCliente.id, data);
          else onAddCliente(data);
        }}
      />

      <PromoverDialog
        open={promoverOpen}
        onOpenChange={setPromoverOpen}
        cliente={promoverCliente}
        onPromover={(tipo, dados) => {
          if (promoverCliente) onPromover(promoverCliente.id, tipo, dados);
        }}
      />
    </div>
  );
}

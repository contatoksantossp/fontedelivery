import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { EnderecoCacheDialog } from "./EnderecoCacheDialog";
import type { EnderecoCache } from "@/components/pdv/mockPdvData";

interface Props {
  enderecos: EnderecoCache[];
  setEnderecos: React.Dispatch<React.SetStateAction<EnderecoCache[]>>;
}

export function AbaEnderecosCache({ enderecos, setEnderecos }: Props) {
  const [busca, setBusca] = useState("");
  const [editando, setEditando] = useState<EnderecoCache | null>(null);

  const filtrados = enderecos.filter((e) => {
    const termo = busca.toLowerCase();
    return (
      e.rua.toLowerCase().includes(termo) ||
      e.bairro.toLowerCase().includes(termo) ||
      e.cep.toLowerCase().includes(termo)
    );
  });

  const handleSave = (updated: EnderecoCache) => {
    setEnderecos((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    toast.success("Endereço atualizado");
  };

  const handleDelete = (id: string) => {
    setEnderecos((prev) => prev.filter((e) => e.id !== id));
    toast.success("Endereço removido");
  };

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por rua, bairro ou CEP..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rua</TableHead>
              <TableHead>Número</TableHead>
              <TableHead>Bairro</TableHead>
              <TableHead>CEP</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  Nenhum endereço encontrado
                </TableCell>
              </TableRow>
            ) : (
              filtrados.map((end) => (
                <TableRow key={end.id}>
                  <TableCell>{end.rua}</TableCell>
                  <TableCell>{end.numero ?? "—"}</TableCell>
                  <TableCell>{end.bairro}</TableCell>
                  <TableCell>{end.cep}</TableCell>
                  <TableCell>{end.cidade}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => setEditando(end)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(end.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editando && (
        <EnderecoCacheDialog
          open={!!editando}
          onOpenChange={(open) => !open && setEditando(null)}
          endereco={editando}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

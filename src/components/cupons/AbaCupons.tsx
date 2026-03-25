import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";
import { CupomDialog } from "./CupomDialog";
import type { Cupom } from "./mockCuponsData";

interface AbaCuponsProps {
  cupons: Cupom[];
  setCupons: React.Dispatch<React.SetStateAction<Cupom[]>>;
}

export function AbaCupons({ cupons, setCupons }: AbaCuponsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editando, setEditando] = useState<Cupom | null>(null);

  const toggleAtivo = (id: string) => {
    setCupons(prev => prev.map(c => c.id === id ? { ...c, ativo: !c.ativo } : c));
  };

  const handleSalvar = (dados: Omit<Cupom, "id" | "totalUsos">) => {
    if (editando) {
      setCupons(prev => prev.map(c => c.id === editando.id ? { ...c, ...dados } : c));
    } else {
      setCupons(prev => [...prev, { ...dados, id: `c-${Date.now()}`, totalUsos: 0 }]);
    }
    setEditando(null);
  };

  const abrirEdicao = (cupom: Cupom) => {
    setEditando(cupom);
    setDialogOpen(true);
  };

  const abrirNovo = () => {
    setEditando(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={abrirNovo}>
          <Plus className="h-4 w-4 mr-1" /> Novo Cupom
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Pedido Mín.</TableHead>
              <TableHead>Usos</TableHead>
              <TableHead>Expiração</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {cupons.map(c => (
              <TableRow key={c.id}>
                <TableCell className="font-mono font-bold">{c.codigo}</TableCell>
                <TableCell>
                  <Badge variant={c.tipo === "percentual" ? "default" : "secondary"}>
                    {c.tipo === "percentual" ? "%" : "R$"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {c.tipo === "percentual" ? `${c.valor}%` : `R$ ${c.valor.toFixed(2)}`}
                </TableCell>
                <TableCell>
                  {c.pedidoMinimo > 0 ? `R$ ${c.pedidoMinimo.toFixed(2)}` : "—"}
                </TableCell>
                <TableCell>{c.totalUsos}</TableCell>
                <TableCell>{new Date(c.expiracao).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell>
                  <Switch checked={c.ativo} onCheckedChange={() => toggleAtivo(c.id)} />
                </TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" onClick={() => abrirEdicao(c)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CupomDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        cupom={editando}
        onSalvar={handleSalvar}
      />
    </div>
  );
}

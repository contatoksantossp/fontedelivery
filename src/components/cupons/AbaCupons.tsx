import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";
import { CupomDialog } from "./CupomDialog";
import { useCupons, useUpsertCupom, useToggleCupom, type Cupom } from "@/hooks/data/useCupons";

export function AbaCupons() {
  const { data: cupons = [] } = useCupons();
  const upsert = useUpsertCupom();
  const toggle = useToggleCupom();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editando, setEditando] = useState<Cupom | null>(null);

  const handleSalvar = (dados: Omit<Cupom, "id" | "totalUsos">) => {
    if (editando) {
      upsert.mutate({ ...editando, ...dados });
    } else {
      upsert.mutate({ ...dados, totalUsos: 0 });
    }
    setEditando(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => { setEditando(null); setDialogOpen(true); }}>
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
            {cupons.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-mono font-bold">{c.codigo}</TableCell>
                <TableCell>
                  <Badge variant={c.tipo === "percentual" ? "default" : "secondary"}>
                    {c.tipo === "percentual" ? "%" : "R$"}
                  </Badge>
                </TableCell>
                <TableCell>{c.tipo === "percentual" ? `${c.valor}%` : `R$ ${c.valor.toFixed(2)}`}</TableCell>
                <TableCell>{c.pedidoMinimo > 0 ? `R$ ${c.pedidoMinimo.toFixed(2)}` : "—"}</TableCell>
                <TableCell>{c.totalUsos}</TableCell>
                <TableCell>{c.expiracao ? new Date(c.expiracao).toLocaleDateString("pt-BR") : "—"}</TableCell>
                <TableCell>
                  <Switch checked={c.ativo} onCheckedChange={(v) => toggle.mutate({ id: c.id, ativo: v })} />
                </TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" onClick={() => { setEditando(c); setDialogOpen(true); }}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CupomDialog open={dialogOpen} onOpenChange={setDialogOpen} cupom={editando} onSalvar={handleSalvar} />
    </div>
  );
}

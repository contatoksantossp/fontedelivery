import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useFaixas, useUpsertFaixa, useDeleteFaixa, type FaixaKm } from "@/hooks/data/useConfiguracoes";

function TabelaFaixas({
  titulo,
  descricao,
  labelPreco,
  tipo,
}: {
  titulo: string;
  descricao: string;
  labelPreco: string;
  tipo: "cliente" | "entregador";
}) {
  const { data: faixas = [] } = useFaixas(tipo);
  const upsert = useUpsertFaixa();
  const del = useDeleteFaixa();

  const addFaixa = () => {
    const last = faixas[faixas.length - 1];
    const kmInicial = last ? last.kmFinal : 0;
    upsert.mutate({
      id: `f-${tipo}-${Date.now()}`,
      tipo,
      kmInicial,
      kmFinal: kmInicial + 5,
      preco: 0,
    });
  };

  const removeFaixa = (id: string) => {
    del.mutate({ id, tipo });
    toast.success("Faixa removida");
  };

  const updateFaixa = (f: FaixaKm, field: "kmInicial" | "kmFinal" | "preco", value: number) => {
    upsert.mutate({ ...f, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{titulo}</CardTitle>
        <CardDescription>{descricao}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>KM Inicial</TableHead>
              <TableHead>KM Final</TableHead>
              <TableHead>{labelPreco}</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {faixas.map((f) => (
              <TableRow key={f.id}>
                <TableCell>
                  <Input
                    type="number"
                    defaultValue={f.kmInicial}
                    onBlur={(e) => updateFaixa(f, "kmInicial", Number(e.target.value))}
                    className="w-20"
                    min={0}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    defaultValue={f.kmFinal}
                    onBlur={(e) => updateFaixa(f, "kmFinal", Number(e.target.value))}
                    className="w-20"
                    min={0}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">R$</span>
                    <Input
                      type="number"
                      defaultValue={f.preco}
                      onBlur={(e) => updateFaixa(f, "preco", Number(e.target.value))}
                      className="w-24"
                      min={0}
                      step={0.5}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => removeFaixa(f.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {faixas.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                  Nenhuma faixa cadastrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Button variant="outline" size="sm" onClick={addFaixa}>
          <Plus className="h-4 w-4 mr-1" /> Adicionar Faixa
        </Button>
      </CardContent>
    </Card>
  );
}

export function AbaConfiguracaoEntrega() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TabelaFaixas
        titulo="Taxas do Cliente"
        descricao="Valor cobrado do cliente pela entrega conforme a distância"
        labelPreco="Preço (R$)"
        tipo="cliente"
      />
      <TabelaFaixas
        titulo="Repasse do Entregador"
        descricao="Valor repassado ao entregador por cada entrega realizada"
        labelPreco="Repasse (R$)"
        tipo="entregador"
      />
    </div>
  );
}

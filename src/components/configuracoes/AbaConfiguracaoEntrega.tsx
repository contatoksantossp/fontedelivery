import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaixaKm } from "./mockConfigData";
import { toast } from "sonner";

interface Props {
  faixasCliente: FaixaKm[];
  setFaixasCliente: React.Dispatch<React.SetStateAction<FaixaKm[]>>;
  faixasEntregador: FaixaKm[];
  setFaixasEntregador: React.Dispatch<React.SetStateAction<FaixaKm[]>>;
}

function TabelaFaixas({
  titulo,
  descricao,
  labelPreco,
  faixas,
  setFaixas,
}: {
  titulo: string;
  descricao: string;
  labelPreco: string;
  faixas: FaixaKm[];
  setFaixas: React.Dispatch<React.SetStateAction<FaixaKm[]>>;
}) {
  const addFaixa = () => {
    const last = faixas[faixas.length - 1];
    const kmInicial = last ? last.kmFinal : 0;
    setFaixas(prev => [
      ...prev,
      { id: `f${Date.now()}`, kmInicial, kmFinal: kmInicial + 5, preco: 0 },
    ]);
  };

  const removeFaixa = (id: string) => {
    setFaixas(prev => prev.filter(f => f.id !== id));
    toast.success("Faixa removida");
  };

  const updateFaixa = (id: string, field: keyof Omit<FaixaKm, "id">, value: number) => {
    setFaixas(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
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
            {faixas.map(f => (
              <TableRow key={f.id}>
                <TableCell>
                  <Input
                    type="number"
                    value={f.kmInicial}
                    onChange={e => updateFaixa(f.id, "kmInicial", Number(e.target.value))}
                    className="w-20"
                    min={0}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={f.kmFinal}
                    onChange={e => updateFaixa(f.id, "kmFinal", Number(e.target.value))}
                    className="w-20"
                    min={0}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">R$</span>
                    <Input
                      type="number"
                      value={f.preco}
                      onChange={e => updateFaixa(f.id, "preco", Number(e.target.value))}
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

export function AbaConfiguracaoEntrega({ faixasCliente, setFaixasCliente, faixasEntregador, setFaixasEntregador }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TabelaFaixas
        titulo="Taxas do Cliente"
        descricao="Valor cobrado do cliente pela entrega conforme a distância"
        labelPreco="Preço (R$)"
        faixas={faixasCliente}
        setFaixas={setFaixasCliente}
      />
      <TabelaFaixas
        titulo="Repasse do Entregador"
        descricao="Valor repassado ao entregador por cada entrega realizada"
        labelPreco="Repasse (R$)"
        faixas={faixasEntregador}
        setFaixas={setFaixasEntregador}
      />
    </div>
  );
}

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

export type CategoriaContas = "aluguel" | "luz" | "fornecedor" | "outro";

export interface ContaPagar {
  id: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  categoria: CategoriaContas;
  paga: boolean;
  dataPagamento?: string;
}

interface ContaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSalvar: (conta: Omit<ContaPagar, "id" | "paga" | "dataPagamento">) => void;
}

const categoriasLabel: Record<CategoriaContas, string> = {
  aluguel: "Aluguel",
  luz: "Energia / Luz",
  fornecedor: "Fornecedor",
  outro: "Outro",
};

export function ContaDialog({ open, onOpenChange, onSalvar }: ContaDialogProps) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState<CategoriaContas>("outro");
  const [dataVencimento, setDataVencimento] = useState<Date>();

  const reset = () => {
    setDescricao("");
    setValor("");
    setCategoria("outro");
    setDataVencimento(undefined);
  };

  const handleSalvar = () => {
    if (!descricao || !valor || !dataVencimento) return;
    onSalvar({
      descricao,
      valor: parseFloat(valor),
      dataVencimento: dataVencimento.toISOString(),
      categoria,
    });
    reset();
    onOpenChange(false);
  };

  const valid = descricao.trim() !== "" && parseFloat(valor) > 0 && !!dataVencimento;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Conta a Pagar</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Descrição *</Label>
            <Input value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Ex: Aluguel do ponto" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Valor (R$) *</Label>
              <Input type="number" min={0} step={0.01} value={valor} onChange={e => setValor(e.target.value)} placeholder="0,00" />
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={categoria} onValueChange={v => setCategoria(v as CategoriaContas)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(categoriasLabel).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Vencimento *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dataVencimento && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataVencimento ? format(dataVencimento, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={dataVencimento} onSelect={setDataVencimento} locale={ptBR} className="p-3 pointer-events-auto" />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSalvar} disabled={!valid}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

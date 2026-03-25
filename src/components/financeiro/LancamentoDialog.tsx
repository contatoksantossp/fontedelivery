import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TransacaoTipo, TransacaoMetodo } from "./mockFinanceiroData";

interface LancamentoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLancar: (dados: { tipo: TransacaoTipo; valor: number; metodo: TransacaoMetodo; descricao: string }) => void;
}

export function LancamentoDialog({ open, onOpenChange, onLancar }: LancamentoDialogProps) {
  const [tipo, setTipo] = useState<TransacaoTipo>("entrada");
  const [valor, setValor] = useState("");
  const [metodo, setMetodo] = useState<TransacaoMetodo>("dinheiro");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = () => {
    if (!valor || !descricao) return;
    onLancar({ tipo, valor: Number(valor), metodo, descricao });
    setValor("");
    setDescricao("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Lançamento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={tipo === "entrada" ? "default" : "outline"}
              onClick={() => setTipo("entrada")}
              className="flex-1"
            >
              Entrada
            </Button>
            <Button
              variant={tipo === "saida" ? "default" : "outline"}
              onClick={() => setTipo("saida")}
              className="flex-1"
            >
              Saída
            </Button>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Valor (R$)</label>
            <Input type="number" value={valor} onChange={e => setValor(e.target.value)} placeholder="0,00" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Método</label>
            <Select value={metodo} onValueChange={v => setMetodo(v as TransacaoMetodo)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="cartao">Cartão</SelectItem>
                <SelectItem value="qrcode">QR Code</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Descrição</label>
            <Input value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Ex: Conta de luz" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={!valor || !descricao}>Lançar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

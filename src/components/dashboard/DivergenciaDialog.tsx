import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, ArrowUp } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (descricao: string) => void;
  productName: string;
  estoqueAnterior: number;
  contagemAtual: number;
}

export function DivergenciaDialog({ open, onClose, onConfirm, productName, estoqueAnterior, contagemAtual }: Props) {
  const [descricao, setDescricao] = useState("");
  const diferenca = contagemAtual - estoqueAnterior;
  const isPerda = diferenca < 0;

  const handleConfirm = () => {
    onConfirm(descricao);
    setDescricao("");
  };

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Divergência de Estoque</DialogTitle>
          <DialogDescription>
            Foi detectada uma diferença na contagem de <strong>{productName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border bg-muted/50 p-3 text-center">
              <p className="text-xs text-muted-foreground">Estoque Anterior</p>
              <p className="text-xl font-bold font-display text-foreground mt-1">{estoqueAnterior}</p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-3 text-center">
              <p className="text-xs text-muted-foreground">Contagem Atual</p>
              <p className="text-xl font-bold font-display text-primary mt-1">{contagemAtual}</p>
            </div>
            <div className={`rounded-lg border p-3 text-center ${isPerda ? "bg-destructive/10 border-destructive/30" : "bg-green-500/10 border-green-500/30"}`}>
              <p className="text-xs text-muted-foreground">Diferença</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                {isPerda ? <ArrowDown className="h-4 w-4 text-destructive" /> : <ArrowUp className="h-4 w-4 text-green-600" />}
                <p className={`text-xl font-bold font-display ${isPerda ? "text-destructive" : "text-green-600"}`}>
                  {diferenca > 0 ? `+${diferenca}` : diferenca}
                </p>
              </div>
            </div>
          </div>

          <Badge variant={isPerda ? "destructive" : "default"} className="text-xs">
            {isPerda ? "Perda de estoque" : "Adição de estoque"}
          </Badge>

          <div className="space-y-2">
            <Label>Descrição / Justificativa</Label>
            <Textarea
              placeholder="Ex: Produto vencido descartado, erro na contagem anterior..."
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleConfirm}>Finalizar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

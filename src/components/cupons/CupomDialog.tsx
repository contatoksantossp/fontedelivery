import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Cupom } from "./mockCuponsData";

interface CupomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cupom?: Cupom | null;
  onSalvar: (cupom: Omit<Cupom, "id" | "totalUsos">) => void;
}

export function CupomDialog({ open, onOpenChange, cupom, onSalvar }: CupomDialogProps) {
  const [codigo, setCodigo] = useState("");
  const [tipo, setTipo] = useState<"percentual" | "fixo">("percentual");
  const [valor, setValor] = useState("");
  const [pedidoMinimo, setPedidoMinimo] = useState("");
  const [expiracao, setExpiracao] = useState("");

  useEffect(() => {
    if (cupom) {
      setCodigo(cupom.codigo);
      setTipo(cupom.tipo);
      setValor(String(cupom.valor));
      setPedidoMinimo(String(cupom.pedidoMinimo));
      setExpiracao(cupom.expiracao);
    } else {
      setCodigo("");
      setTipo("percentual");
      setValor("");
      setPedidoMinimo("");
      setExpiracao("");
    }
  }, [cupom, open]);

  const handleSalvar = () => {
    onSalvar({
      codigo: codigo.toUpperCase(),
      tipo,
      valor: Number(valor),
      pedidoMinimo: Number(pedidoMinimo) || 0,
      expiracao,
      ativo: cupom?.ativo ?? true,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{cupom ? "Editar Cupom" : "Novo Cupom"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Código</Label>
            <Input
              value={codigo}
              onChange={e => setCodigo(e.target.value.toUpperCase())}
              placeholder="EX: DESCONTO20"
              className="uppercase"
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo de Desconto</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={tipo === "percentual" ? "default" : "outline"}
                onClick={() => setTipo("percentual")}
              >
                % Percentual
              </Button>
              <Button
                type="button"
                size="sm"
                variant={tipo === "fixo" ? "default" : "outline"}
                onClick={() => setTipo("fixo")}
              >
                R$ Fixo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Valor {tipo === "percentual" ? "(%)" : "(R$)"}</Label>
              <Input
                type="number"
                value={valor}
                onChange={e => setValor(e.target.value)}
                placeholder={tipo === "percentual" ? "10" : "5.00"}
              />
            </div>
            <div className="space-y-2">
              <Label>Pedido Mínimo (R$)</Label>
              <Input
                type="number"
                value={pedidoMinimo}
                onChange={e => setPedidoMinimo(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Data de Validade</Label>
            <Input
              type="date"
              value={expiracao}
              onChange={e => setExpiracao(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSalvar} disabled={!codigo || !valor}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

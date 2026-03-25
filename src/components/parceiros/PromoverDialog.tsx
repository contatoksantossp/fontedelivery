import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Cliente } from "./mockParceirosData";

interface PromoverDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cliente: Cliente | null;
  onPromover: (tipo: "colaborador" | "entregador", dados: { cargo?: string; veiculo?: string }) => void;
}

export function PromoverDialog({ open, onOpenChange, cliente, onPromover }: PromoverDialogProps) {
  const [tipo, setTipo] = useState<"colaborador" | "entregador">("colaborador");
  const [cargo, setCargo] = useState("");
  const [veiculo, setVeiculo] = useState("");

  const handleConfirm = () => {
    if (tipo === "colaborador" && !cargo.trim()) return;
    if (tipo === "entregador" && !veiculo.trim()) return;
    onPromover(tipo, { cargo: cargo.trim(), veiculo: veiculo.trim() });
    onOpenChange(false);
    setCargo("");
    setVeiculo("");
  };

  if (!cliente) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Promover {cliente.nome}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <RadioGroup value={tipo} onValueChange={(v) => setTipo(v as "colaborador" | "entregador")}>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="colaborador" id="prom-colab" />
              <Label htmlFor="prom-colab">Colaborador</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="entregador" id="prom-entreg" />
              <Label htmlFor="prom-entreg">Entregador</Label>
            </div>
          </RadioGroup>

          {tipo === "colaborador" && (
            <div>
              <Label>Cargo</Label>
              <Input value={cargo} onChange={(e) => setCargo(e.target.value)} placeholder="Ex: Atendente, Caixa…" />
            </div>
          )}
          {tipo === "entregador" && (
            <div>
              <Label>Veículo</Label>
              <Input value={veiculo} onChange={(e) => setVeiculo(e.target.value)} placeholder="Ex: Moto, Bicicleta, Carro…" />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

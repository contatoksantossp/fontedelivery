import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Entregador } from "./mockParceirosData";
import { Check } from "lucide-react";

const CORES = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
const VEICULOS = ["Moto", "Bicicleta", "Carro"];

interface EntregadorEditDialogProps {
  entregador: Entregador | null;
  clienteNome: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, dados: { veiculo: string; cor: string; clienteNome: string }) => void;
}

export function EntregadorEditDialog({ entregador, clienteNome, open, onOpenChange, onSave }: EntregadorEditDialogProps) {
  const [nome, setNome] = useState("");
  const [veiculo, setVeiculo] = useState("");
  const [cor, setCor] = useState("");

  useEffect(() => {
    if (entregador) {
      setNome(clienteNome);
      setVeiculo(entregador.veiculo);
      setCor(entregador.cor);
    }
  }, [entregador, clienteNome]);

  const handleSave = () => {
    if (!entregador) return;
    onSave(entregador.id, { veiculo, cor, clienteNome: nome });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Entregador</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Veículo</Label>
            <Select value={veiculo} onValueChange={setVeiculo}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {VEICULOS.map((v) => (
                  <SelectItem key={v} value={v}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Cor</Label>
            <div className="flex gap-3 items-center">
              {CORES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110"
                  style={{ backgroundColor: c, borderColor: cor === c ? "white" : "transparent" }}
                  onClick={() => setCor(c)}
                >
                  {cor === c && <Check className="h-4 w-4 text-white" />}
                </button>
              ))}
              <label
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer overflow-hidden"
                style={{ borderColor: !CORES.includes(cor) ? "white" : "transparent" }}
              >
                <input
                  type="color"
                  value={cor || "#000000"}
                  onChange={(e) => setCor(e.target.value)}
                  className="absolute w-10 h-10 cursor-pointer opacity-0"
                />
                <span className="w-full h-full rounded-full" style={{ background: !CORES.includes(cor) ? cor : "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)" }} />
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!nome.trim()}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

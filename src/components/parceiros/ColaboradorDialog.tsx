import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Colaborador } from "./mockParceirosData";

interface ColaboradorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  colaborador: Colaborador | null;
  onSave: (id: string, cargo: string, dataInicio: string) => void;
}

export function ColaboradorDialog({ open, onOpenChange, colaborador, onSave }: ColaboradorDialogProps) {
  const [cargo, setCargo] = useState("");
  const [dataInicio, setDataInicio] = useState("");

  useEffect(() => {
    if (colaborador) {
      setCargo(colaborador.cargo);
      setDataInicio(colaborador.dataInicio);
    }
  }, [colaborador, open]);

  const handleSave = () => {
    if (!colaborador || !cargo.trim()) return;
    onSave(colaborador.id, cargo.trim(), dataInicio);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Editar Colaborador</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Cargo</Label>
            <Input value={cargo} onChange={(e) => setCargo(e.target.value)} />
          </div>
          <div>
            <Label>Data de Início</Label>
            <Input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

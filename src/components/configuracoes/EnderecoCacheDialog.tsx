import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { EnderecoCache } from "@/components/pdv/mockPdvData";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  endereco: EnderecoCache;
  onSave: (endereco: EnderecoCache) => void;
}

export function EnderecoCacheDialog({ open, onOpenChange, endereco, onSave }: Props) {
  const [form, setForm] = useState<EnderecoCache>(endereco);

  useEffect(() => {
    setForm(endereco);
  }, [endereco]);

  const handleSave = () => {
    onSave(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Endereço</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div>
            <Label>Rua</Label>
            <Input value={form.rua} onChange={(e) => setForm({ ...form, rua: e.target.value })} />
          </div>
          <div>
            <Label>Número</Label>
            <Input value={form.numero ?? ""} onChange={(e) => setForm({ ...form, numero: e.target.value })} />
          </div>
          <div>
            <Label>Bairro</Label>
            <Input value={form.bairro} onChange={(e) => setForm({ ...form, bairro: e.target.value })} />
          </div>
          <div>
            <Label>CEP</Label>
            <Input value={form.cep} onChange={(e) => setForm({ ...form, cep: e.target.value })} />
          </div>
          <div>
            <Label>Cidade</Label>
            <Input value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} />
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

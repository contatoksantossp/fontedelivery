import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Trash2 } from "lucide-react";
import { Cliente, Endereco } from "./mockParceirosData";

interface ClienteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cliente?: Cliente;
  onSave: (cliente: Omit<Cliente, "id" | "dataCadastro">) => void;
}

const enderecoVazio: Endereco = { rua: "", numero: "", bairro: "", complemento: "", principal: false };

export function ClienteDialog({ open, onOpenChange, cliente, onSave }: ClienteDialogProps) {
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [telefone, setTelefone] = useState("");
  const [enderecos, setEnderecos] = useState<Endereco[]>([{ ...enderecoVazio, principal: true }]);

  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome);
      setApelido(cliente.apelido || "");
      setTelefone(cliente.telefone);
      setEnderecos(cliente.enderecos.length > 0 ? cliente.enderecos : [{ ...enderecoVazio, principal: true }]);
    } else {
      setNome("");
      setApelido("");
      setTelefone("");
      setEnderecos([{ ...enderecoVazio, principal: true }]);
    }
  }, [cliente, open]);

  const updateEndereco = (index: number, field: keyof Endereco, value: string | boolean) => {
    setEnderecos((prev) =>
      prev.map((e, i) => (i === index ? { ...e, [field]: value } : e))
    );
  };

  const setPrincipal = (index: number) => {
    setEnderecos((prev) => prev.map((e, i) => ({ ...e, principal: i === index })));
  };

  const addEndereco = () => setEnderecos((prev) => [...prev, { ...enderecoVazio }]);

  const removeEndereco = (index: number) => {
    setEnderecos((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (next.length > 0 && !next.some((e) => e.principal)) next[0].principal = true;
      return next;
    });
  };

  const handleSave = () => {
    if (!nome.trim() || !telefone.trim()) return;
    onSave({ nome: nome.trim(), apelido: apelido.trim() || undefined, telefone: telefone.trim(), enderecos });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{cliente ? "Editar Cliente" : "Novo Cliente"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Nome</Label>
              <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome completo" />
            </div>
            <div>
              <Label>Apelido</Label>
              <Input value={apelido} onChange={(e) => setApelido(e.target.value)} placeholder="Opcional" />
            </div>
          </div>
          <div>
            <Label>Telefone</Label>
            <Input value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(11) 99999-9999" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Endereços</Label>
              <Button variant="outline" size="sm" onClick={addEndereco}>
                <Plus className="h-3 w-3 mr-1" /> Adicionar
              </Button>
            </div>
            <RadioGroup
              value={String(enderecos.findIndex((e) => e.principal))}
              onValueChange={(v) => setPrincipal(Number(v))}
            >
              {enderecos.map((end, i) => (
                <div key={i} className="border rounded-md p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value={String(i)} id={`end-${i}`} />
                      <Label htmlFor={`end-${i}`} className="text-xs text-muted-foreground">
                        {end.principal ? "Principal" : "Marcar como principal"}
                      </Label>
                    </div>
                    {enderecos.length > 1 && (
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeEndereco(i)}>
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      className="col-span-2"
                      placeholder="Rua"
                      value={end.rua}
                      onChange={(e) => updateEndereco(i, "rua", e.target.value)}
                    />
                    <Input
                      placeholder="Nº"
                      value={end.numero}
                      onChange={(e) => updateEndereco(i, "numero", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Bairro"
                      value={end.bairro}
                      onChange={(e) => updateEndereco(i, "bairro", e.target.value)}
                    />
                    <Input
                      placeholder="Complemento"
                      value={end.complemento || ""}
                      onChange={(e) => updateEndereco(i, "complemento", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </RadioGroup>
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

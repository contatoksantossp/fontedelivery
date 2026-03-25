import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fornecedor } from "./mockParceirosData";

interface FornecedorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fornecedor?: Fornecedor;
  onSave: (data: Omit<Fornecedor, "id" | "historico">) => void;
}

export function FornecedorDialog({ open, onOpenChange, fornecedor, onSave }: FornecedorDialogProps) {
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [contatoNome, setContatoNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  useEffect(() => {
    if (fornecedor) {
      setNomeFantasia(fornecedor.nomeFantasia);
      setRazaoSocial(fornecedor.razaoSocial);
      setCnpj(fornecedor.cnpj);
      setContatoNome(fornecedor.contatoNome);
      setTelefone(fornecedor.telefone);
      setEndereco(fornecedor.endereco);
    } else {
      setNomeFantasia(""); setRazaoSocial(""); setCnpj("");
      setContatoNome(""); setTelefone(""); setEndereco("");
    }
  }, [fornecedor, open]);

  const handleSave = () => {
    if (!nomeFantasia.trim() || !cnpj.trim()) return;
    onSave({ nomeFantasia, razaoSocial, cnpj, contatoNome, telefone, endereco });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{fornecedor ? "Editar Fornecedor" : "Novo Fornecedor"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Nome Fantasia</Label>
            <Input value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />
          </div>
          <div>
            <Label>Razão Social</Label>
            <Input value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} />
          </div>
          <div>
            <Label>CNPJ</Label>
            <Input value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="00.000.000/0001-00" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Contato</Label>
              <Input value={contatoNome} onChange={(e) => setContatoNome(e.target.value)} />
            </div>
            <div>
              <Label>Telefone</Label>
              <Input value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Endereço</Label>
            <Input value={endereco} onChange={(e) => setEndereco(e.target.value)} />
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

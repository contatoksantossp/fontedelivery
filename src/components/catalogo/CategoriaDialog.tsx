import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { CatalogCategoria } from "./mockCatalogoData";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (cat: CatalogCategoria) => void;
  editItem?: CatalogCategoria | null;
}

export function CategoriaDialog({ open, onClose, onSave, editItem }: Props) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("/placeholder.svg");
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    if (editItem) {
      setNome(editItem.nome);
      setDescricao(editItem.descricao);
      setImagem(editItem.imagem);
      setAtivo(editItem.ativo);
    } else {
      setNome(""); setDescricao(""); setImagem("/placeholder.svg"); setAtivo(true);
    }
  }, [editItem, open]);

  const handleSave = () => {
    onSave({
      id: editItem?.id || crypto.randomUUID(),
      nome, descricao, imagem, ativo,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editItem ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div><Label>Nome</Label><Input value={nome} onChange={(e) => setNome(e.target.value)} /></div>
          <div><Label>Descrição</Label><Input value={descricao} onChange={(e) => setDescricao(e.target.value)} /></div>
          <div><Label>URL da Imagem</Label><Input value={imagem} onChange={(e) => setImagem(e.target.value)} /></div>
          <div className="flex items-center gap-2"><Switch checked={ativo} onCheckedChange={setAtivo} /><Label>Ativo</Label></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!nome.trim()}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

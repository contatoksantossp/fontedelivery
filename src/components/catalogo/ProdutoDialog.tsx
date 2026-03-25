import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import type { CatalogProduto, CatalogVariante } from "./mockCatalogoData";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (produto: CatalogProduto, variantes: CatalogVariante[]) => void;
  editProduto?: CatalogProduto | null;
  editVariantes?: CatalogVariante[];
  categoriaId: string;
  subcategoriaId: string;
}

interface VarianteForm {
  id: string;
  nome: string;
  descricao: string;
  foto: string;
  tags: string;
  sku: string;
  custo: number;
  valorVenda: number;
  estoqueMinimo: number;
}

const emptyVariante = (): VarianteForm => ({
  id: crypto.randomUUID(), nome: "", descricao: "", foto: "/placeholder.svg",
  tags: "", sku: "", custo: 0, valorVenda: 0, estoqueMinimo: 0,
});

export function ProdutoDialog({ open, onClose, onSave, editProduto, editVariantes, categoriaId, subcategoriaId }: Props) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState("/placeholder.svg");
  const [variantes, setVariantes] = useState<VarianteForm[]>([emptyVariante()]);

  useEffect(() => {
    if (editProduto) {
      setNome(editProduto.nome);
      setDescricao(editProduto.descricao);
      setFoto(editProduto.foto);
      setVariantes(
        (editVariantes || []).map((v) => ({
          ...v, tags: v.tags.join(", "),
        }))
      );
    } else {
      setNome(""); setDescricao(""); setFoto("/placeholder.svg");
      setVariantes([emptyVariante()]);
    }
  }, [editProduto, editVariantes, open]);

  const updateVariante = (idx: number, field: keyof VarianteForm, value: string | number) => {
    setVariantes((prev) => prev.map((v, i) => i === idx ? { ...v, [field]: value } : v));
  };

  const handleSave = () => {
    const produto: CatalogProduto = {
      id: editProduto?.id || crypto.randomUUID(),
      nome, descricao, foto, destaque: editProduto?.destaque || false,
      subcategoriaId: editProduto?.subcategoriaId || subcategoriaId,
      categoriaId: editProduto?.categoriaId || categoriaId,
    };
    const vars: CatalogVariante[] = variantes.filter(v => v.nome.trim()).map((v) => ({
      id: v.id, nome: v.nome, descricao: v.descricao, foto: v.foto,
      tags: v.tags.split(",").map(t => t.trim()).filter(Boolean),
      sku: v.sku, custo: v.custo, valorVenda: v.valorVenda,
      estoqueMinimo: v.estoqueMinimo, produtoId: produto.id,
    }));
    onSave(produto, vars);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editProduto ? "Editar Produto" : "Novo Produto"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Nome</Label><Input value={nome} onChange={(e) => setNome(e.target.value)} /></div>
            <div><Label>URL da Foto</Label><Input value={foto} onChange={(e) => setFoto(e.target.value)} /></div>
          </div>
          <div><Label>Descrição</Label><Input value={descricao} onChange={(e) => setDescricao(e.target.value)} /></div>

          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Variantes</Label>
              <Button size="sm" variant="outline" onClick={() => setVariantes([...variantes, emptyVariante()])}>
                <Plus className="mr-1 h-3 w-3" /> Variante
              </Button>
            </div>
            {variantes.map((v, i) => (
              <div key={v.id} className="mb-3 rounded-lg border border-border p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Variante {i + 1}</span>
                  {variantes.length > 1 && (
                    <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={() => setVariantes(variantes.filter((_, j) => j !== i))}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div><Label className="text-xs">Nome</Label><Input className="h-8 text-sm" value={v.nome} onChange={(e) => updateVariante(i, "nome", e.target.value)} /></div>
                  <div><Label className="text-xs">SKU</Label><Input className="h-8 text-sm" value={v.sku} onChange={(e) => updateVariante(i, "sku", e.target.value)} /></div>
                  <div><Label className="text-xs">Tags (vírgula)</Label><Input className="h-8 text-sm" value={v.tags} onChange={(e) => updateVariante(i, "tags", e.target.value)} /></div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div><Label className="text-xs">Custo (R$)</Label><Input type="number" className="h-8 text-sm" value={v.custo} onChange={(e) => updateVariante(i, "custo", +e.target.value)} /></div>
                  <div><Label className="text-xs">Venda (R$)</Label><Input type="number" className="h-8 text-sm" value={v.valorVenda} onChange={(e) => updateVariante(i, "valorVenda", +e.target.value)} /></div>
                  <div><Label className="text-xs">Estoque Mín.</Label><Input type="number" className="h-8 text-sm" value={v.estoqueMinimo} onChange={(e) => updateVariante(i, "estoqueMinimo", +e.target.value)} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!nome.trim()}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

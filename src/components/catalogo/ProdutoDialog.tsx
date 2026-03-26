import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, ImageIcon, Star, Barcode, Upload } from "lucide-react";
import type { CatalogProduto, CatalogVariante, UnidadeMedida } from "./mockCatalogoData";

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
  ean: string;
  custo: number;
  valorVenda: number;
  estoqueMinimo: number;
  unidade: UnidadeMedida;
}

const emptyVariante = (): VarianteForm => ({
  id: crypto.randomUUID(), nome: "", descricao: "", foto: "",
  tags: "", ean: "", custo: 0, valorVenda: 0, estoqueMinimo: 0, unidade: "un",
});

const unidades: { value: UnidadeMedida; label: string }[] = [
  { value: "un", label: "Unidade" },
  { value: "kg", label: "Quilograma" },
  { value: "g", label: "Grama" },
  { value: "L", label: "Litro" },
  { value: "ml", label: "Mililitro" },
  { value: "pct", label: "Pacote" },
];

function ClickablePhoto({ src, size = 64, onFileSelect }: { src: string; size?: number; onFileSelect: (url: string) => void }) {
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { setError(false); }, [src]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onFileSelect(url);
    }
    e.target.value = "";
  };

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="rounded-lg border border-border bg-muted flex items-center justify-center shrink-0 relative group cursor-pointer overflow-hidden hover:ring-2 hover:ring-primary/40 transition-all"
        style={{ width: size, height: size }}
      >
        {!src || error ? (
          <ImageIcon className="h-5 w-5 text-muted-foreground" />
        ) : (
          <img
            src={src}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={() => setError(true)}
          />
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Upload className="h-4 w-4 text-white" />
        </div>
      </button>
    </>
  );
}

export function ProdutoDialog({ open, onClose, onSave, editProduto, editVariantes, categoriaId, subcategoriaId }: Props) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState("/placeholder.svg");
  const [ativo, setAtivo] = useState(true);
  const [destaque, setDestaque] = useState(false);
  const [variantes, setVariantes] = useState<VarianteForm[]>([emptyVariante()]);

  useEffect(() => {
    if (editProduto) {
      setNome(editProduto.nome);
      setDescricao(editProduto.descricao);
      setFoto(editProduto.foto);
      setAtivo(editProduto.ativo);
      setDestaque(editProduto.destaque);
      setVariantes(
        (editVariantes || []).map((v) => ({
          ...v, tags: v.tags.join(", "),
        }))
      );
    } else {
      setNome(""); setDescricao(""); setFoto("/placeholder.svg");
      setAtivo(true); setDestaque(false);
      setVariantes([emptyVariante()]);
    }
  }, [editProduto, editVariantes, open]);

  const updateVariante = (idx: number, field: keyof VarianteForm, value: string | number) => {
    setVariantes((prev) => prev.map((v, i) => i === idx ? { ...v, [field]: value } : v));
  };

  const handleSave = () => {
    const produto: CatalogProduto = {
      id: editProduto?.id || crypto.randomUUID(),
      nome, descricao, foto, destaque, ativo,
      subcategoriaId: editProduto?.subcategoriaId || subcategoriaId,
      categoriaId: editProduto?.categoriaId || categoriaId,
    };
    const vars: CatalogVariante[] = variantes.filter(v => v.nome.trim()).map((v) => ({
      id: v.id, nome: v.nome, descricao: v.descricao,
      foto: v.foto || foto,
      tags: v.tags.split(",").map(t => t.trim()).filter(Boolean),
      ean: v.ean, custo: v.custo, valorVenda: v.valorVenda,
      estoqueMinimo: v.estoqueMinimo, unidade: v.unidade, produtoId: produto.id,
    }));
    onSave(produto, vars);
    onClose();
  };

  const formatCurrency = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editProduto ? "Editar Produto" : "Novo Produto"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          {/* === Produto Pai === */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <ClickablePhoto src={foto} size={80} onFileSelect={setFoto} />
              <div className="flex-1 space-y-2">
                <div>
                  <Label>Nome do Produto</Label>
                  <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Coca-Cola" />
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição do produto" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <Switch checked={ativo} onCheckedChange={setAtivo} />
                <span className="text-sm">Ativo</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Switch checked={destaque} onCheckedChange={setDestaque} />
                <span className="text-sm flex items-center gap-1"><Star className="h-3 w-3" /> Destaque</span>
              </label>
            </div>
          </div>

          {/* === Variantes === */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Variantes</Label>
              <Button size="sm" variant="outline" onClick={() => setVariantes([...variantes, emptyVariante()])}>
                <Plus className="mr-1 h-3 w-3" /> Variante
              </Button>
            </div>
            {variantes.map((v, i) => {
              const margem = v.valorVenda - v.custo;
              const margemPct = v.valorVenda > 0 ? (margem / v.valorVenda) * 100 : 0;
              return (
                <div key={v.id} className="mb-3 rounded-lg border border-border p-3 space-y-2">
                  <div className="flex items-start gap-3">
                    <ClickablePhoto src={v.foto || foto} size={48} onFileSelect={(url) => updateVariante(i, "foto", url)} />
                    <div className="flex-1 space-y-2">
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
                        <div>
                          <Label className="text-xs flex items-center gap-1"><Barcode className="h-3 w-3" /> EAN</Label>
                          <Input className="h-8 text-sm" value={v.ean} onChange={(e) => updateVariante(i, "ean", e.target.value)} placeholder="Código de barras" />
                        </div>
                        <div><Label className="text-xs">Descrição</Label><Input className="h-8 text-sm" value={v.descricao} onChange={(e) => updateVariante(i, "descricao", e.target.value)} /></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div><Label className="text-xs">Custo (R$)</Label><Input type="number" className="h-8 text-sm" value={v.custo} onChange={(e) => updateVariante(i, "custo", +e.target.value)} /></div>
                    <div><Label className="text-xs">Venda (R$)</Label><Input type="number" className="h-8 text-sm" value={v.valorVenda} onChange={(e) => updateVariante(i, "valorVenda", +e.target.value)} /></div>
                    <div>
                      <Label className="text-xs">Margem</Label>
                      <div className={`h-8 flex items-center px-2 text-sm font-medium rounded-md border border-border bg-muted ${margem >= 0 ? "text-emerald-600" : "text-destructive"}`}>
                        {formatCurrency(margem)} ({margemPct.toFixed(0)}%)
                      </div>
                    </div>
                    <div><Label className="text-xs">Estoque Mín.</Label><Input type="number" className="h-8 text-sm" value={v.estoqueMinimo} onChange={(e) => updateVariante(i, "estoqueMinimo", +e.target.value)} /></div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Tags de busca (vírgula)</Label>
                      <Input className="h-8 text-sm" value={v.tags} onChange={(e) => updateVariante(i, "tags", e.target.value)} placeholder="Ex: cereja, cherry, ziggy" />
                    </div>
                    <div>
                      <Label className="text-xs">Unidade</Label>
                      <Select value={v.unidade} onValueChange={(val) => updateVariante(i, "unidade", val)}>
                        <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {unidades.map((u) => (
                            <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              );
            })}
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

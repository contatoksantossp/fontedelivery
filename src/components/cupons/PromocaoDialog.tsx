import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { variantesMock, produtosMock } from "@/components/catalogo/mockCatalogoData";
import type { PromocaoBanner, PromocaoProduto } from "./mockCuponsData";

const gradientes = [
  { label: "Laranja → Vermelho", value: "from-amber-500 to-orange-600" },
  { label: "Dourado → Marrom", value: "from-yellow-700 to-amber-900" },
  { label: "Violeta → Roxo", value: "from-violet-500 to-purple-700" },
  { label: "Vermelho → Rosa", value: "from-red-500 to-rose-700" },
  { label: "Verde → Esmeralda", value: "from-green-500 to-emerald-700" },
  { label: "Azul → Índigo", value: "from-blue-500 to-indigo-700" },
];

interface PromocaoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promocao?: PromocaoBanner | null;
  onSalvar: (promo: Omit<PromocaoBanner, "id">) => void;
}

export function PromocaoDialog({ open, onOpenChange, promocao, onSalvar }: PromocaoDialogProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [gradiente, setGradiente] = useState(gradientes[0].value);
  const [tipoDesconto, setTipoDesconto] = useState<"percentual" | "fixo" | "nenhum">("percentual");
  const [valorDesconto, setValorDesconto] = useState("");
  const [produtos, setProdutos] = useState<PromocaoProduto[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");

  useEffect(() => {
    if (promocao) {
      setNome(promocao.nome);
      setDescricao(promocao.descricao);
      setGradiente(promocao.gradiente);
      setTipoDesconto(promocao.tipoDesconto);
      setValorDesconto(String(promocao.valorDesconto));
      setProdutos([...promocao.produtos]);
    } else {
      setNome("");
      setDescricao("");
      setGradiente(gradientes[0].value);
      setTipoDesconto("percentual");
      setValorDesconto("");
      setProdutos([]);
    }
    setProdutoSelecionado("");
  }, [promocao, open]);

  const variantesDisponiveis = variantesMock.map(v => {
    const prod = produtosMock.find(p => p.id === v.produtoId);
    return { key: `${v.id}`, label: `${prod?.nome ?? "?"} — ${v.nome}`, preco: v.valorVenda };
  });

  const calcPrecoFinal = (preco: number) => {
    const desc = Number(valorDesconto) || 0;
    if (tipoDesconto === "percentual") return Math.round((preco * (1 - desc / 100)) * 100) / 100;
    if (tipoDesconto === "fixo") return Math.max(0, Math.round((preco - desc) * 100) / 100);
    return preco;
  };

  const adicionarProduto = () => {
    const v = variantesDisponiveis.find(x => x.key === produtoSelecionado);
    if (!v) return;
    const [prodNome, varNome] = v.label.split(" — ");
    setProdutos(prev => [...prev, { produtoNome: prodNome, varianteNome: varNome, precoOriginal: v.preco, precoFinal: calcPrecoFinal(v.preco) }]);
    setProdutoSelecionado("");
  };

  const removerProduto = (idx: number) => setProdutos(prev => prev.filter((_, i) => i !== idx));

  // Recalculate prices when discount changes
  useEffect(() => {
    if (tipoDesconto === "nenhum") return;
    setProdutos(prev => prev.map(p => ({ ...p, precoFinal: calcPrecoFinal(p.precoOriginal) })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valorDesconto, tipoDesconto]);

  const handleSalvar = () => {
    onSalvar({
      nome,
      descricao,
      gradiente,
      tipoDesconto,
      valorDesconto: Number(valorDesconto) || 0,
      ativo: promocao?.ativo ?? true,
      produtos,
      ordem: promocao?.ordem ?? 0,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{promocao ? "Editar Promoção" : "Nova Promoção / Banner"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Banner preview */}
          <div className={`h-24 rounded-lg bg-gradient-to-r ${gradiente} flex items-center justify-center`}>
            <span className="text-white font-bold text-lg drop-shadow">{nome || "Preview do Banner"}</span>
          </div>

          <div className="space-y-2">
            <Label>Nome da Campanha</Label>
            <Input value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Festival de Cervejas" />
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <Input value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição curta" />
          </div>

          <div className="space-y-2">
            <Label>Cor do Banner</Label>
            <Select value={gradiente} onValueChange={setGradiente}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {gradientes.map(g => (
                  <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tipo de Desconto</Label>
            <div className="flex gap-2">
              {(["percentual", "fixo", "nenhum"] as const).map(t => (
                <Button key={t} type="button" size="sm" variant={tipoDesconto === t ? "default" : "outline"} onClick={() => setTipoDesconto(t)}>
                  {t === "percentual" ? "%" : t === "fixo" ? "R$" : "Nenhum"}
                </Button>
              ))}
            </div>
          </div>

          {tipoDesconto !== "nenhum" && (
            <>
              <div className="space-y-2">
                <Label>Valor do Desconto {tipoDesconto === "percentual" ? "(%)" : "(R$)"}</Label>
                <Input type="number" value={valorDesconto} onChange={e => setValorDesconto(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Vincular Produtos</Label>
                <div className="flex gap-2">
                  <Select value={produtoSelecionado} onValueChange={setProdutoSelecionado}>
                    <SelectTrigger className="flex-1"><SelectValue placeholder="Selecione um produto" /></SelectTrigger>
                    <SelectContent>
                      {variantesDisponiveis.map(v => (
                        <SelectItem key={v.key} value={v.key}>{v.label} — R$ {v.preco.toFixed(2)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="icon" variant="outline" onClick={adicionarProduto} disabled={!produtoSelecionado}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {produtos.length > 0 && (
                <div className="space-y-2">
                  {produtos.map((p, i) => (
                    <div key={i} className="flex items-center justify-between rounded-md border p-2 text-sm">
                      <div>
                        <span className="font-medium">{p.produtoNome}</span>{" "}
                        <span className="text-muted-foreground">({p.varianteNome})</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="line-through text-muted-foreground">R$ {p.precoOriginal.toFixed(2)}</span>
                          <span className="font-bold text-green-600">R$ {p.precoFinal.toFixed(2)}</span>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => removerProduto(i)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSalvar} disabled={!nome}>Publicar no Carrossel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

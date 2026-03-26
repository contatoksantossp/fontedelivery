import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, ImageIcon, Upload } from "lucide-react";
import { variantesMock, produtosMock } from "@/components/catalogo/mockCatalogoData";
import type { PromocaoBanner, PromocaoProduto } from "./mockCuponsData";

function BannerUpload({ src, onFileSelect }: { src: string; onFileSelect: (url: string) => void }) {
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { setError(false); }, [src]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(URL.createObjectURL(file));
    e.target.value = "";
  };

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full h-32 rounded-lg border border-border bg-muted flex items-center justify-center relative group cursor-pointer overflow-hidden hover:ring-2 hover:ring-primary/40 transition-all"
      >
        {!src || src === "/placeholder.svg" || error ? (
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
            <span className="text-xs">Clique para enviar o banner</span>
          </div>
        ) : (
          <img src={src} alt="Banner" className="w-full h-full object-cover" onError={() => setError(true)} />
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Upload className="h-6 w-6 text-white" />
        </div>
      </button>
    </>
  );
}

interface PromocaoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promocao?: PromocaoBanner | null;
  onSalvar: (promo: Omit<PromocaoBanner, "id">) => void;
}

export function PromocaoDialog({ open, onOpenChange, promocao, onSalvar }: PromocaoDialogProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("/placeholder.svg");
  const [tipoDesconto, setTipoDesconto] = useState<"percentual" | "fixo" | "nenhum">("percentual");
  const [valorDesconto, setValorDesconto] = useState("");
  const [produtos, setProdutos] = useState<PromocaoProduto[]>([]);
  const [buscaProduto, setBuscaProduto] = useState("");

  useEffect(() => {
    if (promocao) {
      setNome(promocao.nome);
      setDescricao(promocao.descricao);
      setImagem(promocao.imagem);
      setTipoDesconto(promocao.tipoDesconto);
      setValorDesconto(String(promocao.valorDesconto));
      setProdutos([...promocao.produtos]);
    } else {
      setNome("");
      setDescricao("");
      setImagem("/placeholder.svg");
      setTipoDesconto("percentual");
      setValorDesconto("");
      setProdutos([]);
    }
    setBuscaProduto("");
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

  const resultadosBusca = buscaProduto.trim().length > 0
    ? variantesDisponiveis.filter(v => v.label.toLowerCase().includes(buscaProduto.toLowerCase())).slice(0, 3)
    : [];

  const adicionarProduto = (v: typeof variantesDisponiveis[0]) => {
    const [prodNome, varNome] = v.label.split(" — ");
    setProdutos(prev => [...prev, { produtoNome: prodNome, varianteNome: varNome, precoOriginal: v.preco, precoFinal: calcPrecoFinal(v.preco) }]);
    setBuscaProduto("");
  };

  const removerProduto = (idx: number) => setProdutos(prev => prev.filter((_, i) => i !== idx));

  useEffect(() => {
    if (tipoDesconto === "nenhum") return;
    setProdutos(prev => prev.map(p => ({ ...p, precoFinal: calcPrecoFinal(p.precoOriginal) })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valorDesconto, tipoDesconto]);

  const handleSalvar = () => {
    onSalvar({
      nome,
      descricao,
      imagem,
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
          {/* Banner upload */}
          <div className="space-y-2">
            <Label>Banner</Label>
            <BannerUpload src={imagem} onFileSelect={setImagem} />
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
                <div className="relative">
                  <Input
                    value={buscaProduto}
                    onChange={e => setBuscaProduto(e.target.value)}
                    placeholder="Buscar produto..."
                  />
                  {resultadosBusca.length > 0 && (
                    <div className="absolute z-10 left-0 right-0 mt-1 rounded-md border border-border bg-popover shadow-md overflow-hidden">
                      {resultadosBusca.map(v => (
                        <button
                          key={v.key}
                          type="button"
                          className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors flex justify-between items-center"
                          onClick={() => adicionarProduto(v)}
                        >
                          <span>{v.label}</span>
                          <span className="text-muted-foreground ml-2 shrink-0">R$ {v.preco.toFixed(2)}</span>
                        </button>
                      ))}
                    </div>
                  )}
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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";
import { PromocaoDialog } from "./PromocaoDialog";
import type { PromocaoBanner } from "./mockCuponsData";

interface AbaPromocoesProps {
  promocoes: PromocaoBanner[];
  setPromocoes: React.Dispatch<React.SetStateAction<PromocaoBanner[]>>;
}

export function AbaPromocoes({ promocoes, setPromocoes }: AbaPromocoesProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editando, setEditando] = useState<PromocaoBanner | null>(null);

  const toggleAtivo = (id: string) => {
    setPromocoes(prev => prev.map(p => p.id === id ? { ...p, ativo: !p.ativo } : p));
  };

  const handleSalvar = (dados: Omit<PromocaoBanner, "id">) => {
    if (editando) {
      setPromocoes(prev => prev.map(p => p.id === editando.id ? { ...p, ...dados } : p));
    } else {
      setPromocoes(prev => [...prev, { ...dados, id: `p-${Date.now()}`, ordem: prev.length + 1 }]);
    }
    setEditando(null);
  };

  const abrirEdicao = (promo: PromocaoBanner) => {
    setEditando(promo);
    setDialogOpen(true);
  };

  const abrirNovo = () => {
    setEditando(null);
    setDialogOpen(true);
  };

  const tipoLabel = (t: string) => {
    if (t === "percentual") return "%";
    if (t === "fixo") return "R$";
    return "Info";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={abrirNovo}>
          <Plus className="h-4 w-4 mr-1" /> Nova Promoção / Banner
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {promocoes.map(p => (
          <Card key={p.id} className={`overflow-hidden ${!p.ativo ? "opacity-60" : ""}`}>
            {/* Banner gradient */}
            <div className={`h-28 bg-gradient-to-r ${p.gradiente} flex items-end p-4`}>
              <div>
                <h3 className="text-white font-bold text-lg drop-shadow">{p.nome}</h3>
                <p className="text-white/80 text-sm drop-shadow">{p.descricao}</p>
              </div>
            </div>

            <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={p.tipoDesconto === "nenhum" ? "outline" : "default"}>
                  {tipoLabel(p.tipoDesconto)}
                  {p.tipoDesconto !== "nenhum" && ` ${p.valorDesconto}`}
                </Badge>
                {p.produtos.length > 0 && (
                  <span className="text-xs text-muted-foreground">{p.produtos.length} produto(s)</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" onClick={() => abrirEdicao(p)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Switch checked={p.ativo} onCheckedChange={() => toggleAtivo(p.id)} />
              </div>
            </CardHeader>

            {p.produtos.length > 0 && (
              <CardContent className="pt-0 pb-4 px-4">
                <div className="space-y-1.5">
                  {p.produtos.map((prod, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span>
                        {prod.produtoNome}{" "}
                        <span className="text-muted-foreground">({prod.varianteNome})</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="line-through text-muted-foreground">R$ {prod.precoOriginal.toFixed(2)}</span>
                        <span className="font-bold text-green-600">R$ {prod.precoFinal.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <PromocaoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        promocao={editando}
        onSalvar={handleSalvar}
      />
    </div>
  );
}

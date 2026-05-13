import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";
import { PromocaoDialog } from "./PromocaoDialog";
import { usePromocoes, useUpsertPromocao, useTogglePromocao, type PromocaoBanner } from "@/hooks/data/useCupons";

export function AbaPromocoes() {
  const { data: promocoes = [] } = usePromocoes();
  const upsert = useUpsertPromocao();
  const toggle = useTogglePromocao();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editando, setEditando] = useState<PromocaoBanner | null>(null);

  const handleSalvar = (dados: Omit<PromocaoBanner, "id">) => {
    if (editando) {
      upsert.mutate({ ...editando, ...dados });
    } else {
      upsert.mutate({ ...dados, ordem: promocoes.length + 1 });
    }
    setEditando(null);
  };

  const tipoLabel = (t: string) => (t === "percentual" ? "%" : t === "fixo" ? "R$" : "Info");

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => { setEditando(null); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Nova Promoção / Banner
        </Button>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-2">
        {promocoes.map((p) => (
          <Card key={p.id} className={`w-[380px] flex-shrink-0 overflow-hidden ${!p.ativo ? "opacity-60" : ""}`}>
            <div className="h-28 bg-muted relative overflow-hidden">
              <img src={p.imagem} alt={p.nome} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
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
                <Button size="icon" variant="ghost" onClick={() => { setEditando(p); setDialogOpen(true); }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Switch checked={p.ativo} onCheckedChange={(v) => toggle.mutate({ id: p.id, ativo: v })} />
              </div>
            </CardHeader>

            {p.produtos.length > 0 && (
              <CardContent className="pt-0 pb-4 px-4">
                <div className="space-y-1.5">
                  {p.produtos.map((prod, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span>
                        {prod.produtoNome} <span className="text-muted-foreground">({prod.varianteNome})</span>
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

      <PromocaoDialog open={dialogOpen} onOpenChange={setDialogOpen} promocao={editando} onSalvar={handleSalvar} />
    </div>
  );
}

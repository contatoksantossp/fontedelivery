import { Rota, Parada } from "./mockRotasData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, DollarSign, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

const formasPagamento = ["PIX", "Dinheiro", "Cartão Crédito", "Cartão Débito"];

interface RotaAcertoProps {
  rota: Rota;
  onDarBaixa: (paradaId: string) => void;
  onConcluirRota: (rotaId: string) => void;
  onAlterarPagamento: (paradaId: string, forma: string) => void;
}

export function RotaAcerto({ rota, onDarBaixa, onConcluirRota, onAlterarPagamento }: RotaAcertoProps) {
  const todasComBaixa = rota.paradas.every((p) => p.baixaRealizada);
  const totalGeral = rota.paradas.reduce((s, p) => s + p.totalPedido, 0);
  const totalTaxas = rota.paradas.reduce((s, p) => s + p.taxaEntrega, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary" />
          <div>
            <h3 className="text-sm font-bold text-foreground">Acerto de Contas</h3>
            <p className="text-[10px] text-muted-foreground">{rota.entregadorNome} · {rota.paradas.length} entregas</p>
          </div>
        </div>
      </div>

      {/* List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {rota.paradas.map((parada) => (
            <ParadaAcertoItem
              key={parada.id}
              parada={parada}
              onDarBaixa={() => onDarBaixa(parada.id)}
              onAlterarPagamento={(forma) => onAlterarPagamento(parada.id, forma)}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-border space-y-2">
        <div className="grid grid-cols-2 gap-1 text-[11px]">
          <span className="text-muted-foreground">Total Pedidos:</span>
          <span className="text-right font-semibold text-foreground">R$ {totalGeral.toFixed(2)}</span>
          <span className="text-muted-foreground">Total Taxas:</span>
          <span className="text-right text-foreground">R$ {totalTaxas.toFixed(2)}</span>
          <span className="text-muted-foreground">Bonificação:</span>
          <span className="text-right text-foreground">R$ {rota.bonificacao.toFixed(2)}</span>
        </div>

        <Button
          className="w-full"
          disabled={!todasComBaixa}
          onClick={() => onConcluirRota(rota.id)}
        >
          <DollarSign className="h-4 w-4 mr-1" />
          Concluir Rota
        </Button>

        {!todasComBaixa && (
          <p className="text-[10px] text-muted-foreground text-center">
            Dê baixa em todos os pedidos para concluir
          </p>
        )}
      </div>
    </div>
  );
}

function ParadaAcertoItem({
  parada,
  onDarBaixa,
  onAlterarPagamento,
}: {
  parada: Parada;
  onDarBaixa: () => void;
  onAlterarPagamento: (forma: string) => void;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-3 space-y-2",
        parada.baixaRealizada
          ? "bg-muted/30 border-border opacity-60"
          : "bg-card border-border"
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-foreground">{parada.pedidoCodigo} — {parada.cliente}</p>
          <p className="text-[10px] text-muted-foreground">{parada.endereco}</p>
        </div>
        <span className="text-sm font-bold text-foreground">R$ {parada.totalPedido.toFixed(2)}</span>
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={parada.formaPagamento}
          onValueChange={onAlterarPagamento}
          disabled={parada.baixaRealizada}
        >
          <SelectTrigger className="h-7 text-[11px] flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {formasPagamento.map((f) => (
              <SelectItem key={f} value={f} className="text-xs">
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          size="sm"
          variant={parada.baixaRealizada ? "secondary" : "default"}
          className="h-7 text-[11px] px-3"
          disabled={parada.baixaRealizada}
          onClick={onDarBaixa}
        >
          {parada.baixaRealizada ? (
            <>
              <Check className="h-3 w-3 mr-1" /> OK
            </>
          ) : (
            "Dar Baixa"
          )}
        </Button>
      </div>
    </div>
  );
}

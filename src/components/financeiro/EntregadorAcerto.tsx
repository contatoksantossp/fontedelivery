import { useState } from "react";
import { ChevronDown, ChevronUp, Bike, Car, Plus, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { EntregadorTurno } from "./mockFinanceiroData";

interface EntregadorAcertoProps {
  entregador: EntregadorTurno;
  onRegistrar: (id: string, diaria: number, extras: { valor: number; descricao: string }[]) => void;
}

export function EntregadorAcerto({ entregador, onRegistrar }: EntregadorAcertoProps) {
  const [expanded, setExpanded] = useState(false);
  const [diaria, setDiaria] = useState(entregador.diaria);
  const [extras, setExtras] = useState(entregador.extras);

  const total = entregador.totalTaxas + entregador.totalBonificacoes + diaria + extras.reduce((s, e) => s + e.valor, 0);

  const VeiculoIcon = entregador.veiculo === "Bicicleta" ? Bike : Car;

  return (
    <div className="rounded-lg border bg-card p-4">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <VeiculoIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{entregador.nome}</p>
            <p className="text-xs text-muted-foreground">
              R$ {entregador.totalTaxas.toFixed(2)} em taxas · R$ {entregador.totalBonificacoes.toFixed(2)} bonif. · {entregador.entregas} entregas
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {entregador.pago && <Badge className="bg-success/20 text-success border-0">Pago</Badge>}
          <span className="font-bold text-foreground">R$ {total.toFixed(2)}</span>
          {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </button>

      {expanded && (
        <div className="mt-4 space-y-4 border-t pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Diária</label>
            <Input
              type="number"
              value={diaria}
              onChange={e => setDiaria(Number(e.target.value))}
              className="w-40"
              disabled={entregador.pago}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">Adicionais</label>
              {!entregador.pago && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExtras([...extras, { valor: 0, descricao: "" }])}
                >
                  <Plus className="h-3 w-3 mr-1" /> Adicionar
                </Button>
              )}
            </div>
            {extras.map((extra, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  placeholder="Ex: Adicional chuva"
                  value={extra.descricao}
                  onChange={e => {
                    const newExtras = [...extras];
                    newExtras[i] = { ...newExtras[i], descricao: e.target.value };
                    setExtras(newExtras);
                  }}
                  className="flex-1"
                  disabled={entregador.pago}
                />
                <Input
                  type="number"
                  placeholder="Valor"
                  value={extra.valor || ""}
                  onChange={e => {
                    const newExtras = [...extras];
                    newExtras[i] = { ...newExtras[i], valor: Number(e.target.value) };
                    setExtras(newExtras);
                  }}
                  className="w-28"
                  disabled={entregador.pago}
                />
                {!entregador.pago && (
                  <Button variant="ghost" size="icon" onClick={() => setExtras(extras.filter((_, idx) => idx !== i))}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <span className="font-bold text-foreground">Total: R$ {total.toFixed(2)}</span>
            <Button
              onClick={() => onRegistrar(entregador.id, diaria, extras)}
              disabled={entregador.pago}
            >
              <Check className="h-4 w-4 mr-1" /> Registrar Acerto
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

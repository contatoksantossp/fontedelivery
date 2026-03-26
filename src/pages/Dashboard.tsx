import { useState, useMemo } from "react";
import { PageContainer } from "@/components/PageContainer";
import { MetricCard } from "@/components/MetricCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DivergenciaDialog } from "@/components/dashboard/DivergenciaDialog";
import { ShoppingCart, Clock, TrendingUp, AlertTriangle, Package, CheckCircle2, Check } from "lucide-react";
import { toast } from "sonner";

interface CountItem {
  id: string;
  name: string;
  lastCount: string;
  qty: number;
}

const initialItems: CountItem[] = [
  { id: "1", name: "Skol Lata 350ml", lastCount: "18/03/2026", qty: 96 },
  { id: "2", name: "Heineken Long Neck", lastCount: "17/03/2026", qty: 48 },
  { id: "3", name: "Coca-Cola 350ml", lastCount: "16/03/2026", qty: 72 },
  { id: "4", name: "Carvão Vegetal 4kg", lastCount: "15/03/2026", qty: 15 },
  { id: "5", name: "Gelo 5kg", lastCount: "14/03/2026", qty: 30 },
  { id: "6", name: "Marlboro Box", lastCount: "13/03/2026", qty: 20 },
];

const today = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

export default function Dashboard() {
  const [items, setItems] = useState<CountItem[]>(initialItems);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [divergencia, setDivergencia] = useState<{ item: CountItem; contagem: number } | null>(null);

  const handleCount = (item: CountItem) => {
    const raw = inputValues[item.id];
    if (raw === undefined || raw === "") return;
    const contagem = Number(raw);
    if (isNaN(contagem) || contagem < 0) {
      toast.error("Quantidade inválida");
      return;
    }

    if (contagem !== item.qty) {
      setDivergencia({ item, contagem });
    } else {
      finalizarContagem(item, contagem);
    }
  };

  const finalizarContagem = (item: CountItem, contagem: number) => {
    setItems(prev => {
      const updated = prev.map(i =>
        i.id === item.id ? { ...i, qty: contagem, lastCount: today() } : i
      );
      const target = updated.find(i => i.id === item.id)!;
      const rest = updated.filter(i => i.id !== item.id);
      return [...rest, target];
    });
    setInputValues(prev => {
      const copy = { ...prev };
      delete copy[item.id];
      return copy;
    });
    toast.success(`${item.name} contado com sucesso`);
  };

  const handleDivergenciaConfirm = (descricao: string) => {
    if (!divergencia) return;
    const { item, contagem } = divergencia;
    const diferenca = contagem - item.qty;
    finalizarContagem(item, contagem);
    setDivergencia(null);
    toast.info(
      `${diferenca > 0 ? "Adição" : "Perda"} de ${Math.abs(diferenca)} un. registrada${descricao ? `: ${descricao}` : ""}`
    );
  };

  return (
    <PageContainer title="Página Inicial" subtitle="Resumo operacional do mês — Março 2026">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KPI Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          <MetricCard icon={ShoppingCart} label="Pedidos no Mês" value="1.247" subtitle="+12% vs fev" trend="up" />
          <MetricCard icon={TrendingUp} label="Ticket Médio" value="R$ 68,40" subtitle="+R$ 3,20" trend="up" />
          <MetricCard icon={Clock} label="Tempo Médio" value="32 min" subtitle="-4 min" trend="up" />
          <MetricCard icon={AlertTriangle} label="Atrasos" value="23" subtitle="1,8% dos pedidos" trend="down" />
          <MetricCard icon={Package} label="Itens em Estoque" value="2.340" subtitle="8 abaixo do mínimo" trend="neutral" />
          <MetricCard icon={CheckCircle2} label="Taxa de Entrega" value="97,2%" subtitle="+0,5%" trend="up" />
        </div>

        {/* Quick Count Widget */}
        <div className="rounded-lg border bg-card p-5">
          <div className="mb-4">
            <h2 className="text-base font-semibold font-display text-foreground">Contagem Rápida</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Produtos ordenados pela última contagem</p>
          </div>
          <div className="space-y-3">
            {itemsVisiveis.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-3 py-2.5"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Última: {item.lastCount} · Est: <span className="font-semibold text-primary">{item.qty}</span>
                  </p>
                </div>
                <Input
                  type="number"
                  min={0}
                  placeholder="Qtd"
                  value={inputValues[item.id] ?? ""}
                  onChange={e => setInputValues(prev => ({ ...prev, [item.id]: e.target.value }))}
                  onKeyDown={e => { if (e.key === "Enter") handleCount(item); }}
                  className="w-20 h-8 text-sm"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 shrink-0 text-primary hover:bg-primary/10"
                  onClick={() => handleCount(item)}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {divergencia && (
        <DivergenciaDialog
          open={!!divergencia}
          onClose={() => setDivergencia(null)}
          onConfirm={handleDivergenciaConfirm}
          productName={divergencia.item.name}
          estoqueAnterior={divergencia.item.qty}
          contagemAtual={divergencia.contagem}
        />
      )}
    </PageContainer>
  );
}

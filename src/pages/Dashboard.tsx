import { PageContainer } from "@/components/PageContainer";
import { MetricCard } from "@/components/MetricCard";
import { ShoppingCart, Clock, TrendingUp, AlertTriangle, Package, CheckCircle2 } from "lucide-react";

const quickCountItems = [
  { name: "Skol Lata 350ml", lastCount: "18/03/2026", qty: 48 },
  { name: "Brahma Litrão", lastCount: "17/03/2026", qty: 22 },
  { name: "Carvão Saco 4kg", lastCount: "16/03/2026", qty: 15 },
  { name: "Gelo 5kg", lastCount: "15/03/2026", qty: 30 },
  { name: "Heineken Long Neck", lastCount: "14/03/2026", qty: 60 },
  { name: "Coca-Cola 2L", lastCount: "13/03/2026", qty: 18 },
];

export default function Dashboard() {
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
            {quickCountItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-md border border-border bg-secondary/50 px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Última: {item.lastCount}</p>
                </div>
                <span className="text-sm font-bold font-display text-primary">{item.qty}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

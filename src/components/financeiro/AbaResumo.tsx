import { useState, useMemo } from "react";
import { ShoppingCart, TrendingUp, TrendingDown, DollarSign, CreditCard, Banknote, Smartphone, QrCode, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MetricCard } from "@/components/MetricCard";
import { ValorOculto } from "./ValorOculto";
import type { CaixaState, VendaDiaria, TopProduto } from "./mockFinanceiroData";
import { format } from "date-fns";

interface AbaResumoProps {
  caixa: CaixaState;
  vendasDiarias: VendaDiaria[];
  topProdutos: TopProduto[];
  recebimentos: { dinheiro: number; pix: number; cartao: number; qrcode: number };
}

function TopProdutosRecebimentos({ topProdutos, recebimentos }: { topProdutos: TopProduto[]; recebimentos: AbaResumoProps["recebimentos"] }) {
  const totalRecebimentos = recebimentos.dinheiro + recebimentos.pix + recebimentos.cartao + recebimentos.qrcode;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-lg border bg-card p-4 space-y-3">
        <h4 className="font-semibold text-foreground">Top 10 Produtos</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Unid.</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topProdutos.map((p, i) => (
              <TableRow key={i}>
                <TableCell className="text-sm">{p.nome}</TableCell>
                <TableCell className="text-right text-sm">{p.unidades}</TableCell>
                <TableCell className="text-right text-sm">R$ {p.valorTotal.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-lg border bg-card p-4 space-y-3">
        <h4 className="font-semibold text-foreground">Recebimentos por Método</h4>
        <div className="space-y-3">
          {[
            { label: "Dinheiro", icon: Banknote, valor: recebimentos.dinheiro },
            { label: "PIX", icon: Smartphone, valor: recebimentos.pix },
            { label: "Cartão", icon: CreditCard, valor: recebimentos.cartao },
            { label: "QR Code", icon: QrCode, valor: recebimentos.qrcode },
          ].map(m => (
            <div key={m.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <m.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{m.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${totalRecebimentos > 0 ? (m.valor / totalRecebimentos) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-24 text-right">R$ {m.valor.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AbaResumo({ caixa, vendasDiarias, topProdutos, recebimentos }: AbaResumoProps) {
  const [periodo, setPeriodo] = useState("diario");

  const hoje = vendasDiarias[0];
  const semanal = vendasDiarias.slice(0, 7);
  const mensal = vendasDiarias.slice(0, 30);

  const semanalTotals = useMemo(() => ({
    vendasBruto: semanal.reduce((s, v) => s + v.vendasBruto, 0),
    receitaReal: semanal.reduce((s, v) => s + v.receitaReal, 0),
    despesas: semanal.reduce((s, v) => s + v.despesas, 0),
    resultado: semanal.reduce((s, v) => s + v.resultado, 0),
    pedidos: semanal.reduce((s, v) => s + v.pedidos, 0),
  }), [semanal]);

  const mensalTotals = useMemo(() => ({
    vendasBruto: mensal.reduce((s, v) => s + v.vendasBruto, 0),
    receitaReal: mensal.reduce((s, v) => s + v.receitaReal, 0),
    despesas: mensal.reduce((s, v) => s + v.despesas, 0),
    resultado: mensal.reduce((s, v) => s + v.resultado, 0),
    pedidos: mensal.reduce((s, v) => s + v.pedidos, 0),
  }), [mensal]);

  const caixaAberto = caixa.status === "aberto";

  return (
    <div className="space-y-6">
      <Tabs value={periodo} onValueChange={setPeriodo}>
        <TabsList>
          <TabsTrigger value="diario">Diário</TabsTrigger>
          <TabsTrigger value="semanal">Semanal</TabsTrigger>
          <TabsTrigger value="mensal">Mensal</TabsTrigger>
        </TabsList>

        {/* Diário — dados do caixa atual ou último */}
        <TabsContent value="diario" className="space-y-6 mt-4">
          {!caixaAberto && (
            <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span>Último caixa — {format(new Date(caixa.ultimoFechamento.data), "dd/MM/yyyy HH:mm")}</span>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard icon={ShoppingCart} label="Pedidos" value={String(hoje?.pedidos || 0)} />
            <MetricCard icon={DollarSign} label="Ticket Médio" value={`R$ ${hoje?.ticketMedio.toFixed(2) || "0"}`} />
            <MetricCard icon={TrendingUp} label="Receita" value={`R$ ${hoje?.receitaReal.toFixed(2) || "0"}`} trend="up" />
            <MetricCard icon={TrendingDown} label="Despesas" value={`R$ ${hoje?.despesas.toFixed(2) || "0"}`} trend="down" />
          </div>

          <TopProdutosRecebimentos topProdutos={topProdutos} recebimentos={recebimentos} />
        </TabsContent>

        {/* Semanal & Mensal */}
        {["semanal", "mensal"].map(p => {
          const totals = p === "semanal" ? semanalTotals : mensalTotals;
          const dados = p === "semanal" ? semanal : mensal;
          const chartData = dados
            .map(v => ({
              data: v.data.slice(5),
              receita: Math.round(v.receitaReal),
              despesas: Math.round(v.despesas),
            }))
            .reverse();

          return (
            <TabsContent key={p} value={p} className="space-y-6 mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-lg border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Vendas Bruto</p>
                  <ValorOculto valor={`R$ ${totals.vendasBruto.toFixed(2)}`} className="text-xl" />
                </div>
                <div className="rounded-lg border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Receita Real</p>
                  <ValorOculto valor={`R$ ${totals.receitaReal.toFixed(2)}`} className="text-xl text-success" />
                </div>
                <div className="rounded-lg border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Despesas</p>
                  <ValorOculto valor={`R$ ${totals.despesas.toFixed(2)}`} className="text-xl text-destructive" />
                </div>
                <div className="rounded-lg border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Resultado</p>
                  <ValorOculto valor={`R$ ${totals.resultado.toFixed(2)}`} className="text-xl" />
                </div>
              </div>

              <div className="rounded-lg border bg-card p-4">
                <h4 className="font-semibold text-foreground mb-4">
                  {p === "semanal" ? "Últimos 7 dias" : "Últimos 30 dias"}
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="data" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))",
                      }}
                    />
                    <Bar dataKey="receita" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} name="Receita" />
                    <Bar dataKey="despesas" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Despesas" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <TopProdutosRecebimentos topProdutos={topProdutos} recebimentos={recebimentos} />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

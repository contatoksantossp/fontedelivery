import { useState, useCallback, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSidebar } from "@/components/ui/sidebar";
import { PageContainer } from "@/components/PageContainer";
import { AbaCaixa } from "@/components/financeiro/AbaCaixa";
import { AbaResumo } from "@/components/financeiro/AbaResumo";
import { AbaExtrato } from "@/components/financeiro/AbaExtrato";
import {
  caixaStateMock,
  entregadoresTurnoMock,
  transacoesMock,
  vendasDiariasMock,
  topProdutosMock,
  recebimentosPorMetodo,
} from "@/components/financeiro/mockFinanceiroData";
import type { CaixaState, EntregadorTurno, Transacao, TransacaoTipo, TransacaoMetodo } from "@/components/financeiro/mockFinanceiroData";

export default function Financeiro() {
  const { setOpen } = useSidebar();
  const [caixa, setCaixa] = useState<CaixaState>(caixaStateMock);
  const [entregadores, setEntregadores] = useState<EntregadorTurno[]>(entregadoresTurnoMock);
  const [transacoes, setTransacoes] = useState<Transacao[]>(transacoesMock);

  useEffect(() => { setOpen(false); }, [setOpen]);

  const handleAbrirCaixa = useCallback((fundo: number) => {
    setCaixa(prev => ({ ...prev, status: "aberto", fundoInicial: fundo, entradas: 0, saidas: 0, saldoEsperado: fundo }));
  }, []);

  const handleFecharCaixa = useCallback((contagem: number) => {
    setCaixa(prev => ({
      ...prev,
      status: "fechado",
      ultimoFechamento: { data: new Date().toISOString(), total: contagem },
    }));
  }, []);

  const handleSangriaReforco = useCallback((tipo: "sangria" | "reforco", valor: number, descricao: string) => {
    const isEntrada = tipo === "reforco";
    setCaixa(prev => ({
      ...prev,
      entradas: isEntrada ? prev.entradas + valor : prev.entradas,
      saidas: !isEntrada ? prev.saidas + valor : prev.saidas,
      saldoEsperado: isEntrada ? prev.saldoEsperado + valor : prev.saldoEsperado - valor,
    }));
    const nova: Transacao = {
      id: `t-${Date.now()}`,
      dataHora: new Date().toISOString(),
      descricao: `${tipo === "sangria" ? "Sangria" : "Reforço"} - ${descricao}`,
      tipo: isEntrada ? "entrada" : "saida",
      metodo: "dinheiro",
      valor,
      origem: tipo,
    };
    setTransacoes(prev => [nova, ...prev]);
  }, []);

  const handleRegistrarAcerto = useCallback((id: string, diaria: number, extras: { valor: number; descricao: string }[]) => {
    setEntregadores(prev => prev.map(e => e.id === id ? { ...e, pago: true, diaria, extras } : e));
    const ent = entregadores.find(e => e.id === id);
    if (!ent) return;
    const total = ent.totalTaxas + ent.totalBonificacoes + diaria + extras.reduce((s, ex) => s + ex.valor, 0);
    const nova: Transacao = {
      id: `t-${Date.now()}`,
      dataHora: new Date().toISOString(),
      descricao: `Acerto ${ent.nome}`,
      tipo: "saida",
      metodo: "pix",
      valor: total,
      origem: "acerto",
    };
    setTransacoes(prev => [nova, ...prev]);
    setCaixa(prev => ({ ...prev, saidas: prev.saidas + total, saldoEsperado: prev.saldoEsperado - total }));
  }, [entregadores]);

  const handleLancar = useCallback((dados: { tipo: TransacaoTipo; valor: number; metodo: TransacaoMetodo; descricao: string }) => {
    const nova: Transacao = {
      id: `t-${Date.now()}`,
      dataHora: new Date().toISOString(),
      descricao: `Lançamento manual - ${dados.descricao}`,
      tipo: dados.tipo,
      metodo: dados.metodo,
      valor: dados.valor,
      origem: "manual",
    };
    setTransacoes(prev => [nova, ...prev]);
    setCaixa(prev => ({
      ...prev,
      entradas: dados.tipo === "entrada" ? prev.entradas + dados.valor : prev.entradas,
      saidas: dados.tipo === "saida" ? prev.saidas + dados.valor : prev.saidas,
      saldoEsperado: dados.tipo === "entrada" ? prev.saldoEsperado + dados.valor : prev.saldoEsperado - dados.valor,
    }));
  }, []);

  return (
    <PageContainer title="Financeiro" subtitle="Gestão de caixa, resumos e extrato financeiro">
      <Tabs defaultValue="caixa" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="caixa">Caixa</TabsTrigger>
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
          <TabsTrigger value="extrato">Extrato</TabsTrigger>
        </TabsList>
        <TabsContent value="caixa">
          <AbaCaixa
            caixa={caixa}
            entregadores={entregadores}
            recebimentosPorMetodo={recebimentosPorMetodo}
            onAbrirCaixa={handleAbrirCaixa}
            onFecharCaixa={handleFecharCaixa}
            onSangriaReforco={handleSangriaReforco}
            onRegistrarAcerto={handleRegistrarAcerto}
          />
        </TabsContent>
        <TabsContent value="resumo">
          <AbaResumo
            caixa={caixa}
            vendasDiarias={vendasDiariasMock}
            topProdutos={topProdutosMock}
            recebimentos={recebimentosPorMetodo}
          />
        </TabsContent>
        <TabsContent value="extrato">
          <AbaExtrato transacoes={transacoes} onLancar={handleLancar} />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}

import { useState, useCallback, useEffect } from "react";
import { PackageSearch } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSidebar } from "@/components/ui/sidebar";
import { PageContainer } from "@/components/PageContainer";
import { PosicaoAtual } from "@/components/estoque/PosicaoAtual";
import { Historico } from "@/components/estoque/Historico";
import { FilaEspera } from "@/components/estoque/FilaEspera";
import { estoqueItemsMock, movimentacoesMock, filaEsperaMock } from "@/components/estoque/mockEstoqueData";
import type { EstoqueItem, Movimentacao } from "@/components/estoque/mockEstoqueData";

export default function Estoque() {
  const { setOpen } = useSidebar();
  const [estoqueItems, setEstoqueItems] = useState<EstoqueItem[]>(estoqueItemsMock);
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>(movimentacoesMock);

  useEffect(() => { setOpen(false); }, [setOpen]);

  const handleAjustarSaldo = useCallback((varianteId: string, delta: number) => {
    setEstoqueItems(prev => prev.map(item => {
      if (item.varianteId !== varianteId) return item;
      const novoSaldo = Math.max(0, item.estoqueAtual + delta);
      const novaMov: Movimentacao = {
        id: `m-${Date.now()}`,
        dataHora: new Date().toISOString(),
        produtoNome: item.produtoNome,
        varianteNome: item.varianteNome,
        tipo: "correcao",
        quantidade: delta,
        saldoFinal: novoSaldo,
      };
      setMovimentacoes(prev => [novaMov, ...prev]);
      return { ...item, estoqueAtual: novoSaldo };
    }));
  }, []);

  const handleEditarMinimo = useCallback((varianteId: string, novoMin: number) => {
    setEstoqueItems(prev => prev.map(item =>
      item.varianteId === varianteId ? { ...item, estoqueMinimo: Math.max(0, novoMin) } : item
    ));
  }, []);

  return (
    <PageContainer title="Estoque" subtitle="Controle de posição, movimentações e fila de espera">
      <Tabs defaultValue="posicao" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="posicao">Posição Atual</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="fila">Fila de Espera</TabsTrigger>
        </TabsList>
        <TabsContent value="posicao">
          <PosicaoAtual items={estoqueItems} onAjustarSaldo={handleAjustarSaldo} onEditarMinimo={handleEditarMinimo} />
        </TabsContent>
        <TabsContent value="historico">
          <Historico movimentacoes={movimentacoes} />
        </TabsContent>
        <TabsContent value="fila">
          <FilaEspera items={filaEsperaMock} />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}

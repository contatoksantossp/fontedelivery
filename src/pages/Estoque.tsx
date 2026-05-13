import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSidebar } from "@/components/ui/sidebar";
import { PageContainer } from "@/components/PageContainer";
import { PosicaoAtual } from "@/components/estoque/PosicaoAtual";
import { Historico } from "@/components/estoque/Historico";
import { FilaEspera } from "@/components/estoque/FilaEspera";

export default function Estoque() {
  const { setOpen } = useSidebar();
  useEffect(() => { setOpen(false); }, [setOpen]);

  return (
    <PageContainer title="Estoque" subtitle="Controle de posição, movimentações e fila de espera">
      <Tabs defaultValue="posicao" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="posicao">Posição Atual</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="fila">Fila de Espera</TabsTrigger>
        </TabsList>
        <TabsContent value="posicao"><PosicaoAtual /></TabsContent>
        <TabsContent value="historico"><Historico /></TabsContent>
        <TabsContent value="fila"><FilaEspera /></TabsContent>
      </Tabs>
    </PageContainer>
  );
}

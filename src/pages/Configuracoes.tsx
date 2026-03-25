import { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AbaPerfilLoja } from "@/components/configuracoes/AbaPerfilLoja";
import { AbaConfiguracaoEntrega } from "@/components/configuracoes/AbaConfiguracaoEntrega";
import {
  mockPerfilLoja,
  mockHorarios,
  mockFaixasCliente,
  mockFaixasEntregador,
  PerfilLoja,
  HorarioFuncionamento,
  FaixaKm,
} from "@/components/configuracoes/mockConfigData";

export default function Configuracoes() {
  const [perfil, setPerfil] = useState<PerfilLoja>({ ...mockPerfilLoja });
  const [horarios, setHorarios] = useState<HorarioFuncionamento[]>([...mockHorarios.map(h => ({ ...h }))]);
  const [faixasCliente, setFaixasCliente] = useState<FaixaKm[]>([...mockFaixasCliente.map(f => ({ ...f }))]);
  const [faixasEntregador, setFaixasEntregador] = useState<FaixaKm[]>([...mockFaixasEntregador.map(f => ({ ...f }))]);

  return (
    <PageContainer title="Configurações" subtitle="Gerencie o perfil da loja e configurações de entrega">
      <Tabs defaultValue="perfil" className="space-y-4">
        <TabsList>
          <TabsTrigger value="perfil">Perfil da Loja</TabsTrigger>
          <TabsTrigger value="entrega">Configuração de Entrega</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <AbaPerfilLoja perfil={perfil} setPerfil={setPerfil} horarios={horarios} setHorarios={setHorarios} />
        </TabsContent>

        <TabsContent value="entrega">
          <AbaConfiguracaoEntrega
            faixasCliente={faixasCliente}
            setFaixasCliente={setFaixasCliente}
            faixasEntregador={faixasEntregador}
            setFaixasEntregador={setFaixasEntregador}
          />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}

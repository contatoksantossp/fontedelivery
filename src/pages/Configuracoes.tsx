import { PageContainer } from "@/components/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AbaPerfilLoja } from "@/components/configuracoes/AbaPerfilLoja";
import { AbaConfiguracaoEntrega } from "@/components/configuracoes/AbaConfiguracaoEntrega";
import { AbaEnderecosCache } from "@/components/configuracoes/AbaEnderecosCache";

export default function Configuracoes() {
  return (
    <PageContainer title="Configurações" subtitle="Gerencie o perfil da loja e configurações de entrega">
      <Tabs defaultValue="perfil" className="space-y-4">
        <TabsList>
          <TabsTrigger value="perfil">Perfil da Loja</TabsTrigger>
          <TabsTrigger value="entrega">Configuração de Entrega</TabsTrigger>
          <TabsTrigger value="enderecos">Endereços Cache</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <AbaPerfilLoja />
        </TabsContent>

        <TabsContent value="entrega">
          <AbaConfiguracaoEntrega />
        </TabsContent>

        <TabsContent value="enderecos">
          <AbaEnderecosCache />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}

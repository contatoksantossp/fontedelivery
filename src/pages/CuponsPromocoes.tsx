import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSidebar } from "@/components/ui/sidebar";
import { PageContainer } from "@/components/PageContainer";
import { AbaCupons } from "@/components/cupons/AbaCupons";
import { AbaPromocoes } from "@/components/cupons/AbaPromocoes";

export default function CuponsPromocoes() {
  const { setOpen } = useSidebar();
  useEffect(() => { setOpen(false); }, [setOpen]);

  return (
    <PageContainer title="Cupons e Promoções" subtitle="Gerencie cupons de desconto e campanhas promocionais">
      <Tabs defaultValue="cupons" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="cupons">Cupons</TabsTrigger>
          <TabsTrigger value="promocoes">Promoções e Banners</TabsTrigger>
        </TabsList>
        <TabsContent value="cupons">
          <AbaCupons />
        </TabsContent>
        <TabsContent value="promocoes">
          <AbaPromocoes />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}

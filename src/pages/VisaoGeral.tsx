import { useState, useEffect } from "react";
import { pedidosMock, Pedido } from "@/components/visao-geral/mockData";
import { KanbanColumn } from "@/components/visao-geral/KanbanColumn";
import { PedidoCard } from "@/components/visao-geral/PedidoCard";
import { PedidoDetalhes } from "@/components/visao-geral/PedidoDetalhes";
import { MapaRotas } from "@/components/visao-geral/MapaRotas";
import { useSidebar } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, MapPin } from "lucide-react";

export default function VisaoGeral() {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosMock);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedSlot, setExpandedSlot] = useState<number | null>(null);
  const { setOpen } = useSidebar();

  // Collapse sidebar on mount
  useEffect(() => {
    setOpen(false);
    return () => setOpen(true);
  }, [setOpen]);

  const pendentes = pedidos.filter((p) => p.status === "pendente");
  const prontos = pedidos.filter((p) => p.status === "pronto");
  const prontosEntrega = prontos.filter((p) => p.tipo === "entrega");
  const prontosRetirada = prontos.filter((p) => p.tipo === "retirada");
  const selectedPedido = pedidos.find((p) => p.id === selectedId) || null;

  const handleAction = (pedidoId: string, action: string) => {
    if (action === "cancelar") {
      setPedidos((prev) => prev.filter((p) => p.id !== pedidoId));
      if (selectedId === pedidoId) setSelectedId(null);
    } else if (action === "pronto") {
      setPedidos((prev) =>
        prev.map((p) => (p.id === pedidoId ? { ...p, status: "pronto" as const } : p))
      );
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Coluna Esquerda — Kanbans */}
      <div className="w-[40%] flex flex-col gap-2 p-3 border-r border-border overflow-hidden">
        <KanbanColumn title="Pedidos Pendentes" count={pendentes.length} className="flex-1 min-h-0">
          {pendentes.map((p) => (
            <PedidoCard
              key={p.id}
              pedido={p}
              selected={selectedId === p.id}
              onSelect={(ped) => setSelectedId(ped.id)}
              onAction={handleAction}
            />
          ))}
        </KanbanColumn>

        <KanbanColumn title="Pedidos Prontos" count={prontos.length} className="flex-1 min-h-0">
          <Tabs defaultValue="entregas" className="w-full">
            <TabsList className="w-full h-8 mb-2">
              <TabsTrigger value="entregas" className="flex-1 text-xs gap-1">
                <Truck className="h-3 w-3" /> Entregas ({prontosEntrega.length})
              </TabsTrigger>
              <TabsTrigger value="retiradas" className="flex-1 text-xs gap-1">
                <MapPin className="h-3 w-3" /> Retiradas ({prontosRetirada.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="entregas" className="space-y-2 mt-0">
              {prontosEntrega.map((p) => (
                <PedidoCard
                  key={p.id}
                  pedido={p}
                  selected={selectedId === p.id}
                  onSelect={(ped) => setSelectedId(ped.id)}
                  onAction={handleAction}
                />
              ))}
            </TabsContent>
            <TabsContent value="retiradas" className="space-y-2 mt-0">
              {prontosRetirada.map((p) => (
                <PedidoCard
                  key={p.id}
                  pedido={p}
                  selected={selectedId === p.id}
                  onSelect={(ped) => setSelectedId(ped.id)}
                  onAction={handleAction}
                />
              ))}
            </TabsContent>
          </Tabs>
        </KanbanColumn>
      </div>

      {/* Coluna Central — Detalhes */}
      <div className="w-[20%] border-r border-border flex flex-col overflow-hidden">
        <PedidoDetalhes pedido={selectedPedido} />
      </div>

      {/* Coluna Direita — Mapa + Rotas */}
      <div className="w-[40%] p-3 overflow-y-auto">
        <MapaRotas
          pedidosProntos={prontos}
          expandedSlot={expandedSlot}
          onExpandSlot={setExpandedSlot}
          onCollapseSlot={() => setExpandedSlot(null)}
        />
      </div>
    </div>
  );
}

import { useState, useEffect, useMemo, useCallback } from "react";
import { pedidosMock, Pedido, entregadoresMock } from "@/components/visao-geral/mockData";
import { KanbanColumn } from "@/components/visao-geral/KanbanColumn";
import { PedidoCard } from "@/components/visao-geral/PedidoCard";
import { PedidoDetalhes } from "@/components/visao-geral/PedidoDetalhes";
import { MapaRotas } from "@/components/visao-geral/MapaRotas";
import { SlotRotaExpanded } from "@/components/visao-geral/SlotRota";
import { useSidebar } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, MapPin } from "lucide-react";

export default function VisaoGeral() {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosMock);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedSlot, setExpandedSlot] = useState<number | null>(null);
  const [rotasItens, setRotasItens] = useState<[Pedido[], Pedido[]]>([[], []]);
  const [entregadorPorRota, setEntregadorPorRota] = useState<[string | null, string | null]>([null, null]);
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
    return () => setOpen(true);
  }, [setOpen]);

  const pendentes = pedidos.filter((p) => p.status === "pendente");
  const prontos = pedidos.filter((p) => p.status === "pronto");
  const prontosEntrega = prontos.filter((p) => p.tipo === "entrega");
  const prontosRetirada = prontos.filter((p) => p.tipo === "retirada");
  const selectedPedido = pedidos.find((p) => p.id === selectedId) || null;

  const pedidosNaRota = useMemo(
    () => new Set(rotasItens.flat().map((p) => p.id)),
    [rotasItens]
  );

  const selectionMode = expandedSlot !== null;

  // Map pedidoId -> cor do entregador atribuído à rota
  const pedidoCorMap = useMemo(() => {
    const map = new Map<string, string>();
    [0, 1].forEach((i) => {
      const entId = entregadorPorRota[i];
      if (entId) {
        const ent = entregadoresMock.find((e) => e.id === entId);
        if (ent) {
          rotasItens[i].forEach((p) => map.set(p.id, ent.cor));
        }
      }
    });
    return map;
  }, [rotasItens, entregadorPorRota]);

  // Cor do entregador por rota
  const entregadorCorPorRota = useMemo<[string | null, string | null]>(() => {
    return [0, 1].map((i) => {
      const entId = entregadorPorRota[i];
      if (!entId) return null;
      return entregadoresMock.find((e) => e.id === entId)?.cor || null;
    }) as [string | null, string | null];
  }, [entregadorPorRota]);

  const addToRota = useCallback((slotIndex: number, pedido: Pedido) => {
    setRotasItens((prev) => {
      const copy: [Pedido[], Pedido[]] = [prev[0].slice(), prev[1].slice()];
      copy[slotIndex].push(pedido);
      return copy;
    });
  }, []);

  const removeFromRota = useCallback((slotIndex: number, pedidoId: string) => {
    setRotasItens((prev) => {
      const copy: [Pedido[], Pedido[]] = [prev[0].slice(), prev[1].slice()];
      copy[slotIndex] = copy[slotIndex].filter((p) => p.id !== pedidoId);
      return copy;
    });
  }, []);

  const reorderRota = useCallback((slotIndex: number, items: Pedido[]) => {
    setRotasItens((prev) => {
      const copy: [Pedido[], Pedido[]] = [prev[0].slice(), prev[1].slice()];
      copy[slotIndex] = items;
      return copy;
    });
  }, []);

  const handleSelectEntregador = useCallback((slotIndex: number, entregadorId: string) => {
    setEntregadorPorRota((prev) => {
      const copy: [string | null, string | null] = [...prev];
      copy[slotIndex] = copy[slotIndex] === entregadorId ? null : entregadorId;
      return copy;
    });
  }, []);

  const handleAction = (pedidoId: string, action: string) => {
    if (action === "cancelar" || action === "finalizar") {
      setPedidos((prev) => prev.filter((p) => p.id !== pedidoId));
      if (selectedId === pedidoId) setSelectedId(null);
    } else if (action === "pronto") {
      setPedidos((prev) =>
        prev.map((p) => (p.id === pedidoId ? { ...p, status: "pronto" as const } : p))
      );
    }
  };

  const handleCardClick = (pedido: Pedido) => {
    if (selectionMode && pedido.status === "pronto" && pedido.tipo === "entrega" && !pedidosNaRota.has(pedido.id)) {
      addToRota(expandedSlot!, pedido);
    } else if (!selectionMode) {
      setSelectedId(pedido.id);
    }
  };

  const handleMarkerClick = useCallback((pedido: Pedido) => {
    if (selectionMode && pedido.status === "pronto" && pedido.tipo === "entrega" && !pedidosNaRota.has(pedido.id)) {
      addToRota(expandedSlot!, pedido);
    } else if (!selectionMode) {
      setSelectedId(pedido.id);
    }
  }, [selectionMode, pedidosNaRota, expandedSlot, addToRota]);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Coluna Esquerda — Kanbans */}
      <div className="w-[35%] flex flex-row gap-2 p-3 border-r border-border overflow-hidden">
        <KanbanColumn
          title="Pedidos Pendentes"
          count={pendentes.length}
          className="w-1/2 h-full"
        >
          {pendentes.map((p) => (
            <PedidoCard
              key={p.id}
              pedido={p}
              selected={!selectionMode && selectedId === p.id}
              selectionMode={selectionMode}
              inRota={pedidosNaRota.has(p.id)}
              rotaColor={pedidoCorMap.get(p.id)}
              onSelect={handleCardClick}
              onAction={handleAction}
            />
          ))}
        </KanbanColumn>

        <KanbanColumn
          title="Pedidos Prontos"
          count={prontos.length}
          className="w-1/2 h-full"
        >
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
                  selected={!selectionMode && selectedId === p.id}
                  selectionMode={selectionMode}
                  inRota={pedidosNaRota.has(p.id)}
                  rotaColor={pedidoCorMap.get(p.id)}
                  onSelect={handleCardClick}
                  onAction={handleAction}
                />
              ))}
            </TabsContent>
            <TabsContent value="retiradas" className="space-y-2 mt-0">
              {prontosRetirada.map((p) => (
                <PedidoCard
                  key={p.id}
                  pedido={p}
                  selected={!selectionMode && selectedId === p.id}
                  selectionMode={selectionMode}
                  inRota={pedidosNaRota.has(p.id)}
                  rotaColor={pedidoCorMap.get(p.id)}
                  onSelect={handleCardClick}
                  onAction={handleAction}
                />
              ))}
            </TabsContent>
          </Tabs>
        </KanbanColumn>
      </div>

      {/* Coluna Central — Detalhes ou Rota Expandida */}
      <div className="w-[25%] border-r border-border flex flex-col overflow-hidden">
        {selectionMode ? (
          <SlotRotaExpanded
            slotIndex={expandedSlot!}
            rotaItens={rotasItens[expandedSlot!]}
            onCollapse={() => setExpandedSlot(null)}
            onRemove={(pedidoId) => removeFromRota(expandedSlot!, pedidoId)}
            onReorder={(items) => reorderRota(expandedSlot!, items)}
            entregadorCor={entregadorCorPorRota[expandedSlot!]}
            selectedEntregadorId={entregadorPorRota[expandedSlot!]}
            onSelectEntregador={(id) => handleSelectEntregador(expandedSlot!, id)}
          />
        ) : (
          <PedidoDetalhes pedido={selectedPedido} />
        )}
      </div>

      {/* Coluna Direita — Mapa + Rotas */}
      <div className="w-[40%] p-3 overflow-y-auto">
        <MapaRotas
          pedidosProntos={prontos}
          expandedSlot={expandedSlot}
          onExpandSlot={setExpandedSlot}
          onCollapseSlot={() => setExpandedSlot(null)}
          rotasItens={rotasItens}
          onRemoveFromRota={removeFromRota}
          onReorderRota={reorderRota}
          pedidoCorMap={pedidoCorMap}
          selectionMode={selectionMode}
          onMarkerClick={handleMarkerClick}
          entregadorCorPorRota={entregadorCorPorRota}
          selectedEntregador={entregadorPorRota}
          onSelectEntregador={handleSelectEntregador}
        />
      </div>
    </div>
  );
}

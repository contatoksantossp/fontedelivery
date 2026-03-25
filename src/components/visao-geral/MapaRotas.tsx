import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { Pedido } from "./mockData";
import { SlotRota } from "./SlotRota";

interface MapaRotasProps {
  pedidosProntos: Pedido[];
  expandedSlot: number | null;
  onExpandSlot: (index: number) => void;
  onCollapseSlot: () => void;
  rotasItens: [Pedido[], Pedido[]];
  onRemoveFromRota: (slotIndex: number, pedidoId: string) => void;
  onReorderRota: (slotIndex: number, items: Pedido[]) => void;
  pedidoCorMap: Map<string, string>;
  selectionMode: boolean;
  onMarkerClick: (pedido: Pedido) => void;
  entregadorCorPorRota: [string | null, string | null];
  selectedEntregador: [string | null, string | null];
  onSelectEntregador: (slotIndex: number, entregadorId: string) => void;
}

function createPinIcon(color: string, eligible: boolean) {
  return L.divIcon({
    className: "",
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    html: `<div class="map-pin ${eligible ? "map-pin-eligible" : ""}" style="background:${color};color:${color};"></div>`,
  });
}

function MapMarkers({
  pedidos,
  pedidoCorMap,
  selectionMode,
  pedidosNaRota,
  onMarkerClick,
}: {
  pedidos: Pedido[];
  pedidoCorMap: Map<string, string>;
  selectionMode: boolean;
  pedidosNaRota: Set<string>;
  onMarkerClick: (pedido: Pedido) => void;
}) {
  const map = useMap();
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const entregas = pedidos.filter((p) => p.tipo === "entrega");

    entregas.forEach((pedido) => {
      const inRota = pedidosNaRota.has(pedido.id);
      const rotaColor = pedidoCorMap.get(pedido.id);
      const isEligible = selectionMode && !inRota;
      const color = rotaColor || (inRota ? "#6b7280" : "#9ca3af");

      const icon = createPinIcon(color, isEligible);
      const marker = L.marker([pedido.lat, pedido.lng], { icon });

      marker.on("click", () => onMarkerClick(pedido));

      marker.bindTooltip(
        `<div style="font-size:11px;font-weight:600;">${pedido.codigo}</div><div style="font-size:10px;">${pedido.cliente}</div><div style="font-size:10px;opacity:0.7;">${pedido.endereco}</div>`,
        {
          direction: "top",
          offset: [0, -10],
          className: "map-tooltip-dark",
        }
      );

      marker.addTo(map);
      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [pedidos, pedidoCorMap, selectionMode, pedidosNaRota, onMarkerClick, map]);

  return null;
}

export function MapaRotas({
  pedidosProntos,
  expandedSlot,
  onExpandSlot,
  onCollapseSlot,
  rotasItens,
  onRemoveFromRota,
  onReorderRota,
  pedidoCorMap,
  selectionMode,
  onMarkerClick,
  entregadorCorPorRota,
  selectedEntregador,
  onSelectEntregador,
}: MapaRotasProps) {
  const pedidosNaRota = new Set(rotasItens.flat().map((p) => p.id));

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Mapa Real */}
      <div className="rounded-lg border border-border overflow-hidden flex-1 min-h-[200px]">
        <MapContainer
          center={[-23.558, -46.660]}
          zoom={13}
          className="h-full w-full"
          zoomControl={true}
          attributionControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <MapMarkers
            pedidos={pedidosProntos}
            pedidoCorMap={pedidoCorMap}
            selectionMode={selectionMode}
            pedidosNaRota={pedidosNaRota}
            onMarkerClick={onMarkerClick}
          />
        </MapContainer>
      </div>

      {/* Slots de Rota */}
      <div className="grid grid-cols-2 gap-2">
        {[0, 1].map((i) => (
          <SlotRota
            key={i}
            slotIndex={i}
            rotaItens={rotasItens[i]}
            expanded={expandedSlot === i}
            onExpand={() => onExpandSlot(i)}
            onCollapse={onCollapseSlot}
            onRemove={(pedidoId) => onRemoveFromRota(i, pedidoId)}
            onReorder={(items) => onReorderRota(i, items)}
            entregadorCor={entregadorCorPorRota[i]}
            selectedEntregadorId={selectedEntregador[i]}
            onSelectEntregador={(id) => onSelectEntregador(i, id)}
          />
        ))}
      </div>
    </div>
  );
}

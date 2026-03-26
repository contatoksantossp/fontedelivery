import { useEffect, useRef } from "react";
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
  onDespachar: (slotIndex: number) => void;
}

function createPinIcon(color: string, eligible: boolean) {
  return L.divIcon({
    className: "",
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    html: `<div class="map-pin ${eligible ? "map-pin-eligible" : ""}" style="background:${color};color:${color};"></div>`,
  });
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
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      attributionControl: true,
    }).setView([-23.558, -46.66], 13);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    window.setTimeout(() => {
      map.invalidateSize();
    }, 0);

    return () => {
      markersLayerRef.current?.clearLayers();
      map.remove();
      markersLayerRef.current = null;
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return;

    const layer = markersLayerRef.current;
    layer.clearLayers();

    const entregas = pedidosProntos.filter((p) => p.tipo === "entrega");

    entregas.forEach((pedido) => {
      const inRota = pedidosNaRota.has(pedido.id);
      const rotaColor = pedidoCorMap.get(pedido.id);
      const isEligible = selectionMode && !inRota;
      const color = rotaColor || (inRota ? "#6b7280" : "#9ca3af");

      const marker = L.marker([pedido.lat, pedido.lng], {
        icon: createPinIcon(color, isEligible),
      });

      marker.on("click", () => onMarkerClick(pedido));
      marker.bindPopup(
        `<div style="font-size:11px;font-weight:600;">${pedido.codigo}</div><div style="font-size:10px;">${pedido.cliente}</div>`,
        {
          closeButton: true,
          offset: [0, -10],
          className: "leaflet-popup-compact",
        }
      );

      layer.addLayer(marker);
    });

    if (entregas.length === 1) {
      mapRef.current.setView([entregas[0].lat, entregas[0].lng], 14);
    } else if (entregas.length > 1) {
      const bounds = L.latLngBounds(entregas.map((pedido) => [pedido.lat, pedido.lng] as [number, number]));
      mapRef.current.fitBounds(bounds.pad(0.2));
    }
  }, [pedidosProntos, pedidosNaRota, pedidoCorMap, selectionMode, onMarkerClick]);

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="rounded-lg border border-border overflow-hidden flex-1 min-h-[200px] bg-card">
        <div ref={mapContainerRef} className="h-full w-full" />
      </div>

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

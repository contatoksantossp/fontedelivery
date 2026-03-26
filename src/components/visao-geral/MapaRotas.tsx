import { useEffect, useRef, useMemo } from "react";
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

const UNASSIGNED_COLOR = "#9ca3af";

function createPinIcon(color: string, eligible: boolean, orderNum?: number) {
  const size = orderNum != null ? 22 : 14;
  const content = orderNum != null
    ? `<div class="map-pin-numbered ${eligible ? "map-pin-eligible" : ""}" style="background:${color};width:${size}px;height:${size}px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,0.9);box-shadow:0 1px 4px rgba(0,0,0,0.4);"><span style="color:#fff;font-size:11px;font-weight:700;line-height:1;">${orderNum}</span></div>`
    : `<div class="map-pin ${eligible ? "map-pin-eligible" : ""}" style="background:${color};color:${color};"></div>`;

  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: content,
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
  onDespachar,
}: MapaRotasProps) {
  const pedidosNaRota = new Set(rotasItens.flat().map((p) => p.id));
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Build a map: pedidoId -> { orderNum, color }
  const pedidoOrderMap = useMemo(() => {
    const map = new Map<string, { orderNum: number; color: string }>();
    [0, 1].forEach((i) => {
      const color = entregadorCorPorRota[i] || UNASSIGNED_COLOR;
      rotasItens[i].forEach((p, idx) => {
        map.set(p.id, { orderNum: idx + 1, color });
      });
    });
    return map;
  }, [rotasItens, entregadorCorPorRota]);

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
      const orderInfo = pedidoOrderMap.get(pedido.id);
      const isEligible = selectionMode && !inRota;
      const color = orderInfo?.color || (inRota ? UNASSIGNED_COLOR : "#9ca3af");

      const marker = L.marker([pedido.lat, pedido.lng], {
        icon: createPinIcon(color, isEligible, orderInfo?.orderNum),
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
  }, [pedidosProntos, pedidosNaRota, pedidoOrderMap, selectionMode, onMarkerClick]);

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
            onDespachar={onDespachar}
          />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import L from "leaflet";
import { Rota } from "./mockRotasData";

interface RotaMapaLeafletProps {
  rota: Rota | null;
  cor: string;
  allRotas: Rota[];
  corMap: Record<string, string>;
}

function createPinIcon(color: string, index: number, clientName: string) {
  return L.divIcon({
    className: "",
    iconSize: [0, 0],
    iconAnchor: [12, 12],
    html: `<div style="display:flex;align-items:center;gap:4px;white-space:nowrap;">
      <div style="width:24px;height:24px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;">${index}</div>
      <span style="font-size:10px;font-weight:600;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.8);max-width:100px;overflow:hidden;text-overflow:ellipsis;">${clientName}</span>
    </div>`,
  });
}

function createDriverIcon(color: string) {
  return L.divIcon({
    className: "",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    html: `<div style="width:20px;height:20px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>`,
  });
}

export function RotaMapaLeaflet({ rota, cor, allRotas, corMap }: RotaMapaLeafletProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: true,
      attributionControl: false,
    }).setView([-23.558, -46.66], 13);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    setTimeout(() => map.invalidateSize(), 0);

    return () => {
      layerRef.current?.clearLayers();
      map.remove();
      layerRef.current = null;
      mapRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapRef.current || !layerRef.current) return;
    const layer = layerRef.current;
    layer.clearLayers();

    const coords: [number, number][] = [];

    if (rota) {
      const rotaFinished = rota.status === "finalizada" || rota.status === "concluida";

      // Selected route: show stops
      rota.paradas.forEach((p, index) => {
        const pinColor = (rotaFinished || p.paradaStatus === "entregue") ? "#6b7280" : cor;
        const marker = L.marker([p.lat, p.lng], { icon: createPinIcon(pinColor, index + 1, p.cliente) });
        marker.bindTooltip(
          `<div style="font-size:11px;font-weight:600;">${p.pedidoCodigo}</div><div style="font-size:10px;">${p.cliente}</div><div style="font-size:10px;opacity:0.7;">${p.endereco}</div>`,
          { direction: "top", offset: [0, -10] }
        );
        layer.addLayer(marker);
        coords.push([p.lat, p.lng]);
      });

      // Driver position — only show if route is active
      if (!rotaFinished) {
        const driverMarker = L.marker([rota.entregadorLat, rota.entregadorLng], {
          icon: createDriverIcon(cor),
        });
        driverMarker.bindTooltip(
          `<div style="font-size:11px;font-weight:600;">${rota.entregadorNome}</div>`,
          { direction: "top", offset: [0, -14] }
        );
        layer.addLayer(driverMarker);
        coords.push([rota.entregadorLat, rota.entregadorLng]);
      }
    } else {
      // No selection: show all drivers
      allRotas.forEach((r) => {
        if (r.status === "concluida") return;
        const c = corMap[r.id] || "#9ca3af";
        const marker = L.marker([r.entregadorLat, r.entregadorLng], {
          icon: createDriverIcon(c),
        });
        marker.bindTooltip(
          `<div style="font-size:11px;font-weight:600;">${r.entregadorNome}</div><div style="font-size:10px;">${r.paradas.length} paradas</div>`,
          { direction: "top", offset: [0, -14] }
        );
        layer.addLayer(marker);
        coords.push([r.entregadorLat, r.entregadorLng]);
      });
    }

    if (coords.length === 1) {
      mapRef.current.setView(coords[0], 14);
    } else if (coords.length > 1) {
      mapRef.current.fitBounds(L.latLngBounds(coords).pad(0.2));
    }
  }, [rota, cor, allRotas, corMap]);

  return (
    <div className="flex-1 min-h-0">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}

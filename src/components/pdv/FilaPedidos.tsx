import { useState } from "react";
import { PedidoFila, CanalVenda } from "./mockPdvData";
import { FilaPedidoCard } from "./FilaPedidoCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ClipboardList, Plus, Store, MessageCircle, Smartphone } from "lucide-react";

const filtrosCanal: { id: CanalVenda | "todos"; label: string; icon: React.ReactNode }[] = [
  { id: "todos", label: "Todos", icon: <ClipboardList className="h-3 w-3" /> },
  { id: "balcao", label: "Balcão", icon: <Store className="h-3 w-3" /> },
  { id: "whatsapp", label: "WhatsApp", icon: <MessageCircle className="h-3 w-3" /> },
  { id: "ifood", label: "iFood", icon: <Smartphone className="h-3 w-3" /> },
  { id: "99food", label: "99Food", icon: <Smartphone className="h-3 w-3" /> },
  { id: "app", label: "App", icon: <Smartphone className="h-3 w-3" /> },
];

interface FilaPedidosProps {
  pedidos: PedidoFila[];
  selectedId: string | null;
  onSelect: (pedido: PedidoFila) => void;
}

export function FilaPedidos({ pedidos, selectedId, onSelect }: FilaPedidosProps) {
  const [filtroCanal, setFiltroCanal] = useState<CanalVenda | "todos">("todos");

  const pedidosFiltrados = filtroCanal === "todos"
    ? pedidos
    : pedidos.filter((p) => p.canal === filtroCanal);

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-border space-y-2">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Fila de Pedidos</h2>
          <span className="ml-auto text-xs text-muted-foreground">{pedidosFiltrados.length}</span>
        </div>
        <Button size="sm" className="w-full gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          Novo Pedido
        </Button>
        <div className="flex flex-wrap gap-1">
          {filtrosCanal.map((f) => (
            <button
              key={f.id}
              onClick={() => setFiltroCanal(f.id)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium transition-colors ${
                filtroCanal === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {pedidosFiltrados.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8">Nenhum pedido na fila</p>
          ) : (
            pedidosFiltrados.map((p) => (
              <FilaPedidoCard
                key={p.id}
                pedido={p}
                selected={selectedId === p.id}
                onSelect={onSelect}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

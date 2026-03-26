import { useState } from "react";
import { PedidoFila, CanalVenda } from "./mockPdvData";
import { FilaPedidoCard } from "./FilaPedidoCard";
import { CanalVendaSelector } from "./CanalVendaSelector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ClipboardList, Plus } from "lucide-react";

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
        <CanalVendaSelector value={filtroCanal} onChange={setFiltroCanal} showTodos />
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

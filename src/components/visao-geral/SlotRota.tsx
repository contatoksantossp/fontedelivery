import { useState } from "react";
import { X, GripVertical, Truck, Bike, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pedido, entregadoresMock } from "./mockData";
import { Input } from "@/components/ui/input";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SlotRotaProps {
  slotIndex: number;
  rotaItens: Pedido[];
  expanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  onRemove: (pedidoId: string) => void;
  onReorder: (items: Pedido[]) => void;
  entregadorCor?: string | null;
  selectedEntregadorId?: string | null;
  onSelectEntregador?: (entregadorId: string) => void;
}

function SortableItem({ pedido, onRemove }: { pedido: Pedido; onRemove: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: pedido.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 rounded-md border bg-card p-2 text-sm"
    >
      <button {...attributes} {...listeners} className="cursor-grab text-muted-foreground hover:text-foreground">
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{pedido.codigo} — {pedido.cliente}</p>
        <p className="text-xs text-muted-foreground truncate">{pedido.endereco}</p>
      </div>
      <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => onRemove(pedido.id)}>
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}

const veiculoIcon = (v: string) => {
  if (v.toLowerCase().includes("moto")) return <Bike className="h-3 w-3" />;
  if (v.toLowerCase().includes("carro")) return <Car className="h-3 w-3" />;
  return <Bike className="h-3 w-3" />;
};

export function SlotRota({ slotIndex, rotaItens, expanded, onExpand, entregadorCor }: SlotRotaProps) {
  if (expanded) return null;

  return (
    <div
      className="rounded-lg border bg-card/50 p-3 cursor-pointer hover:border-primary/40 transition-colors"
      style={entregadorCor ? { borderLeftWidth: 3, borderLeftColor: entregadorCor } : undefined}
      onClick={onExpand}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-display font-semibold text-foreground uppercase tracking-wider">
          Rota {slotIndex + 1}
        </h4>
        {rotaItens.length > 0 && (
          <span className="text-[10px] font-bold bg-primary/15 text-primary px-1.5 py-0.5 rounded-full">
            {rotaItens.length}
          </span>
        )}
      </div>
      {rotaItens.length > 0 ? (
        <div className="space-y-1">
          {rotaItens.map((p) => (
            <p key={p.id} className="text-xs text-muted-foreground truncate">
              {p.codigo} — {p.cliente}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">Clique para criar rota</p>
      )}
    </div>
  );
}

// Expanded route content for the center column
export function SlotRotaExpanded({
  slotIndex,
  rotaItens,
  onCollapse,
  onRemove,
  onReorder,
  entregadorCor,
  selectedEntregadorId,
  onSelectEntregador,
}: Omit<SlotRotaProps, "expanded" | "onExpand">) {
  const [bonificacao, setBonificacao] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = rotaItens.findIndex((i) => i.id === active.id);
      const newIndex = rotaItens.findIndex((i) => i.id === over.id);
      onReorder(arrayMove(rotaItens, oldIndex, newIndex));
    }
  };

  const kmEstimado = rotaItens.length * 3.2;
  const taxaTotal = rotaItens.reduce((s, p) => s + p.taxaEntrega, 0);

  return (
    <div className="flex flex-col h-full p-4 space-y-4 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {entregadorCor && (
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entregadorCor }} />
          )}
          <h3 className="text-sm font-display font-bold text-foreground">
            {selectedEntregadorId
              ? `Rota do ${entregadoresMock.find((e) => e.id === selectedEntregadorId)?.nome ?? "Entregador"}`
              : `Montar Rota ${slotIndex + 1}`}
          </h3>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onCollapse}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground bg-primary/5 rounded-md p-2 border border-dashed border-primary/30">
        Clique nos pedidos prontos de entrega na coluna à esquerda ou no mapa para adicioná-los a esta rota.
      </p>

      {/* Entregador - Grid de botões */}
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block">Entregador</label>
        <div className="grid grid-cols-2 gap-1.5 max-h-[120px] overflow-y-auto pr-1">
          {entregadoresMock.map((e) => (
            <button
              key={e.id}
              onClick={() => onSelectEntregador?.(e.id)}
              className="flex items-center gap-2 rounded-md border bg-card p-2 text-left text-xs transition-all hover:bg-secondary"
              style={
                selectedEntregadorId === e.id
                  ? { borderColor: e.cor, boxShadow: `0 0 0 1px ${e.cor}` }
                  : undefined
              }
            >
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: e.cor }}
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground truncate">{e.nome}</p>
                <div className="flex items-center gap-1 text-muted-foreground">
                  {veiculoIcon(e.veiculo)}
                  <span>{e.veiculo}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sortable List */}
      {rotaItens.length > 0 ? (
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Ordem de entrega</label>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={rotaItens.map((i) => i.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-1.5">
                {rotaItens.map((p) => (
                  <SortableItem key={p.id} pedido={p} onRemove={onRemove} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          Nenhum pedido adicionado
        </div>
      )}

      {/* Resumo */}
      {rotaItens.length > 0 && (
        <div className="space-y-2 text-sm mt-auto">
          <div className="flex justify-between text-muted-foreground">
            <span>KM estimado</span>
            <span>{kmEstimado.toFixed(1)} km</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Taxas acumuladas</span>
            <span>R$ {taxaTotal.toFixed(2)}</span>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Bonificação</label>
            <Input
              className="h-8 text-sm"
              placeholder="R$ 0,00"
              value={bonificacao}
              onChange={(e) => setBonificacao(e.target.value)}
            />
          </div>
          <Button
            className="w-full h-9 text-sm font-semibold"
            style={entregadorCor ? { backgroundColor: entregadorCor } : undefined}
          >
            <Truck className="h-4 w-4 mr-1.5" />
            Despachar Rota
          </Button>
        </div>
      )}
    </div>
  );
}

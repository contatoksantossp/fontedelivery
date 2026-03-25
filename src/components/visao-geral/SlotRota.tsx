import { useState } from "react";
import { X, GripVertical, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pedido, entregadoresMock } from "./mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

export function SlotRota({ slotIndex, rotaItens, expanded, onExpand, onCollapse, onRemove, onReorder }: SlotRotaProps) {
  const [entregadorId, setEntregadorId] = useState("");
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

  if (!expanded) {
    return (
      <div
        className="rounded-lg border bg-card/50 p-3 cursor-pointer hover:border-primary/40 transition-colors"
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

  return null; // Expanded content renders in center column
}

// Expanded route content for the center column
export function SlotRotaExpanded({ slotIndex, rotaItens, onCollapse, onRemove, onReorder }: Omit<SlotRotaProps, "expanded" | "onExpand">) {
  const [entregadorId, setEntregadorId] = useState("");
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
        <h3 className="text-sm font-display font-bold text-foreground">
          Montar Rota {slotIndex + 1}
        </h3>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onCollapse}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground bg-primary/5 rounded-md p-2 border border-dashed border-primary/30">
        Clique nos pedidos prontos de entrega na coluna à esquerda para adicioná-los a esta rota.
      </p>

      {/* Entregador */}
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Entregador</label>
        <Select value={entregadorId} onValueChange={setEntregadorId}>
          <SelectTrigger className="h-8 text-sm">
            <SelectValue placeholder="Selecionar entregador" />
          </SelectTrigger>
          <SelectContent>
            {entregadoresMock.map((e) => (
              <SelectItem key={e.id} value={e.id}>
                {e.nome} ({e.veiculo})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          <Button className="w-full h-9 text-sm font-semibold">
            <Truck className="h-4 w-4 mr-1.5" />
            Despachar Rota
          </Button>
        </div>
      )}
    </div>
  );
}

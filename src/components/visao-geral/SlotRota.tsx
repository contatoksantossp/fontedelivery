import { useState } from "react";
import { Plus, X, GripVertical, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pedido, entregadoresMock } from "./mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
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
  pedidosProntos: Pedido[];
  expanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

function SortableItem({ pedido }: { pedido: Pedido }) {
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
    </div>
  );
}

export function SlotRota({ slotIndex, pedidosProntos, expanded, onExpand, onCollapse }: SlotRotaProps) {
  const [entregadorId, setEntregadorId] = useState("");
  const [rotaItens, setRotaItens] = useState<Pedido[]>([]);
  const [bonificacao, setBonificacao] = useState("");

  const entregasDisponiveis = pedidosProntos.filter(
    (p) => p.tipo === "entrega" && !rotaItens.find((r) => r.id === p.id)
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setRotaItens((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addToRota = (pedido: Pedido) => {
    setRotaItens((prev) => [...prev, pedido]);
  };

  const kmEstimado = rotaItens.length * 3.2;
  const taxaTotal = rotaItens.reduce((s, p) => s + p.taxaEntrega, 0);

  if (!expanded) {
    return (
      <div className="rounded-lg border bg-card/50 p-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-display font-semibold text-foreground uppercase tracking-wider">
            Rota {slotIndex + 1}
          </h4>
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
          <Button
            variant="outline"
            size="sm"
            className="w-full h-8 text-xs border-dashed"
            onClick={onExpand}
          >
            <Plus className="h-3 w-3 mr-1" />
            Criar Nova Rota
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-display font-bold text-foreground">
          Montar Rota {slotIndex + 1}
        </h4>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onCollapse}>
          <X className="h-4 w-4" />
        </Button>
      </div>

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

      {/* Entregas disponíveis */}
      {entregasDisponiveis.length > 0 && (
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Adicionar entregas</label>
          <div className="space-y-1">
            {entregasDisponiveis.map((p) => (
              <button
                key={p.id}
                onClick={() => addToRota(p)}
                className="w-full text-left flex items-center gap-2 rounded-md border border-dashed p-2 text-sm hover:bg-accent/10 transition-colors"
              >
                <Plus className="h-3 w-3 text-primary" />
                <span className="text-foreground">{p.codigo} — {p.cliente}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sortable List */}
      {rotaItens.length > 0 && (
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Ordem de entrega</label>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={rotaItens.map((i) => i.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-1.5">
                {rotaItens.map((p) => (
                  <SortableItem key={p.id} pedido={p} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {/* Resumo */}
      {rotaItens.length > 0 && (
        <div className="space-y-2 text-sm">
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

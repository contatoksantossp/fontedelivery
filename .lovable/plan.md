

## Drag-and-drop de Pendentes → Prontos

Substituir o botao "Pronto" nos cards pendentes por arrastar o card da coluna Pendentes para a coluna Prontos, usando `@dnd-kit` (ja instalado no projeto).

### Arquitetura

```text
DndContext (VisaoGeral)
├── Droppable "pendentes" (KanbanColumn)
│   └── Draggable PedidoCard (cada pedido pendente)
└── Droppable "prontos" (KanbanColumn)
    └── PedidoCard (cards prontos, nao arrastáveis)
```

Quando um card pendente é solto na coluna "prontos", dispara `handleAction(pedidoId, "pronto")`.

### Arquivos editados

**1. `src/pages/VisaoGeral.tsx`**
- Envolver as duas KanbanColumns com `DndContext` do @dnd-kit
- No `onDragEnd`: se `over.id === "prontos"` e o pedido arrastado é pendente, chamar `handleAction(active.id, "pronto")`
- Passar estado de drag ativo para highlight visual na coluna destino

**2. `src/components/visao-geral/KanbanColumn.tsx`**
- Tornar droppable usando `useDroppable` com um `id` prop
- Adicionar highlight visual (borda primary, fundo sutil) quando `isOver` e há item sendo arrastado

**3. `src/components/visao-geral/PedidoCard.tsx`**
- Cards pendentes: envolver com `useDraggable` (id = pedido.id)
- Remover o botao "Pronto" dos cards pendentes (manter Cancelar)
- Aplicar `transform` e `opacity` durante drag
- Cards prontos e em selectionMode: sem drag


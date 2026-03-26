

## Drag handle dedicado no PedidoCard

O problema: os listeners de drag estão no card inteiro (linha 55), impedindo o clique de abrir detalhes.

### Solução

Mover os `listeners` e `attributes` do drag para uma área específica dentro do card, visível apenas em cards pendentes. No lugar onde ficava o botão "Pronto" (que foi removido), adicionar um handle de arrasto com ícone `GripHorizontal` e texto "Arraste →".

### Alterações em `src/components/visao-geral/PedidoCard.tsx`

1. **Remover `listeners` e `attributes` do div raiz** (linha 55) — o card volta a ser clicável normalmente
2. **Adicionar handle de drag nos cards pendentes** — na área de botões (linha 114-150), quando `isPendente && !selectionMode`, renderizar um elemento com os `listeners` e `attributes`:
   ```
   <div {...listeners} {...attributes} className="flex items-center gap-1 cursor-grab ...">
     <GripHorizontal className="h-3.5 w-3.5" />
     <span>Arraste →</span>
   </div>
   ```
3. **Manter `ref={setNodeRef}`** no div raiz (necessário para o dnd-kit calcular posição)
4. **Manter `transform`/`opacity` style** no div raiz para o feedback visual durante drag
5. **Remover `cursor-grab`** da classe do card raiz, já que o grab fica só no handle
6. Importar `GripHorizontal` do lucide-react

O card fica clicável para abrir detalhes, e o drag só inicia ao segurar no handle "Arraste →".


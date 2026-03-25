

## Modo Selecao de Rota — Plano

### Resumo

Quando o usuario clica em um slot de rota (Rota 1 ou Rota 2), a coluna central troca de "Detalhes do Pedido" para o card expandido da rota. Entra o **modo selecao**: clicar em um PedidoCard na coluna esquerda adiciona o pedido a rota ativa. Pedidos ja inseridos em qualquer rota ficam indisponiveis para a outra.

### Mudancas

**1. `VisaoGeral.tsx` — Estado centralizado de rotas**
- Novo estado: `rotasItens: [Pedido[], Pedido[]]` (array com 2 arrays, um por slot)
- Funcoes `addToRota(slotIndex, pedido)` e `removeFromRota(slotIndex, pedidoId)`
- Derivar `pedidosNaRota: Set<string>` com todos os IDs ja alocados em qualquer rota
- Quando `expandedSlot !== null`: coluna central renderiza `SlotRota` expandido em vez de `PedidoDetalhes`
- Quando `expandedSlot !== null` e usuario clica num PedidoCard de entrega pronto (que nao esteja em nenhuma rota), chama `addToRota`
- Ao fechar o slot (collapse), volta a mostrar `PedidoDetalhes`

**2. `PedidoCard.tsx` — Indicacao visual de modo selecao e alocacao**
- Nova prop opcional `selectionMode?: boolean` e `inRota?: boolean`
- Quando `inRota === true`: card com opacidade reduzida, badge "Na Rota", click desabilitado
- Quando `selectionMode === true` e pedido eh elegivel (pronto + entrega + nao na rota): borda pontilhada pulsante, click adiciona a rota em vez de selecionar para detalhes

**3. `SlotRota.tsx` — Receber itens via props em vez de estado interno**
- Props: `rotaItens`, `onAddPedido`, `onRemovePedido`, `onReorder` (em vez de estado local)
- Remover a secao "Adicionar entregas" interna (agora a selecao vem do click nos cards da coluna esquerda)
- Manter: selecao de entregador, lista sortable com drag-and-drop, resumo financeiro, botao despachar

**4. `MapaRotas.tsx` — Passar props de rota**
- Repassar `rotasItens[i]` e callbacks para cada `SlotRota`
- Card colapsado mostra os pedidos ja adicionados

**5. Coluna Central — Alternancia condicional**
- `expandedSlot !== null` → renderiza o conteudo expandido do SlotRota (entregador, lista sortable, resumo, despachar) ocupando a coluna central inteira
- `expandedSlot === null` → renderiza `PedidoDetalhes` normalmente

### Detalhes Tecnicos

- Estado `rotasItens` fica em `VisaoGeral.tsx` e desce via props — evita duplicacao
- `pedidosNaRota` derivado com `useMemo` para performance
- `PedidoCard` recebe `onClick` condicional: modo selecao → `addToRota`, modo normal → `setSelectedId`
- Nenhuma dependencia nova


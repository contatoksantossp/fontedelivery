

## Módulo 2: Visão Geral — Layout Frontend

Construir a tela de Visão Geral com layout de 3 colunas, sistema Kanban, painel de detalhes e área de mapa/rotas. Tudo com dados mockados, sem backend.

---

### Estrutura de Arquivos

```text
src/pages/VisaoGeral.tsx          — Página principal (layout 3 colunas)
src/components/visao-geral/
  KanbanColumn.tsx                — Coluna genérica de Kanban
  PedidoCard.tsx                  — Card de pedido (reutilizável)
  PedidoDetalhes.tsx              — Painel central de detalhes
  MapaRotas.tsx                   — Área do mapa + slots de rota
  SlotRota.tsx                    — Slot individual de rota
  mockData.ts                     — Dados fictícios de pedidos
```

### 1. Layout de 3 Colunas

- **Coluna Esquerda (40%)**: Dois Kanbans empilhados — "Pedidos Pendentes" e "Pedidos Prontos" (subdividido em Entregas e Retiradas)
- **Coluna Central (20%)**: Detalhes do pedido selecionado (nome, endereço, telefone, itens, financeiro)
- **Coluna Direita (40%)**: Mapa placeholder no topo + 2 slots de rota embaixo

A sidebar será forçada ao estado colapsado (apenas ícones) nesta página para maximizar espaço.

### 2. Componentes

**PedidoCard**: Exibe código, cliente, endereço, timer. Botões de ação (Cancelar, Pronto/Despachar/Finalizar) com visual dark premium. Clicável para selecionar e mostrar detalhes na coluna central.

**KanbanColumn**: Container scrollável com título, contagem de pedidos e lista de PedidoCards. O Kanban 2 terá tabs ou separadores para "Entregas" vs "Retiradas".

**PedidoDetalhes**: Exibe dados completos do pedido selecionado — informações do cliente, lista de itens, observações, e resumo financeiro (subtotal, descontos, taxa, total, formas de pagamento).

**MapaRotas**: Placeholder visual para o mapa (retângulo com ícone de mapa) + 2 SlotRota abaixo.

**SlotRota**: Estado inicial com botão "Criar Nova Rota". Modo expandido (ao clicar) toma a coluna central mostrando: seletor de entregador, lista de entregas arrastáveis (drag & drop visual com mock), resumo de KM/taxas, campo de bonificação, botão "Despachar". Modo espera: mostra entregas selecionadas resumidas.

### 3. Dados Mock

~6 pedidos fictícios com clientes, endereços, itens e valores variados para popular os kanbans.

### 4. Interações (Frontend Only)

- Clicar em um card seleciona-o e exibe detalhes na coluna central
- Botão "Pronto" move card do Kanban 1 para Kanban 2 (estado local)
- Botão "Criar Nova Rota" expande o slot e transforma o layout central
- Botão "Fechar (X)" retorna ao layout padrão com slot em modo espera
- Drag & drop visual nos itens da rota (reordenação)
- Todos os estados geridos com useState/useReducer local

### 5. Integração

- Substituir o placeholder em `App.tsx` pela nova página `VisaoGeral`
- Rota `/visao-geral` aponta para o novo componente

### Detalhes Técnicos

- Usar `@dnd-kit/core` + `@dnd-kit/sortable` para drag & drop na lista de rotas
- Sidebar colapsada via prop ou efeito ao montar a página
- Scroll independente em cada coluna Kanban com `overflow-y-auto`
- Cores: cards em `bg-card`, bordas `border-border`, ações em `bg-primary`, cancelar em `bg-destructive`


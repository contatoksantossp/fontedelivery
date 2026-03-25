

## Modulo 3: Rotas e Logistica — Plano de Implementacao

### Arquivos

```text
src/pages/Rotas.tsx                         — Pagina principal (layout 3 colunas)
src/components/rotas/
  mockRotasData.ts                          — Dados mock de rotas, paradas e entregadores
  RotaCard.tsx                              — Card de rota no Kanban (entregador, mini-cards horizontais, status)
  RotaDetalhes.tsx                          — Coluna central com detalhes da rota selecionada
  RotaAcerto.tsx                            — Coluna direita: conferencia de pagamentos (rota finalizada)
  RotaTimeline.tsx                          — Timeline vertical de paradas (usado dentro de RotaDetalhes)
```

Atualizar `src/App.tsx` para importar `Rotas` na rota `/rotas`.

---

### 1. Mock Data (`mockRotasData.ts`)

Tipos: `RotaStatus = "pendente" | "em_rota" | "finalizada" | "concluida"`, `ParadaStatus = "pendente" | "entregue"`.

Interface `Parada`: pedido id, cliente, endereco, km, taxaEntrega, totalPedido, itens, formaPagamento, paradaStatus.

Interface `Rota`: id, entregadorId/nome/veiculo, paradas[], status, acaoAnterior, proximaAcao, tempoEstimado, kmTotal, bonificacao.

Criar 4-5 rotas mock com status variados, reutilizando `entregadoresMock` do modulo 2.

---

### 2. Layout da Pagina (`Rotas.tsx`)

Mesmo pattern do `VisaoGeral.tsx`: sidebar colapsada via `useSidebar`, layout flex com 3 colunas (40%-20%-40%).

Estado: `rotas[]`, `selectedRotaId`, geridos com `useState`.

- **Coluna esquerda (40%)**: Kanban unico vertical com `RotaCard`s. Rotas ativas no topo, concluidas (cinza) embaixo.
- **Coluna central (20%)**: `RotaDetalhes` da rota selecionada (ou placeholder "Selecione uma rota").
- **Coluna direita (40%)**: Condicional por status:
  - Nenhuma selecionada / Pendente / Em Rota: Mapa placeholder (reutilizar visual do `MapaRotas`).
  - Finalizada: `RotaAcerto` (conferencia de pagamentos).

---

### 3. Componentes

**RotaCard**: Cabecalho com nome do entregador, acao anterior/proxima. Centro com mini-cards de pedidos rolando horizontal (`overflow-x-auto`), pedidos entregues ficam cinza. Rodape com badge de status colorido (pendente=amarelo, em_rota=azul, finalizada=laranja, concluida=cinza). Clicavel para selecionar.

**RotaDetalhes**: Cabecalho com nome do entregador. Lista de pedidos verticais com: cliente, endereco, km, taxa, total. Cada pedido tem botao "expandir" (accordion) mostrando itens e observacoes. Rodape com metricas consolidadas (tempo estimado, km total).

**RotaTimeline**: Steps verticais com linha conectora. Icone por status da parada (check verde = entregue, clock amarelo = pendente). Usado dentro do RotaDetalhes.

**RotaAcerto**: Lista de pedidos com forma de pagamento editavel (Select). Botao "Dar Baixa" por pedido. Ao dar baixa em todos, habilita botao "Concluir Rota" que muda status para "concluida", card fica cinza no Kanban.

---

### 4. Interacoes (Frontend Only)

- Clicar em RotaCard seleciona e preenche coluna central
- Rota finalizada selecionada troca coluna direita para RotaAcerto
- "Dar Baixa" individual marca parada como conferida (estado local)
- "Concluir Rota" muda status para concluida, card fica cinza
- Accordion para expandir detalhes de cada pedido na coluna central
- Todos os estados via useState local

---

### Detalhes Tecnicos

- Reutilizar `KanbanColumn`, `ScrollArea`, `Tabs`, `Select`, `Accordion` do shadcn
- Cores dos status: pendente `bg-yellow-500/15`, em_rota `bg-blue-500/15`, finalizada `bg-orange-500/15`, concluida `bg-muted`
- Card concluido: `opacity-60` + `bg-muted` para visual cinza
- Mini-cards horizontais: `flex overflow-x-auto gap-2` com `min-w-[120px]` cada
- Nenhuma dependencia nova necessaria




## Componente compartilhado `CanalVendaSelector`

### Objetivo
Extrair os botões de seleção de canal de venda (usados em `FilaPedidos.tsx` e `AbaIdentificacao.tsx`) para um componente reutilizável.

### Novo arquivo: `src/components/pdv/CanalVendaSelector.tsx`

- Props: `value` (canal selecionado), `onChange` (callback), `showTodos` (boolean, default false), `iconSize` (opcional)
- Renderiza a linha de 5 botões (Balcão, WhatsApp, iFood, 99Food, App) com ícone + label
- Se `showTodos=true`, renderiza o botão "Todos" abaixo (usado na FilaPedidos)
- O `value` aceita `CanalVenda | "todos"` quando `showTodos` está ativo

### Editar: `src/components/pdv/FilaPedidos.tsx`
- Remover array `canaisIndividuais` e markup dos botões de filtro
- Usar `<CanalVendaSelector value={filtroCanal} onChange={setFiltroCanal} showTodos />`

### Editar: `src/components/pdv/AbaIdentificacao.tsx`
- Remover array `canais` e markup dos botões de canal
- Usar `<CanalVendaSelector value={canal} onChange={setCanalVenda} />`

### Resultado
- Mesmo visual e comportamento em ambos os locais
- Uma única fonte de verdade para os canais de venda


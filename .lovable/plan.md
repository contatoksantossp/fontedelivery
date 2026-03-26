

## Fornecedores: scroll horizontal + histórico com filtros e itens expandíveis

### Mudanças

**1. Layout horizontal**
- Trocar `grid grid-cols-1 md:grid-cols-2` por `flex overflow-x-auto gap-4 pb-2`
- Cada card com `w-[340px] flex-shrink-0`

**2. Histórico com filtros de período**
- Adicionar estado de filtro por fornecedor: `7d`, `30d`, `12m`, `intervalo`
- Botões de filtro rápido (7 dias, 30 dias, 12 meses) como grupo de toggles acima da tabela
- Filtro por intervalo de datas com dois DatePickers (de/até) usando Popover+Calendar
- Filtrar `f.historico` pela data antes de renderizar

**3. Pedidos expandíveis**
- Atualizar `HistoricoCompra` no mock para incluir campo `itens: { nome: string; qtd: number; valorUnit: number }[]`
- Cada linha do histórico vira um `Collapsible` — ao clicar expande e mostra os itens comprados em sub-lista
- Adicionar ícone ChevronRight que rotaciona ao expandir

### Mock data
- Adicionar `itens` nos registros existentes de `fornecedoresMock`

### Arquivos editados
- `src/components/parceiros/mockParceirosData.ts` — interface `HistoricoCompra` + itens nos mocks
- `src/components/parceiros/AbaFornecedores.tsx` — layout horizontal, filtros de data, linhas expandíveis




## Contagem Rápida — Limite 10 itens + Ordenação por data

### Mudança

No `src/pages/Dashboard.tsx`:

1. **Ordenar `items` por `lastCount` ascendente** (data mais antiga primeiro) antes de renderizar
2. **Exibir no máximo 10 itens** usando `.slice(0, 10)`
3. A lógica de `finalizarContagem` já move o item contado para o fim da lista e atualiza `lastCount` para hoje — isso permanece

### Detalhes técnicos

- Criar um `useMemo` que ordena `items` por data (`lastCount` no formato dd/MM/yyyy, precisa parsear para comparar) e fatia os 10 primeiros
- Usar esse array derivado no `.map()` do JSX em vez de `items` direto
- Função de parse: converter `"18/03/2026"` → `Date` para comparação (`split("/")` → `new Date(yyyy, mm-1, dd)`)
- O array `initialItems` pode ter mais de 10 itens no futuro; a UI sempre mostra apenas 10


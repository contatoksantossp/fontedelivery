

## Contagem Rápida — Limite 10 itens + Ordenação por data

### Arquivo: `src/pages/Dashboard.tsx`

1. Adicionar `useMemo` import
2. Criar função helper `parseDate(dateStr: string): Date` que converte `"18/03/2026"` → `new Date(2026, 2, 18)`
3. Criar `itemsVisiveis` com `useMemo` que:
   - Copia e ordena `items` por `lastCount` ascendente (data mais antiga primeiro)
   - Aplica `.slice(0, 10)`
4. Substituir `items.map(...)` por `itemsVisiveis.map(...)` no JSX

### Detalhe técnico

```typescript
const parseDate = (d: string) => {
  const [dd, mm, yyyy] = d.split("/");
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
};

const itemsVisiveis = useMemo(() =>
  [...items].sort((a, b) => parseDate(a.lastCount).getTime() - parseDate(b.lastCount).getTime()).slice(0, 10),
  [items]
);
```

A lógica existente de `finalizarContagem` (que move item pro fim e atualiza `lastCount` para hoje) continua funcionando — o `useMemo` re-ordena automaticamente.


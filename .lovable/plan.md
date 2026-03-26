

## Ajustar layout responsivo das colunas na Visao Geral

O layout atual usa larguras fixas em percentual (`w-[35%]`, `w-[25%]`, `w-[40%]`) que ficam apertadas em monitores menores. A solucao e usar `min-w` para garantir larguras minimas e `flex` para distribuir o espaco proporcionalmente.

### Alteracoes em `src/pages/VisaoGeral.tsx`

Substituir as larguras fixas por flex com min-width:

| Coluna | Atual | Novo |
|--------|-------|------|
| Esquerda (Kanbans) | `w-[35%]` | `flex-[35] min-w-[320px]` |
| Central (Detalhes) | `w-[25%]` | `flex-[25] min-w-[240px]` |
| Direita (Mapa) | `w-[40%]` | `flex-[40] min-w-[350px]` |

- As proporcoes se mantem em telas grandes (flex ratios 35:25:40)
- Em telas menores, os min-widths impedem que as colunas fiquem ilegíveis
- O container pai ja tem `overflow-hidden`, entao scroll horizontal nao aparece — as colunas comprimem proporcionalmente ate o min-w

Tambem reduzir o padding interno das colunas de `p-3` para `p-2` para ganhar espaco em telas menores.


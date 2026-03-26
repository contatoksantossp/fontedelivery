

## Tornar PedidoCard responsivo em telas menores

### Problema
Nas screenshots, os cards de pedido estão com os botões cortados e o valor (R$) quebrando em duas linhas. Os botões "Cancelar", "Editar" e "Pronto" não cabem na mesma linha que o preço quando a coluna é estreita.

### Solução

**Arquivo:** `src/components/visao-geral/PedidoCard.tsx`

1. **Área de preço + botões (linha 102-165):** Mudar o layout de `flex items-center justify-between` para empilhar verticalmente — preço em cima, botões embaixo com `flex-wrap` para que quebrem graciosamente quando o espaço é limitado.

2. **Botões de ação:** Adicionar `flex-wrap` ao container dos botões para que se reorganizem em múltiplas linhas se necessário, em vez de serem cortados.

3. **Rastreio (PedidoRastreio):** Verificar que o componente de rastreio já usa `w-full` e `flex-1` (já está ok).

### Mudanças técnicas

```
Linha 102: trocar layout para flex-col em vez de flex row
  - "flex items-center justify-between mt-3"
  → "flex flex-col gap-2 mt-3"

Linha 107: adicionar flex-wrap nos botões
  - "flex gap-1.5"
  → "flex flex-wrap gap-1.5"
```

Isso fará o preço ficar em sua própria linha e os botões abaixo dele, com wrap automático quando não couberem lado a lado.


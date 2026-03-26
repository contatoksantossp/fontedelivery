

## Redesign do VarianteCard para parecer com o ProdutoPaiCard

### Mudança
Redesenhar o `VarianteCard` para ter layout similar ao card pai: imagem quadrada (1:1) no topo, nome e preço abaixo, e botões edit/delete discretos embaixo.

### Arquivo: `src/components/catalogo/VarianteCard.tsx`

- Imagem: trocar `h-16 w-full` por `aspect-square w-full` para ficar 1:1
- Remover EAN e tags da visualização do card (manter compacto)
- Layout vertical: imagem → nome → preço → botões
- Botões menores como ícones (`h-6 w-6`) centralizados, sem texto "Editar"
- Manter `min-w-[140px]` para caber no scroll horizontal

```text
┌─────────────┐
│             │
│  [foto 1:1] │
│             │
├─────────────┤
│ Nome        │
│ R$ X,XX     │
│  [✎] [🗑]  │
└─────────────┘
```


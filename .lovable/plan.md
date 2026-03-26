

## Card de Produto 1:1 + Grade 4 colunas

### Mudanças

**1. `src/components/pdv/ProdutoCard.tsx`**
- Trocar imagem fixa `h-24` por `aspect-square` (1:1) usando classe CSS
- Manter nome e preço abaixo da imagem, expandindo o card para baixo

**2. `src/components/pdv/Vitrine.tsx`**
- Alterar grid de `grid-cols-3` para `grid-cols-4` na grade principal de produtos

**3. `src/components/pdv/KitSlotDrawer.tsx`**
- Alterar grid interno de `grid-cols-3` para `grid-cols-4` para consistência

### Detalhe técnico

```tsx
// ProdutoCard — imagem 1:1
<img
  src={produto.foto || "/placeholder.svg"}
  alt={produto.nome}
  className="w-full aspect-square object-cover"
/>
```

```tsx
// Vitrine.tsx & KitSlotDrawer.tsx — grid 4 colunas
<div className="grid grid-cols-4 gap-2">
```


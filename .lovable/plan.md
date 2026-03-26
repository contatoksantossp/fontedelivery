

## Redesign da visualizacao de produtos no Catalogo

### O que muda

**1. Cards de Categoria maiores** (`CategoriaCard.tsx`)
- Container: `w-20` → `w-24`
- Imagem: `h-14 w-14` → `h-16 w-16`
- Texto: `text-[10px]` → `text-[11px]`
- Botoes de hover tambem ligeiramente maiores

**2. Produto em lista vertical** (`ProdutoPaiCard.tsx`)
- Redesign completo: de card com imagem aspect-square para linha horizontal compacta
- Linha fechada: imagem 48x48 a esquerda + nome + preco minimo a direita + chevron
- Estrela de destaque visivel na linha fechada (ao lado do nome)
- Ao expandir: area abaixo com descricao, botoes de acao (estrela toggle, editar, excluir), e variantes em scroll horizontal
- Toda funcionalidade CRUD mantida

```text
┌──────────────────────────────────────────────┐
│ [img48] Nome do Produto    ★   R$ X,XX    ▼ │
├──────────────────────────────────────────────┤
│ Descricao do produto...    [★] [✎] [🗑]     │
│ Variantes (3):                                │
│ [var1] [var2] [var3] ──────────────────────>  │
└──────────────────────────────────────────────┘
```

**3. Layout no Catalogo.tsx**
- Trocar `grid grid-cols-2 sm:grid-cols-3...gap-3` por `flex flex-col gap-2`
- Produtos agora empilham verticalmente como uma lista

### Arquivos editados
- `src/components/catalogo/CategoriaCard.tsx` — dimensoes maiores
- `src/components/catalogo/ProdutoPaiCard.tsx` — redesign para linha horizontal com expansao
- `src/pages/Catalogo.tsx` — grid → lista vertical (linha 212)


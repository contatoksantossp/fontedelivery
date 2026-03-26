

## Ajustes visuais no Catálogo

### 1. Cards de Categoria maiores — `src/components/catalogo/CategoriaCard.tsx`
- Container: `w-24` → `w-[140px]`, `p-1.5` → `p-2`
- Imagem: `h-16 w-16` → `aspect-square w-full rounded-lg`
- Texto: `text-[11px]` → `text-xs`

### 2. Subcategorias em pílula maior — `src/components/catalogo/SubcategoriaCard.tsx`
- Manter formato pill horizontal (`rounded-full`)
- Imagem: `h-6 w-6` → `h-8 w-8`
- Texto: `text-[11px]` → `text-xs`
- Padding: `px-2 py-1` → `px-3 py-1.5`
- Gap: `gap-1.5` → `gap-2`
- Botões hover: `h-5 w-5` → `h-6 w-6`, ícones `h-2.5` → `h-3`

### 3. Botões "+ Nova/Novo" com mais destaque — `src/pages/Catalogo.tsx`
- Trocar `variant="ghost"` por `variant="outline"` nos 3 botões de adicionar (categorias, subcategorias, produtos)
- Adicionar classe `border-dashed`

### Arquivos editados
- `src/components/catalogo/CategoriaCard.tsx`
- `src/components/catalogo/SubcategoriaCard.tsx`
- `src/pages/Catalogo.tsx`


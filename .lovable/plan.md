

## Redesign do Catalogo para visual estilo PDV

### Objetivo
Reduzir os cards de categoria/subcategoria, exibir produtos em grid com cards compactos (como o PDV), e adicionar barra de busca no topo. Fluxo visual: Categoria > Subcategoria > Produtos em grid.

### Mudancas

**1. Barra de busca no topo (como Vitrine.tsx)**
- Adicionar estado `busca` no `Catalogo.tsx`
- Renderizar input com icone Search acima das categorias
- Filtrar produtos pelo nome, descricao ou tags das variantes

**2. CategoriaCard compacto (estilo PDV: w-20, imagem 10x10, texto 10px)**
- Reduzir de `min-w-[200px]` com imagem h-24 para `w-20` com imagem `h-10`
- Layout: coluna vertical, imagem pequena + nome truncado abaixo
- Botoes edit/delete: mostrar apenas no hover com overlay ou dropdown
- Badge "Inativo" vira um dot/indicador sutil

**3. SubcategoriaCard compacto (estilo pilulas do PDV)**
- Reduzir de `min-w-[160px]` com gap-3 para pilula compacta: `px-2 py-0.5`
- Imagem `h-6 w-6` rounded-full + texto `text-[11px]`
- Botoes edit/delete: aparecem no hover

**4. ProdutoPaiCard em grid (estilo ProdutoCard do PDV)**
- Trocar layout de lista vertical (imagem 80x80 + texto ao lado) para grid de cards
- Card: imagem aspect-square no topo + nome + preco minimo abaixo
- Grid de 4-5 colunas
- Ao clicar no card, expande inline mostrando variantes + botoes edit/delete/destaque
- Manter funcionalidade CRUD existente

**5. Botoes "Nova Categoria/Subcategoria/Produto"**
- Manter como botoes pequenos ao lado dos titulos de secao

### Arquivos editados
- `src/components/catalogo/CategoriaCard.tsx` - redesign compacto
- `src/components/catalogo/SubcategoriaCard.tsx` - redesign pilula
- `src/components/catalogo/ProdutoPaiCard.tsx` - redesign grid card com expansao
- `src/pages/Catalogo.tsx` - adicionar busca, mudar layout para grid nos produtos


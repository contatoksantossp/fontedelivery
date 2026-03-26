

## Tornar cards clicáveis para adicionar ao carrinho (remover botão +)

Atualmente os cards de variante no `VarianteDrawer` e no `KitSlotDrawer` usam um botão `+` pequeno para adicionar. Vamos mover o gatilho para o card inteiro.

### 1. `src/components/pdv/VarianteDrawer.tsx`
- Transformar o `<div>` de cada variante em `<button>` clicável com `onClick={() => onAddVariante(produto, v, quantidade)}`
- Adicionar `hover:bg-secondary cursor-pointer transition-colors`
- Remover o `<Button>` com ícone `<Plus>` (linhas 40-50)
- Manter preço e nome, layout fica mais limpo

### 2. `src/components/pdv/KitSlotDrawer.tsx`
- Mesmo padrão no sub-drawer de variantes (linhas 134-152): transformar `<div>` em `<button>` clicável
- Remover o `<Button>` com `<Plus>` (linhas 144-149)
- Adicionar `hover:bg-secondary cursor-pointer transition-colors`

### Arquivos editados
- `src/components/pdv/VarianteDrawer.tsx`
- `src/components/pdv/KitSlotDrawer.tsx`




## Modulo 5: Catalogo — Plano de Implementacao

### Arquivos

```text
src/pages/Catalogo.tsx                         — Pagina principal (cascata: categorias > subcategorias > produtos)
src/components/catalogo/
  mockCatalogoData.ts                          — Dados mock estendidos (categorias, subcategorias, produtos com variantes completas, kits)
  CategoriaCard.tsx                            — Card grande de categoria (foto, nome, editar, excluir)
  SubcategoriaCard.tsx                         — Card pilula de subcategoria
  ProdutoPaiCard.tsx                           — Card de produto pai com variantes horizontais
  VarianteCard.tsx                             — Card menor de variante individual
  CategoriaDialog.tsx                          — Dialog para criar/editar categoria
  SubcategoriaDialog.tsx                       — Dialog para criar/editar subcategoria
  ProdutoDialog.tsx                            — Dialog para criar/editar produto + variantes
  KitComboDialog.tsx                           — Dialog para criar/editar kit/combo com slots de subcategorias
  KitComboCard.tsx                             — Card de kit/combo na aba separada
```

Atualizar `src/App.tsx` para trocar o placeholder `/catalogo` pelo novo componente.

---

### 1. Mock Data (`mockCatalogoData.ts`)

Interfaces estendidas do PDV com campos adicionais para gestao:

- **CatalogCategoria**: id, nome, descricao, imagem (placeholder URL), ativo (boolean)
- **CatalogSubcategoria**: id, nome, descricao, imagem, ativo, categoriaId
- **CatalogProduto**: id, nome, descricao, foto, destaque (boolean), subcategoriaId, categoriaId
- **CatalogVariante**: id, nome, descricao, foto, tags[], sku, custo, valorVenda, estoqueMinimo, produtoId
- **KitCombo**: id, nome, imagem, ativo, tipo ("kit"|"combo"), tipoDesconto ("%"|"R$"), valorDesconto, subcategoriaVinculo, slots[] (cada slot = subcategoriaId + nome)

Dados mock: reutilizar as 5 categorias do PDV, expandir com campos extras. ~8 produtos com 2-3 variantes cada. 2 kits mock.

---

### 2. Layout da Pagina (`Catalogo.tsx`)

Sidebar colapsada via `useSidebar`. Pagina unica fluida com navegacao em cascata:

- **Nivel 1 — Categorias**: Rolagem horizontal de `CategoriaCard`s grandes + botao "Nova Categoria"
- **Nivel 2 — Subcategorias**: Aparece abaixo ao clicar categoria. Rolagem horizontal de pilulas `SubcategoriaCard` + botao "Nova Subcategoria"
- **Nivel 3 — Produtos**: Aparece abaixo ao clicar subcategoria. Lista vertical de `ProdutoPaiCard` com variantes em rolagem horizontal. Botao "Adicionar Novo Produto" fixo no topo.
- **Aba separada (Tabs)**: Toggle "Produtos" / "Kits e Combos" no topo da pagina. A aba Kits exibe cards de kits/combos com filtros Kit/Combo.

Estado: `selectedCategoriaId`, `selectedSubcategoriaId`, `categorias[]`, `produtos[]`, `kits[]`, etc.

---

### 3. Componentes

**CategoriaCard**: Card grande com imagem placeholder, nome, botoes "Editar" e "Excluir". Clicavel para selecionar e revelar subcategorias.

**SubcategoriaCard**: Pilula horizontal com icone/foto e nome. Botoes editar/excluir. Clicavel para revelar produtos.

**ProdutoPaiCard**: Card maior com foto, nome, descricao, estrela de destaque (toggle), botoes editar/excluir. Variantes rolam horizontalmente ao lado/abaixo.

**VarianteCard**: Card menor com foto, nome, preco, SKU. Botoes editar/excluir proprios.

**CategoriaDialog / SubcategoriaDialog**: Dialog com campos de imagem (input URL), nome, descricao, status ativo/inativo (Switch).

**ProdutoDialog**: Dialog com duas secoes — produto pai (foto, nome, descricao) e secao de variantes abaixo (foto, nome, tags, SKU, custo, valor venda, estoque minimo). Botao "+ Variante" para adicionar linhas.

**KitComboDialog**: Dialog com nome, imagem, status, tipo de desconto e valor. Seletor de subcategoria vinculo. Secao de slots onde cada slot aponta para uma subcategoria (Select).

**KitComboCard**: Card com nome, imagem, tipo (badge), desconto, status. Botoes editar/excluir.

---

### 4. Interacoes (Frontend Only)

- Clicar categoria revela subcategorias (scroll horizontal)
- Clicar subcategoria revela produtos (scroll vertical)
- CRUD completo via dialogs: criar, editar, excluir (com confirmacao AlertDialog)
- Estrela de destaque toggle no produto pai
- Excluir com AlertDialog de confirmacao
- Aba Kits/Combos com filtro toggle
- Todos os estados via useState local, CRUD opera sobre arrays em memoria

---

### Detalhes Tecnicos

- Reutilizar `ScrollArea`, `Dialog`, `AlertDialog`, `Button`, `Input`, `Switch`, `Select`, `Badge`, `Tabs` do shadcn
- Categorias: `flex overflow-x-auto gap-4` com cards ~200px largura
- Subcategorias: `flex overflow-x-auto gap-2` com pilulas `rounded-full`
- Variantes: `flex overflow-x-auto gap-3` dentro do card do produto pai
- Animacao de cascata: transicao suave ao revelar niveis (CSS transition ou condicional render)
- Nenhuma dependencia nova necessaria


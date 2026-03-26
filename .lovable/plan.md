

## Reformulacao Completa do PDV

### Resumo

Redesenhar as 3 areas do PDV: cards da fila compactos com icones de pagamento e endereco colapsavel, vitrine com categorias/subcategorias visuais (imagens) e produtos pai grandes com gaveta inline de variantes, e sistema de combo por slots no rodape.

### Arquivos e Mudancas

**1. `src/components/pdv/mockPdvData.ts`**
- Adicionar `foto?: string` nas interfaces `Produto`, `Variante`, `Categoria`, `Subcategoria` (usar `/placeholder.svg` em todos)
- Adicionar `endereco?: string` na interface `PedidoFila` (endereco formatado para exibicao no card)
- Preencher `endereco` nos pedidos mock que tem `modalidade === "entrega"` (ex: "Rua das Flores, 123 - Centro")
- Preencher `foto` em todas as categorias, subcategorias, produtos e variantes mock

**2. `src/components/pdv/FilaPedidoCard.tsx`** — Layout compacto 4 linhas
- L1: `pedido.codigo` + Badge canal (mantém)
- L2: `pedido.cliente` + icone modalidade (Truck ou MapPin)
- L3: Endereco se `modalidade === "entrega"` e `pedido.endereco` existe — senao colapsa (nao renderiza)
- L4: `R$ valor` + icones das formas de pagamento (iterar `pedido.pagamentos`, mapear metodo para icone: `Banknote`=dinheiro, `QrCode`=pix/qr, `CreditCard`=cartao_credito/cartao_debito)
- Reduzir padding de `p-3` para `p-2`, remover `mt-2` e `mb-1` extras

**3. `src/components/pdv/Vitrine.tsx`** — Categorias e subcategorias visuais
- **Categorias**: Substituir pills por cards em scroll horizontal com imagem da categoria em cima (h-10 rounded) e nome embaixo (text-[10px]). Card selecionado com borda primary
- **Subcategorias**: Substituir pills por pilulas maiores com foto da subcategoria a esquerda (h-6 w-6 rounded-full) e nome a direita, scroll horizontal
- **Grid**: Manter `grid-cols-3` mas usar `ProdutoCard` reformulado (card grande)
- **Gaveta de variantes inline**: O grid precisa iterar os produtos e, apos o produto expandido, inserir um elemento `col-span-3` com as variantes. Controlar via estado `expandedProductId`
- **Combo slots no rodape**: Quando a subcategoria selecionada tiver kit/combo (verificar se algum produto da subcategoria tem `comboConfig`), mostrar `ComboSlots` no rodape. Slot 1 e a grade principal; slots 2+ aparecem como linhas com mini-lista de produtos

**4. `src/components/pdv/ProdutoCard.tsx`** — Reescrever
- Card grande: imagem em cima (`h-24 w-full object-cover rounded-t-lg`), nome embaixo, valor minimo (`Math.min(...variantes.map(v => v.preco))`) com prefixo "a partir de" se tem multiplas variantes
- Click: se 1 variante, chama `onAddVariante(produto, variante, qty)` direto. Se multiplas, chama `onExpand(produto.id)` (toggle)
- Visual de "expandido" com borda primary
- Remover Collapsible — a gaveta e gerenciada pelo pai (Vitrine)

**5. `src/components/pdv/VarianteDrawer.tsx`** — Novo componente
- Renderizado no grid como `col-span-3` (ou `col-span-full`)
- Cards de variante em flex horizontal com scroll: foto em cima (h-16), nome, preco, botao "+" para adicionar
- Props: `produto: Produto`, `quantidade: number`, `onAddVariante: (produto, variante, qty) => void`, `onClose: () => void`

**6. `src/components/pdv/ComboSlots.tsx`** — Atualizar
- Slot 1 nao aparece no rodape (e a grade principal acima)
- Slots 2+ aparecem como linhas no rodape: titulo do slot, mini-grid de produtos filtrados por subcategoria do combo
- Quando todos os slots preenchidos, exibir badge de desconto aplicado
- Se nao ha combo ativo, componente retorna null

### Detalhes Tecnicos

- Para a gaveta inline no grid: na Vitrine, ao iterar `produtosFiltrados`, apos cada produto verificar se `expandedProductId === produto.id`, e se sim inserir `<VarianteDrawer>` com `col-span-3`. Isso faz a gaveta aparecer na linha imediatamente abaixo do card clicado
- Icones de pagamento no FilaPedidoCard: criar um map `{ dinheiro: Banknote, pix: QrCode, qr: QrCode, cartao_credito: CreditCard, cartao_debito: CreditCard }` e usar `Set` para deduplicar icones quando multiplos pagamentos usam o mesmo tipo
- Endereco no PedidoFila: buscar do cliente mock concatenando rua + bairro para popular o campo nos dados mock


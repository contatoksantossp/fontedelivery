

## Modulo 4: PDV (Ponto de Venda) — Plano de Implementacao

### Arquivos

```text
src/pages/PDV.tsx                              — Pagina principal (layout 3 colunas: 20/50/30)
src/components/pdv/
  mockPdvData.ts                               — Produtos, categorias, clientes mock
  FilaPedidos.tsx                               — Coluna esquerda: lista de pedidos pendentes
  FilaPedidoCard.tsx                            — Card individual na fila
  Vitrine.tsx                                   — Coluna central: busca + categorias + grid de produtos
  ProdutoCard.tsx                               — Card de produto na grade (com drawer de variantes)
  ComboSlots.tsx                                — Rodape da vitrine: slots de combo/kit
  Carrinho.tsx                                  — Coluna direita: sistema de abas (3 passos)
  AbaIdentificacao.tsx                          — Aba 1: canal, cliente, modalidade, endereco
  AbaCarrinho.tsx                               — Aba 2: itens do pedido, qty, remocao
  AbaPagamentos.tsx                             — Aba 3: multi-pagamento, troco, finalizacao
```

Atualizar `src/App.tsx` para trocar o placeholder `/pdv` pelo novo componente.

---

### 1. Mock Data (`mockPdvData.ts`)

**Categorias**: ~5 categorias (Lanches, Bebidas, Acai, Pizzas, Combos) com subcategorias.

**Produtos**: ~15 produtos com interface:
- `id`, `nome`, `preco`, `categoriaId`, `subcategoriaId`, `imagem?`, `codigoBarras?`
- `variantes[]`: array de `{ id, nome, preco }`. Se length === 1, adicao direta.
- `comboConfig?`: `{ slots: number, desconto: number }` para kits.

**Clientes mock**: ~4 clientes com nome, telefone, apelido, enderecos[].

**Pedidos pendentes**: Reutilizar 2-3 do `pedidosMock` existente para popular a fila esquerda.

---

### 2. Layout da Pagina (`PDV.tsx`)

Mesmo pattern: sidebar colapsada via `useSidebar`, layout flex 3 colunas (20%-50%-30%).

Estado principal:
- `filaPedidos[]` — pedidos pendentes na fila
- `selectedPedidoId` — pedido carregado para edicao
- `carrinho: ItemCarrinho[]` — itens do pedido atual
- `activeTab: "identificacao" | "carrinho" | "pagamentos"`
- `clienteSelecionado`, `modalidade`, `canalVenda`, `pagamentos[]`

---

### 3. Componentes

**FilaPedidos + FilaPedidoCard**: Lista vertical scrollavel com cards mostrando codigo, cliente, valor, modalidade, hora. Clicar carrega o pedido no carrinho da coluna direita.

**Vitrine**: 
- Topo: Input de busca + seletor de quantidade (counter +/-).
- Abaixo: Categorias como pilulas horizontais (`overflow-x-auto`). Subcategorias aparecem ao selecionar uma categoria.
- Grid de produtos: Cards em grid responsivo (3-4 colunas). Cada `ProdutoCard` mostra nome e preco.
- Clique com 1 variante: adiciona direto ao carrinho com qty selecionada.
- Clique com multiplas variantes: expande drawer inline abaixo do card mostrando variantes.

**ComboSlots**: Rodape condicional da vitrine. Aparece se a subcategoria selecionada tem kit/combo. Exibe linhas de slots (Slot 2, Slot 3) com produtos clicaveis. Quando todos slots preenchidos, aplica desconto automatico no carrinho.

**Carrinho (3 abas)**:
- Header fixo com 3 botoes [1. Identificacao] [2. Carrinho] [3. Pagamentos], aba ativa com destaque.
- **AbaIdentificacao**: Botoes de canal (Balcao, WhatsApp, 99, iFood, App). Campo localizador condicional (99/iFood). Busca de cliente com resultados + botao "Novo Cliente". Modalidade (Entrega/Retirada). Lista de enderecos se entrega. Botao "Proximo".
- **AbaCarrinho**: Lista de itens com +/- quantidade e lixeira. Estado vazio com placeholder. Logica de combo: remover item de kit desfaz desconto. Botao "Proximo".
- **AbaPagamentos**: Demonstrativo (subtotal, desconto, taxa, total). Indicador "Falta R$ X". Botoes de fracao (1/3, Metade, Total). Input de valor + botoes de metodo (Dinheiro, Pix, Cartao, QR). Lista de pagamentos adicionados. Logica de troco para dinheiro. Regras de excedente (gorjeta) e faltante (desconto). Botao "Finalizar Pedido".

---

### 4. Interacoes (Frontend Only)

- Clicar card na fila carrega pedido existente no carrinho
- Busca filtra produtos por nome/codigo
- Categorias/subcategorias filtram a grade
- Quantidade pre-selecionada no topo define qty ao adicionar
- Drawer inline de variantes expande/colapsa abaixo do card
- Combo: slots preenchidos aplicam desconto automatico
- Remover item de combo desfaz desconto
- Navegacao entre abas via botoes ou "Proximo"
- Multi-pagamento: soma parcial atualiza "Falta" em tempo real
- Dinheiro: dialog de troco com atalhos (+2, +5, +50)
- Finalizar: verifica excedente/faltante, salva e limpa carrinho
- Todos os estados via useState local

---

### Detalhes Tecnicos

- Reutilizar `ScrollArea`, `Tabs`, `Select`, `Dialog`, `Button`, `Input`, `Badge` do shadcn
- Grid de produtos: `grid grid-cols-3 gap-3` (ou `grid-cols-4` se couber)
- Drawer de variantes: `Collapsible` do shadcn com animacao
- Pilulas de categoria: `flex overflow-x-auto gap-2` com botoes `rounded-full`
- Canais de venda: botoes com icones, estilo toggle group
- Cores: canal ativo `bg-primary text-primary-foreground`, inativo `bg-muted`
- Nenhuma dependencia nova necessaria


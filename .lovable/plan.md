

## Novo fluxo de adição de produto no Kit/Combo

### Resumo da mudança

Hoje, quando há kit ativo, clicar num produto do grid **não adiciona ao carrinho** — apenas preenche o Slot 1 internamente. O novo fluxo:

1. Clicar num produto **sempre adiciona ao carrinho com preço integral** (mesmo com kit ativo)
2. O Slot 1 do kit é preenchido simultaneamente (tracking interno)
3. Ao completar todos os slots e finalizar o kit, os itens dos slots 2+ são adicionados ao carrinho E os itens do slot 1 **já no carrinho** têm o preço atualizado para refletir o desconto

### Mudanças por arquivo

**1. `src/components/pdv/Vitrine.tsx`**
- `handleAddVariante`: sempre chamar `onAddItem(produto, variante, qty)` com preço integral, independente de kit ativo
- Quando kit ativo, também registrar no `slotSelections[slot1Id]` para tracking
- `handleFinalizarKit`: ao finalizar, enviar itens dos slots 2+ ao carrinho com desconto, e chamar novo callback `onUpdateComboDiscount` para atualizar preços dos itens do slot 1 já no carrinho
- Nova prop: `onUpdateItemPrice` (recebe produtoId + varianteId + novo preço)

**2. `src/pages/PDV.tsx`**
- Novo handler `handleUpdateItemPrice(produtoId, varianteId, novoPreco)`: encontra o item no carrinho pelo produtoId+varianteId e atualiza o preço
- Passar como prop para `<Vitrine>`
- Alterar a interface de `Vitrine` para aceitar `onUpdateItemPrice`

### Fluxo detalhado

```text
Usuário clica produto na grade (kit ativo):
  → Item adicionado ao carrinho (preço integral) ✓
  → Slot 1 registra {produto, variante, qty}

Usuário preenche slots 2, 3...:
  → Apenas tracking interno (sem carrinho)

Usuário clica "Adicionar Kit ao carrinho":
  → Itens dos slots 2+ adicionados ao carrinho COM desconto
  → Itens do slot 1 no carrinho: preço ATUALIZADO para preço com desconto
  → Limpa slotSelections
```

### Detalhe técnico do desconto

- Se `tipoDesconto === "%"`: `precoNovo = preco * (1 - valorDesconto/100)`
- Se `tipoDesconto === "R$"`: distribui proporcionalmente entre todos os itens de todos os slots


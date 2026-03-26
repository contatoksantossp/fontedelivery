

## Reestruturação do Kit/Combo no PDV

### Resumo

Substituir o sistema atual (produto-combo com `comboConfig` embutido) por um sistema baseado na estrutura de `KitCombo` do catálogo, onde kits são vinculados a subcategorias. Ao entrar numa subcategoria com kit disponível, aparece um banner informativo e gavetas de slots no rodapé da vitrine.

### Como funciona hoje (será removido)

- Produtos `p19` e `p20` no mock têm `comboConfig: { slots, desconto }`
- Ao clicar num produto-combo, abre o fluxo de slots no `ComboSlots.tsx`
- A lógica fica toda dentro do `handleAddVariante` da Vitrine

### Como vai funcionar

1. Ao selecionar uma subcategoria, a Vitrine verifica se existe um `KitCombo` vinculado a ela (via `subcategoriaVinculo`)
2. Se sim, exibe um banner abaixo das subcategorias: "Kit/Combo disponível nessa subcategoria"
3. Os produtos da subcategoria atual funcionam como **Slot 1** - o usuário seleciona normalmente (podem selecionar quantos quiser)
4. No rodapé da vitrine, aparecem gavetas colapsáveis para os **Slots 2, 3, etc.** (cada slot vinculado a uma subcategoria diferente)
5. Cada gaveta minimizada vira uma linha com nome do slot e status; ao clicar, expande mostrando os produtos daquela subcategoria
6. Dentro da gaveta, cards de produtos pai mostram foto + nome + "a partir de R$X"; ao clicar num produto pai, abre sub-gaveta com variantes
7. Quando todos os slots têm ao menos um item, o desconto é aplicado aos itens ao enviar pro carrinho

### Mudanças por arquivo

**1. `src/components/pdv/mockPdvData.ts`**
- Importar `kitCombosMock` do catálogo (ou duplicar a estrutura de KitCombo)
- Exportar array `kitCombosPdv` com a mesma estrutura do catálogo (`KitCombo` com slots vinculados a subcategorias)
- Remover produtos `p19` (Kit Churrasco) e `p20` (Combo Happy Hour) — não são mais produtos
- Remover `ComboConfig` interface e `comboConfig` do `Produto`

**2. `src/components/pdv/Vitrine.tsx`** (refatoração principal)
- Importar `kitCombosPdv` e buscar kit ativo: `kitCombosPdv.find(k => k.subcategoriaVinculo === subcategoriaId)`
- Estado novo: `kitAtivo` (o KitCombo encontrado ou null), `slotSelections` (Record por slot id com array de `{produto, variante}[]`), `slotExpandido` (id do slot com gaveta aberta)
- Remover estados `comboSlots` e `activeCombo`
- Após subcategorias e antes do grid, renderizar banner condicional
- Grid de produtos: filtra produtos normais (sem comboConfig), click funciona normalmente (slot 1 = grade principal)
- No rodapé (antes do fim do componente): renderizar `<KitSlotDrawer>` para cada slot do kit (exceto slot 0 que é a grade principal)
- Ao adicionar item no carrinho: se kit ativo e todos slots preenchidos, aplicar desconto
- Refatorar `handleAddVariante` para não ter lógica de combo antigo

**3. `src/components/pdv/KitSlotDrawer.tsx`** (novo componente)
- Props: `slot` (KitComboSlot), `expanded`, `onToggle`, `selections` (itens selecionados), `onAddItem`, `onRemoveItem`
- Minimizado: linha com nome do slot, badge com contagem de itens, chevron
- Expandido: grid de produtos pai da subcategoria do slot
- Cada produto pai: card com foto, nome, preço "a partir de"
- Ao clicar num produto pai: expande sub-gaveta inline (mesma lógica do `VarianteDrawer` atual) mostrando variantes
- Ao selecionar variante: adiciona à lista de seleções do slot

**4. `src/components/pdv/KitBanner.tsx`** (novo componente)
- Simples: ícone + texto "Kit/Combo disponível nessa subcategoria" + nome do kit + badge de desconto
- Fundo sutil (bg-primary/5 border-primary/20)

**5. `src/components/pdv/ComboSlots.tsx`** (remover)
- Substituído pelo sistema de gavetas

**6. `src/components/pdv/ProdutoCard.tsx`**
- Remover referência a `comboConfig` e badge de combo (não existe mais no nível do produto)

**7. `src/pages/PDV.tsx`**
- Atualizar `onAddItem` signature: receber flag opcional de desconto combo ou `comboGrupoId`
- Quando a Vitrine finaliza um kit completo, enviar todos os itens ao carrinho com desconto aplicado no preço

### Layout visual (rodapé da Vitrine com gavetas)

```text
┌─────────────────────────────────────────┐
│  [Busca] [Qty +-]                       │
│  [Cat1] [Cat2] [Cat3] [Cat4] [Cat5]     │
│  [Sub1] [Sub2] [Sub3] [Sub4]            │
│  ┌─ Kit/Combo disponível ─────────────┐ │
│  │ 🎁 Kit Churrasco • -10%           │ │
│  └────────────────────────────────────┘ │
│  ┌──────┐ ┌──────┐ ┌──────┐            │
│  │Prod 1│ │Prod 2│ │Prod 3│  ← Slot 1  │
│  │      │ │      │ │      │  (grade)    │
│  └──────┘ └──────┘ └──────┘            │
│                                         │
├─ Slot 2: Cerveja (2 itens) ─────── ▼ ──┤
│  ┌──────┐ ┌──────┐ ┌──────┐            │
│  │Skol  │ │Heink │ │Brahma│            │
│  └──────┘ └──────┘ └──────┘            │
│    └─ [Lata 350ml R$4.50] [+]          │
├─ Slot 3: Refrigerante (0 itens) ── ▶ ──┤  ← minimizado
└─────────────────────────────────────────┘
```

### Detalhes técnicos

- `KitCombo` do catálogo tem `slots[0]` com a mesma subcategoria do `subcategoriaVinculo` — esse é o slot 1 (grade principal), gavetas começam do slot index 1+
- Desconto aplicado: se `tipoDesconto === "%"` → cada item recebe `preco * (1 - valorDesconto/100)`; se `"R$"` → distribui proporcionalmente ou aplica como desconto fixo no total do grupo
- Itens enviados ao carrinho com `comboGrupoId` para agrupar visualmente


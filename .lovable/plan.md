

## Redesign AbaPagamentos.tsx

Rewrite the component following the reference image layout, top to bottom:

### New layout order

1. **Total** — large, right-aligned `text-lg font-bold` with label "Total" on the left
2. **Pagamentos list** — label "PAGAMENTOS" uppercase, each row: icon + method name + value + X button
3. **Falta** — label "FALTA:" left, value right in `text-orange-500 font-bold`
4. **Fraction buttons** — "Total", "Metade" in a row (matching image shows 2 buttons, but user spec says 3 including 1/3)
5. **Value input** — `R$ X.XX` styled input
6. **Payment method buttons** — `grid-cols-5` compact buttons (Dinheiro, PIX, Cartão Créd, Cartão Déb, QR Code) with small icons `h-3.5` and `text-[9px]`
7. **Troco inline** — when Dinheiro selected and value entered, show "TROCO PARA:" with shortcuts R$10, R$20, R$50, R$100 and calculated change amount
8. **"+ Lançar Valor"** button — orange/primary, full width
9. **"Finalizar Pedido"** — fixed at bottom, enabled when falta <= 0

### Technical changes

- **Remove** the `Dialog` for troco — replace with inline troco section
- **Remove** `showTrocoDialog` and `valorDinheiro` state — handle dinheiro inline like other methods, adding troco calculation directly
- **Change** `handleAdicionar` to handle dinheiro inline (calculate troco = max(0, valor - falta), add payment directly)
- **Grid** metodos from `grid-cols-3` to `grid-cols-5`, padding `p-1.5`, icon size `h-3.5 w-3.5`, text `text-[9px]`
- **Move** pagamentos list to top of scroll area, right after Total display
- **Rename** button text to `+ Lançar Valor`
- **Remove** Dialog import since it's no longer needed

### File
- `src/components/pdv/AbaPagamentos.tsx` — full rewrite


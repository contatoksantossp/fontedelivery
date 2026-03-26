

## Alteracao no fluxo de pagamento do RotaAcerto

### Mudancas em `src/components/rotas/RotaAcerto.tsx`

**1. Fracoes baseadas no "falta" e nao no total**
- `handleFracao` passa a usar `falta` ao inves de `total`: `setValorInput((falta * frac).toFixed(2))`

**2. Metodos nao-dinheiro (PIX, Credito, Debito, QR)**
- Ao clicar no botao do metodo, se ja tem valor no input, lanca o pagamento automaticamente (chama `handleLancar` direto)
- Comportamento atual do "+ Lancar Valor" permanece como fallback

**3. Metodo Dinheiro — input de troco separado**
- Adicionar estado `trocoInput` para o valor do troco
- Quando "dinheiro" selecionado, aparece um segundo input "Troco recebido R$" abaixo dos botoes de metodo
- Botoes de atalho de troco: `+2`, `+5`, `+10`, `+20`, `+50` — cada clique **soma** o valor ao `trocoInput` (nao substitui)
- O troco calculado = `parseFloat(trocoInput) - valorInput` (ou 0 se negativo)
- Ao clicar "+ Lancar Valor" com dinheiro, registra o pagamento com `valor = min(valorInput, falta)` e `troco = trocoCalculado`
- Resetar `trocoInput` ao lancar

**4. Limpeza**
- Remover os antigos botoes de troco `R$10, R$20, R$50, R$100` que substituiam o valor do input
- Substituir por novos botoes `+2, +5, +10, +20, +50` que somam ao input de troco

### Arquivo editado
- `src/components/rotas/RotaAcerto.tsx`


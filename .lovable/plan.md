

## Alteracao no fluxo de pagamento do AbaPagamentos (PDV)

Aplicar as mesmas melhorias ja feitas no RotaAcerto ao componente do PDV.

### Mudancas em `src/components/pdv/AbaPagamentos.tsx`

**1. Fracoes baseadas no "falta"**
- Linha 49: `handleFracao` usa `falta` em vez de `total`

**2. Metodos nao-dinheiro auto-lancam**
- Ao clicar num botao de metodo (PIX, Credito, Debito, QR), se ja tem valor no input, lanca o pagamento automaticamente e limpa o input
- Dinheiro apenas seleciona o metodo sem lancar

**3. Troco com input separado e botoes incrementais**
- Substituir `trocoExtra` (numero) por `trocoInput` (string) — um input de texto para "Valor recebido R$"
- Substituir atalhos `[10, 20, 50, 100]` por `[2, 5, 10, 20, 50]` que **somam** ao `trocoInput`
- Troco calculado = `max(0, parseFloat(trocoInput) - valorNumerico)`
- Mostrar o input de troco + botoes apenas quando dinheiro selecionado e valor inserido

**4. Lancar valor com dinheiro**
- Registra `valor = min(valorInput, falta)` e `troco = trocoCalculado`
- Reseta `valorInput` e `trocoInput`

### Arquivo editado
- `src/components/pdv/AbaPagamentos.tsx`


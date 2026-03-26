

## Detalhamento por forma de pagamento no Caixa

### O que muda
Abaixo do grid de 4 cards (Fundo Inicial / Entradas / Saídas / Saldo Esperado), adicionar um botão colapsável "Detalhamento por forma de pagamento" que, ao expandir, mostra 4 mini-cards com os valores acumulados em Dinheiro, PIX, Cartão e QR Code.

### Dados
O `recebimentosPorMetodo` já existe no mock (`mockFinanceiroData.ts`) com `dinheiro`, `pix`, `cartao`, `qrcode`. Basta passá-lo como nova prop para `AbaCaixa`.

### Implementação

**`src/components/financeiro/AbaCaixa.tsx`**
- Adicionar prop `recebimentosPorMetodo: { dinheiro: number; pix: number; cartao: number; qrcode: number }`
- Adicionar estado `detalhesAberto` (boolean)
- Entre o grid de cards e os botões Sangria/Reforço, inserir um `Collapsible`:
  - Trigger: botão ghost com ChevronDown que rotaciona — texto "Detalhamento por forma de pagamento"
  - Content: grid 2x2 ou 4 colunas com cards para cada método (Dinheiro, PIX, Cartão, QR Code) usando `ValorOculto`

**`src/pages/Financeiro.tsx`**
- Passar `recebimentosPorMetodo` como prop para `AbaCaixa`

### Arquivos editados
- `src/components/financeiro/AbaCaixa.tsx`
- `src/pages/Financeiro.tsx`


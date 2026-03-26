

## Redesign do Acerto de Pagamentos por Parada (RotaAcerto)

### Conceito

Cada parada no acerto mostra inicialmente apenas: código + cliente + endereço + valor + botão "Dar Baixa". Se o pagamento voltou correto, basta dar baixa direto. Se houve divergência, o usuário clica em "Editar" para expandir um painel de multi-pagamentos abaixo dos dados do cliente — igual ao layout do PDV (referência da imagem).

### Mudanças

**1. `mockRotasData.ts` — Adicionar campos ao `Parada`**
- Adicionar `desconto?: number` e `pagamentos?: { id: string; metodo: string; valor: number; troco?: number }[]` à interface `Parada`
- Preencher mock data com pagamento inicial baseado no `formaPagamento` e `totalPedido` existentes

**2. `RotaAcerto.tsx` — Redesign completo do `ParadaAcertoItem`**

Estado colapsado (default):
- Código + cliente + endereço (esquerda), valor total (direita)
- Linha com: tag do pagamento original (ex: "Cartão R$ 134,80") + botão "Dar Baixa" + botão "Editar" (ícone lápis)
- Quando `baixaRealizada`, card fica cinza/opaco, botões desabilitados

Estado expandido (ao clicar "Editar"):
- Expande abaixo do cabeçalho com:
  1. **Pagamentos adicionados** — lista com ícone + método + valor + botão X remover
  2. **Resumo**: Subtotal, Desconto, Taxa, **Total** (destaque), **Falta** (laranja)
  3. **Botões fração**: "1/3", "Total", "Metade"
  4. **Input R$** + **5 botões de método** numa linha (Dinheiro, PIX, Cartão Créd, Cartão Déb, QR Code) — compactos `grid-cols-5`
  5. **Troco** (inline, quando Dinheiro selecionado) com atalhos +R$10, +R$20, +R$50, +R$100
  6. **Botão "+ Lançar Valor"**
- Quando `falta === 0`, habilita o botão "Dar Baixa"

**3. `Rotas.tsx` — Novo handler**
- Adicionar `handleAlterarPagamentos(paradaId, pagamentos[])` para atualizar o array de pagamentos de uma parada
- Passar como prop para `RotaAcerto`

### Arquivos editados
- `src/components/rotas/mockRotasData.ts`
- `src/components/rotas/RotaAcerto.tsx`
- `src/pages/Rotas.tsx`


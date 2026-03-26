

## Carregar Dados do Pedido da Fila + Canal de Venda Compacto

### O que muda

Ao clicar num card de pedido na fila, os dados completos sao carregados na coluna direita: cliente selecionado, endereco, modalidade, pagamentos e itens. Os botoes de canal de venda ficam em linha unica com largura do icone apenas.

### Arquivos e Mudancas

**1. `src/components/pdv/mockPdvData.ts`**
- Adicionar `clienteId: string`, `enderecoId?: string` e `pagamentos: Pagamento[]` na interface `PedidoFila`
- Atualizar os 3 pedidos mock existentes com esses campos (vincular aos clientes mock existentes)
- Adicionar 5+ novos pedidos mock com dados variados

**2. `src/pages/PDV.tsx` — `handleSelectFila`**
- Buscar o cliente em `clientesMock` pelo `clienteId` do pedido e chamar `setCliente()`
- Setar `setEnderecoId()` com o `enderecoId` do pedido
- Setar `setPagamentos()` com os pagamentos do pedido
- Manter o que ja faz: setar canal, modalidade, itens

**3. `src/components/pdv/AbaIdentificacao.tsx` — Canal de Venda**
- Trocar `grid grid-cols-3` por `flex gap-1`
- Cada botao de canal: remover `flex-col`, usar apenas o icone com tamanho fixo (`h-8 w-8 p-1.5`), sem label de texto
- Manter tooltip ou title com o nome do canal
- Botao selecionado: borda primary, bg primary/10


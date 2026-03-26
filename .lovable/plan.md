

## Endereço Principal nos Endereços Salvos do Cliente

### Resumo

Adicionar campo `principal` (boolean) ao `EnderecoCliente`. O endereço marcado como principal aparece no topo da lista com destaque visual e é auto-selecionado quando a modalidade "entrega" é escolhida.

### Mudanças

**1. `src/components/pdv/mockPdvData.ts`**
- Adicionar `principal?: boolean` à interface `EnderecoCliente`
- Marcar um endereço como `principal: true` nos mocks de cada cliente que tem endereços

**2. `src/components/pdv/AbaIdentificacao.tsx`**
- Na lista de endereços salvos: ordenar para que `principal: true` fique no topo, com badge/destaque visual (ex: borda primary + estrela ou label "Principal")
- Adicionar botão para marcar/desmarcar endereço como principal (altera `principal` no array do cliente, removendo do anterior)
- Quando `modalidade` muda para `"entrega"` e há cliente selecionado: auto-setar `enderecoId` para o endereço com `principal: true`

**3. `src/pages/PDV.tsx`**
- Na lógica de `setModalidade("entrega")`: se cliente tem endereço principal, setar `enderecoId` automaticamente

### Detalhes técnicos
- Ordenação: `cliente.enderecos.sort((a, b) => (b.principal ? 1 : 0) - (a.principal ? 1 : 0))`
- Auto-seleção: `useEffect` ou handler inline que detecta `modalidade === "entrega"` + `cliente` e busca `enderecos.find(e => e.principal)`
- Ao marcar novo principal: setar `principal = false` em todos os outros antes de setar o novo




## Filtros com botao "Filtrar" e logica de mes atual

### O que muda
- Filtros deixam de ser aplicados automaticamente. O usuario seleciona os criterios e clica em **"Filtrar"** para aplicar.
- Botao **"Limpar filtros"** reseta todos os filtros e volta ao padrao (mes atual).
- Cards de saldo (Saldo Total, Dinheiro, Contas) refletem os dados filtrados.
- Sem filtro ativo, exibe apenas transacoes do mes atual.
- Lista exibe 20 itens com botao **"Carregar mais 20"** no final.

### Arquivo: `src/components/financeiro/AbaExtrato.tsx`

**Estado**: Separar filtros "pendentes" (o que o usuario esta selecionando) dos filtros "aplicados" (o que esta sendo exibido).
- States `pendente*` para cada filtro (dataInicio, dataFim, metodo, tipo, caixa)
- States `aplicado*` para os filtros efetivamente em uso
- Por padrao, `aplicadoDataInicio` e `aplicadoDataFim` sao o 1o e ultimo dia do mes atual

**Botao "Filtrar"**: Ao lado dos selects, copia os valores pendentes para os aplicados e reseta o limite para 20.

**Botao "Limpar filtros"**: Reseta todos os pendentes e aplicados para os valores padrao (mes atual), visivel apenas quando algum filtro difere do padrao.

**Cards de saldo**: Calcular `saldoTotal`, `saldoDinheiro`, `saldoContas` a partir da lista `filtered` (ja filtrada) em vez de `transacoes` completas.

**Carregar mais**: Botao exibe "Carregar mais 20" com contagem de restantes.




## Reestruturar AbaResumo: Diário = Caixa, Semanal/Mensal = Gráfico + Top10 + Recebimentos

### Mudanças

**1. Aba Diário — dados do caixa atual (ou último)**
- Remover os 4 cards duplicados de Vendas Bruto / Receita Real / Despesas / Resultado (linhas 70-87)
- Receber `caixa: CaixaState` como nova prop
- Se caixa aberto: mostrar os MetricCards operacionais (Pedidos, Ticket Médio, Receita, Despesas) referentes ao caixa atual
- Se caixa fechado: mostrar os mesmos dados mas do último fechamento, com indicação "Último caixa — {data}"
- Manter Top 10 e Recebimentos por Método abaixo

**2. Aba Semanal — gráfico por caixa/dia + cards + Top10 + Recebimentos**
- Manter os 4 cards de totais (Vendas Bruto, Receita Real, Despesas, Resultado)
- Manter o gráfico de barras (últimos 7 dias)
- Adicionar abaixo do gráfico: Top 10 Produtos + Recebimentos por Método (mesmo layout do diário, grid 2 colunas)

**3. Aba Mensal — mesma estrutura do semanal**
- Cards de totais + gráfico 30 dias + Top 10 + Recebimentos abaixo

**4. Refatorar o loop semanal/mensal**
- O loop `["semanal", "mensal"].map(...)` já renderiza cards + gráfico; adicionar o bloco de Top 10 + Recebimentos dentro dele (extrair como componente interno ou duplicar o JSX)

### Props
- Adicionar `caixa: CaixaState` na interface `AbaResumoProps`
- Atualizar `Financeiro.tsx` para passar `caixa` ao `AbaResumo`

### Arquivos editados
- `src/components/financeiro/AbaResumo.tsx`
- `src/pages/Financeiro.tsx`


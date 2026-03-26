

## Gráfico por hora no Diário + Cards no Semanal/Mensal + Mocks diferenciados

### Mudanças

**1. Mock data (`mockFinanceiroData.ts`)**
- Adicionar novo tipo `VendaPorHora` com campos `hora: string` e `valor: number`
- Criar mock `vendasPorHoraMock`: array com 24 entradas (00h–23h) simulando vendas por hora do caixa atual
- Criar mocks separados para semanal e mensal:
  - `topProdutosSemanalMock` e `topProdutosMensalMock` — mesmos produtos mas com quantidades/valores diferentes do diário
  - `recebimentosSemanalMock` e `recebimentosMensalMock` — valores diferentes do `recebimentosPorMetodo` diário

**2. AbaResumo (`AbaResumo.tsx`)**
- **Diário**: Adicionar gráfico de barras por hora (BarChart com XAxis=hora, Bar=valor) **acima** dos MetricCards existentes
- **Semanal/Mensal**: Mover os 4 cards de totais para **abaixo** do gráfico de barras (inverter a ordem atual: gráfico primeiro, cards depois)
- Atualizar props para receber os novos mocks (vendasPorHora, topProdutos e recebimentos por período)

**3. Financeiro.tsx**
- Importar e passar os novos mocks para `AbaResumo`

### Arquivos editados
- `src/components/financeiro/mockFinanceiroData.ts`
- `src/components/financeiro/AbaResumo.tsx`
- `src/pages/Financeiro.tsx`


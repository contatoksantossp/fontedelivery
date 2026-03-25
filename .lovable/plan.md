

## Modulo 7: Financeiro — Plano de Implementacao

### Arquivos

```text
src/pages/Financeiro.tsx                       — Pagina principal com 3 abas (Caixa, Resumo, Extrato)
src/components/financeiro/
  mockFinanceiroData.ts                        — Dados mock: caixa, entregadores, transacoes, vendas diarias
  AbaCaixa.tsx                                 — Aba 1: gestao da gaveta + acerto de entregadores
  AbaResumo.tsx                                — Aba 2: dashboards diario/semanal/mensal com graficos
  AbaExtrato.tsx                               — Aba 3: livro razao com filtros e lancamentos manuais
  LancamentoDialog.tsx                         — Dialog para criar lancamento manual (entrada/saida)
  EntregadorAcerto.tsx                         — Card expansivel de acerto por entregador
```

Atualizar `src/App.tsx` para trocar o placeholder `/financeiro` pelo novo componente.

---

### 1. Mock Data (`mockFinanceiroData.ts`)

- **CaixaState**: status (`aberto`|`fechado`), fundoInicial, entradas, saidas, saldoEsperado, ultimoFechamento (data, total)
- **EntregadorTurno**: id, nome, veiculo, entregas, totalTaxas, totalBonificacoes, diaria, extras[] ({valor, descricao}), pago (boolean)
- **Transacao**: id, dataHora, descricao, tipo (`entrada`|`saida`), metodo (`dinheiro`|`pix`|`cartao`|`qrcode`), valor, origem (`venda`|`acerto`|`sangria`|`reforco`|`manual`)
- **VendaDiaria**: data, vendasBruto, receitaReal, despesas, resultado, pedidos, ticketMedio
- **TopProduto**: nome, unidades, valorTotal, lucro

Mock: caixa aberto com fundo R$500, ~3 entregadores do turno, ~25 transacoes, 30 dias de vendas diarias, top 10 produtos.

---

### 2. Regra do "Olho Magico"

Componente helper `ValorOculto`: recebe valor string, renderiza `R$ ****` por padrao. Icone de olho ao lado que alterna visibilidade. Estado local por instancia.

---

### 3. Aba Caixa (`AbaCaixa.tsx`)

**Gestao da Gaveta (topo)**:
- Estado fechado: aviso + resumo ultimo caixa + input fundo inicial + botao "Abrir Caixa"
- Estado aberto: 4 cards (Fundo Inicial, Entradas, Saidas, Saldo Esperado) com valores ocultos
- Botoes: "Sangria/Reforco" (dialog com tipo toggle + valor + descricao) e "Fechar Caixa" (dialog de contagem)

**Acerto de Entregadores (abaixo)**:
- Lista de `EntregadorAcerto` cards
- Cada card: nome, veiculo, saldo total. Expansivel ao clicar
- Expandido: metricas (entregas, taxas, bonificacoes) + inputs (diaria, extras com add/remove) + botao "Registrar"

---

### 4. Aba Resumo (`AbaResumo.tsx`)

Sub-abas: Diario | Semanal | Mensal

**Diario**: Cards operacionais (pedidos aberto/pendente/pronto/entrega) + 4 cards financeiros (Vendas Bruto, Receita, Despesas, Resultado) com olho magico + Top 10 produtos + Recebimentos por metodo

**Semanal**: Grafico de barras (recharts) dos ultimos 7 dias, clicavel para drill-down. Mesmos cards financeiros adaptados. Sem bloco operacional.

**Mensal**: Mesma logica, 30 dias no grafico.

---

### 5. Aba Extrato (`AbaExtrato.tsx`)

**Painel de Saldos (topo)**: 3 cards com olho magico (Saldo Total, Saldo Dinheiro, Saldo Contas)

**Botao "Lancar"**: Abre `LancamentoDialog` com tipo (entrada/saida toggle), valor, metodo (select), descricao

**Tabela de transacoes**: Data/Hora, Descricao, Tipo (badge verde/vermelho), Metodo, Valor (com olho magico). Filtros: metodo, tipo, periodo. Paginacao "Carregar Mais" de 20 em 20.

---

### Detalhes Tecnicos

- Dependencia nova: `recharts` para graficos de barras/linhas (semanal/mensal)
- Reutilizar `Tabs`, `Table`, `Dialog`, `Badge`, `Button`, `Input`, `Select` do shadcn
- `ValorOculto` como componente inline reutilizavel com `Eye`/`EyeOff` do lucide
- MetricCards existentes reutilizados onde possivel
- Graficos recharts: `BarChart` com `Bar`, `XAxis`, `YAxis`, `Tooltip`, `CartesianGrid`
- Clique no grafico via `onClick` no `Bar` component para filtrar drill-down
- Entregadores reutilizam nomes do `mockRotasData.ts` para consistencia
- Todos os estados via useState local, sem backend


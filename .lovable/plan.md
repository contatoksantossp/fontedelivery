

## Nova aba "Minhas Contas" no Financeiro

### O que faz
Aba para cadastrar contas a pagar com nome, valor, data de vencimento e status (pendente/paga). Permite acompanhar vencimentos e dar baixa quando paga.

### Arquivos

**1. `src/components/financeiro/AbaContas.tsx`** (novo)
- Interface `ContaPagar`: id, descricao, valor, dataVencimento, categoria (ex: aluguel, luz, fornecedor, outro), paga, dataPagamento?
- Estado local com contas mockadas (aluguel, conta de luz, fornecedor, internet)
- Botão "Nova Conta" abre dialog de cadastro
- Tabela com colunas: Descrição, Categoria, Vencimento, Valor, Status, Ações
- Status: Badge verde "Paga" / Badge amarela "Pendente" / Badge vermelha "Vencida" (se passou da data e não paga)
- Ação: botão "Dar baixa" que marca como paga com data atual
- Filtros: status (todas/pendentes/pagas/vencidas)

**2. `src/components/financeiro/ContaDialog.tsx`** (novo)
- Dialog para cadastrar nova conta: descrição, valor, data vencimento (datepicker), categoria (select)
- Campos obrigatórios com validação básica

**3. `src/pages/Financeiro.tsx`**
- Adicionar TabsTrigger "Minhas Contas" e TabsContent com `AbaContas`
- Estado `contas` gerenciado no Financeiro, passado como props

### Dados mock iniciais
- Aluguel — R$ 2.500 — dia 10
- Conta de Luz — R$ 380 — dia 15
- Fornecedor Bebidas — R$ 4.200 — dia 20
- Internet — R$ 150 — dia 5 (já paga)


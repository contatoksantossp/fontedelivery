

## Modulo 6: Estoque — Plano de Implementacao

### Arquivos

```text
src/pages/Estoque.tsx                          — Pagina principal com 3 abas (Posicao Atual, Historico, Fila de Espera)
src/components/estoque/
  mockEstoqueData.ts                           — Dados mock: saldos, movimentacoes, fila de espera
  PosicaoAtual.tsx                             — Aba 1: dashboard + filtros + tabela com edicao inline
  Historico.tsx                                — Aba 2: filtros de auditoria + tabela de movimentacoes
  FilaEspera.tsx                               — Aba 3: lista de clientes aguardando reposicao
```

Atualizar `src/App.tsx` para trocar o placeholder `/estoque` pelo novo componente.

---

### 1. Mock Data (`mockEstoqueData.ts`)

Reutiliza tipos do catalogo (`CatalogVariante`, `CatalogProduto`) para montar os saldos. Dados proprios:

- **EstoqueItem**: varianteId, produtoNome, varianteNome, sku, estoqueMinimo, estoqueAtual, categoriaId, subcategoriaId. Gerado a partir das ~30 variantes do catalogo, com saldos variados (alguns zerados, alguns abaixo do minimo).
- **Movimentacao**: id, dataHora, produtoNome, varianteNome, tipo (`"entrada" | "saida" | "perda" | "correcao"`), quantidade (com sinal), saldoFinal. ~15 registros mock.
- **FilaEsperaItem**: id, clienteNome, varianteNome, dataSolicitacao, contato. ~5 registros mock referenciando variantes esgotadas.

---

### 2. Layout da Pagina (`Estoque.tsx`)

Sidebar colapsada via `useSidebar`. Pagina com `Tabs` no topo: `[Posicao Atual] [Historico] [Fila de Espera]`. Cada aba renderiza seu componente dedicado.

Estado principal gerenciado em `Estoque.tsx`:
- `estoqueItems[]` — saldos de todas variantes (mutavel para edicao inline)
- `movimentacoes[]` — log de movimentacoes (cresce ao ajustar saldo)
- `filaEspera[]` — lista de clientes aguardando

Callbacks passados para `PosicaoAtual`: `onAjustarSaldo(varianteId, delta)` e `onEditarMinimo(varianteId, novoMin)` que atualizam o array e adicionam movimentacao ao historico.

---

### 3. Componentes

**PosicaoAtual**:
- **Dashboard**: 3 MetricCards (Total Produtos, Estoque Baixo, Esgotados) calculados a partir dos dados
- **Filtros**: Input de busca + Select cascata (Categoria > Subcategoria > Todos)
- **Tabela**: Colunas: Produto, Variante, Estoque Minimo (clicavel para editar), Estoque Atual, Status (Badge verde/amarelo/vermelho), Acoes (+/- botoes para ajuste rapido)
- Edicao inline do minimo via input que aparece ao clicar no valor
- Botoes +/- disparam `onAjustarSaldo` e criam movimentacao tipo "correcao"

**Historico**:
- **Filtros**: DatePicker (periodo), Select categoria/subcategoria, Select produto
- **Tabela**: Colunas: Data/Hora, Produto, Variante, Tipo (Badge colorido), Quantidade (+/-), Saldo Final
- Badges: Entrada (verde), Saida (azul), Perda (vermelho), Correcao (cinza)

**FilaEspera**:
- **Tabela simples**: Colunas: Cliente, Variante Desejada, Data Solicitacao, Contato (telefone/WhatsApp)
- Estado vazio com placeholder se nao houver registros

---

### Detalhes Tecnicos

- Reutilizar `Tabs`, `Table`, `Input`, `Select`, `Badge`, `Button` do shadcn
- Importar categorias/subcategorias do `mockCatalogoData.ts` para filtros cascata
- MetricCards reutilizam componente `MetricCard` existente
- Tabelas usam componentes `Table` do shadcn (TableHeader, TableBody, TableRow, TableCell)
- Edicao inline do minimo: estado local `editingMinId` controla qual celula esta em modo edicao
- Nenhuma dependencia nova necessaria


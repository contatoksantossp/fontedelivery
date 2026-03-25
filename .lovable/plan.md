

## Modulo 9: Parceiros — Plano de Implementacao

### Arquivos

```text
src/pages/Parceiros.tsx                        — Pagina principal com 4 abas
src/components/parceiros/
  mockParceirosData.ts                         — Dados mock: clientes, colaboradores, entregadores, fornecedores
  AbaClientes.tsx                              — Aba 1: tabela de clientes + cadastro + promover
  ClienteDialog.tsx                            — Dialog para criar/editar cliente (nome, apelido, telefone, enderecos)
  PromoverDialog.tsx                           — Dialog para promover cliente a Colaborador ou Entregador
  AbaColaboradores.tsx                         — Aba 2: tabela de colaboradores promovidos
  ColaboradorDialog.tsx                        — Dialog para editar cargo/data de inicio
  AbaEntregadores.tsx                          — Aba 3: layout 2 colunas (todos vs online)
  AbaFornecedores.tsx                          — Aba 4: cards expansiveis com historico de compras
  FornecedorDialog.tsx                         — Dialog para criar/editar fornecedor (PJ)
```

Atualizar `src/App.tsx` para trocar o placeholder `/parceiros` pelo novo componente.

---

### 1. Mock Data (`mockParceirosData.ts`)

- **Cliente**: id, nome, apelido, telefone, enderecos[] ({rua, numero, bairro, complemento, principal}), dataCadastro
- **Colaborador**: clienteId (ref), cargo, dataInicio, ativo
- **Entregador**: clienteId (ref), veiculo, online, totalMes (taxas+caixinhas acumuladas)
- **Fornecedor**: id, nomeFantasia, razaoSocial, cnpj, contatoNome, telefone, endereco, historico[] ({data, descricao, valor})

Mock: ~10 clientes (incluindo nomes dos entregadores de `mockRotasData`), ~3 colaboradores, ~3 entregadores, ~4 fornecedores com historico.

Regra de cadastro unico: colaboradores e entregadores referenciam `clienteId`, nao duplicam dados.

---

### 2. Aba Clientes (`AbaClientes.tsx`)

- **Botao "Novo Cliente"** abre `ClienteDialog`
- **Input de busca** por nome/apelido/telefone
- **Tabela**: Nome & Apelido, Telefone, Endereco Principal, Enderecos Salvos (contador), Acoes (Editar + Promover)
- **Promover**: abre `PromoverDialog` com escolha Colaborador ou Entregador. Ao confirmar, adiciona registro na aba correspondente

### 3. ClienteDialog
- Campos: Nome, Apelido, Telefone
- Secao de enderecos: lista com add/remove, campos rua/numero/bairro/complemento, radio para marcar principal

### 4. PromoverDialog
- Selecao: Colaborador ou Entregador (radio)
- Se Colaborador: campo Cargo
- Se Entregador: campo Veiculo
- Confirmar cria o registro vinculado

---

### 5. Aba Colaboradores (`AbaColaboradores.tsx`)

- **Tabela**: Nome (via clienteId lookup), Cargo, Data de Inicio, Acoes (Editar, Demitir)
- **Editar**: abre `ColaboradorDialog` para alterar cargo/data
- **Demitir**: remove privilegios (volta a ser apenas cliente), com confirmacao

---

### 6. Aba Entregadores (`AbaEntregadores.tsx`)

- **Layout 2 colunas** (grid 50/50):
  - **Esquerda "Todos os Entregadores"**: cards com nome, veiculo, total do mes, botoes Editar/Excluir/Ficar Online
  - **Direita "Online (Em Turno)"**: cards com indicador verde, botao Ficar Offline
- Clicar "Ficar Online" move card para direita; "Ficar Offline" devolve para esquerda
- Excluir = rebaixar a cliente (remove registro de entregador)

---

### 7. Aba Fornecedores (`AbaFornecedores.tsx`)

- **Botao "Novo Fornecedor"** abre `FornecedorDialog`
- **Cards**: Nome Fantasia, CNPJ, Contato, Telefone, Endereco
- **Expandir Historico**: accordion/collapsible revela tabela de compras (data, descricao, valor)
- `FornecedorDialog`: campos Razao Social, Nome Fantasia, CNPJ, Contato, Telefone, Endereco

---

### Detalhes Tecnicos

- Reutilizar `Tabs`, `Table`, `Dialog`, `Badge`, `Button`, `Input`, `Select`, `Switch`, `RadioGroup`, `Collapsible` do shadcn
- Estado centralizado em `Parceiros.tsx`: clientes[], colaboradores[], entregadores[], fornecedores[]
- Callbacks de promover/demitir/online/offline passados como props
- Nenhuma dependencia nova
- Todos os estados via useState local


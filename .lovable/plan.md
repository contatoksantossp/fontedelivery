

## Modulo 10: Configuracoes — Plano de Implementacao

### Arquivos

```text
src/pages/Configuracoes.tsx                    — Pagina principal com 2 abas
src/components/configuracoes/
  mockConfigData.ts                            — Dados mock: perfil da loja, horarios, faixas de entrega
  AbaPerfilLoja.tsx                            — Aba 1: dados basicos, horarios, toggle de status
  AbaConfiguracaoEntrega.tsx                   — Aba 2: layout 2 colunas (taxas cliente vs repasse entregador)
```

Atualizar `src/App.tsx` para trocar o placeholder `/configuracoes` pelo novo componente.

---

### 1. Mock Data (`mockConfigData.ts`)

- **PerfilLoja**: nomeLoja, telefone, endereco, logoUrl (placeholder), lojaAberta (boolean)
- **HorarioFuncionamento**: dia (string), abertura (string HH:mm), fechamento (string HH:mm), ativo (boolean) — array de 7 dias (Segunda a Domingo)
- **FaixaKm**: id, kmInicial, kmFinal, preco — usada tanto para taxas do cliente quanto repasse do entregador

Mock: loja "A Fonte Delivery", horarios padrao 08:00-22:00, ~4 faixas de km para cada tabela.

---

### 2. Aba Perfil da Loja (`AbaPerfilLoja.tsx`)

**Dados Basicos (topo)**:
- Area de upload de logo (simulada com div placeholder + icone de camera)
- Inputs: Nome da Loja, Telefone de Contato, Endereco da Loja
- Botao "Salvar Dados"

**Horarios de Funcionamento (meio)**:
- Grade com 7 linhas (Seg-Dom), cada uma com: nome do dia, Switch ativo/inativo, inputs de horario abertura e fechamento (type="time")
- Dias desativados ficam com inputs desabilitados

**Status Manual da Loja (destaque)**:
- Card com Switch grande (verde/vermelho) + texto "Loja Aberta" ou "Loja Fechada"
- Descricao de uso pratico (botao de panico)

---

### 3. Aba Configuracao de Entrega (`AbaConfiguracaoEntrega.tsx`)

**Layout 2 colunas** (grid 50/50):

**Coluna Esquerda — Taxas do Cliente**:
- Titulo + descricao
- Tabela dinamica: KM Inicial, KM Final, Preco (R$)
- Botao "+ Adicionar Faixa" insere linha editavel
- Cada linha: inputs inline + botao salvar + botao excluir (lixeira)

**Coluna Direita — Repasse do Entregador**:
- Estrutura identica a esquerda
- Campos: KM Inicial, KM Final, Repasse (R$)

---

### Detalhes Tecnicos

- Reutilizar `Tabs`, `Table`, `Input`, `Switch`, `Button`, `Card` do shadcn
- Estado centralizado em `Configuracoes.tsx` via useState
- Sidebar colapsa ao entrar na pagina (usar `useSidebar` + `useEffect` para `toggleSidebar`)
- Nenhuma dependencia nova
- Upload de logo simulado (div placeholder com icone)




## Busca de Endereco com Cache + Autocomplete

### Resumo

Substituir o formulario de cadastro de endereco por um sistema com input unico de busca que consulta um cache local de enderecos. Exibe 3 resultados + botao fixo "Buscar esse endereco". Ao selecionar, revela campos preenchidos automaticamente (rua, bairro, cep, cidade, numero). Ao salvar, verifica se o endereco (rua + numero) ja existe no cache, senao cria. Salva tambem no perfil do cliente com complemento individual.

### Arquivos e Mudancas

**1. `src/components/pdv/mockPdvData.ts`**
- Criar interface `EnderecoCache` com campos: `id`, `rua`, `numero?`, `bairro`, `cep`, `cidade`
- Criar array `enderecoCacheMock` com ~15 enderecos variados (simulando cache de todos os enderecos do sistema)
- Atualizar `EnderecoCliente` para incluir `cep?`, `cidade?`, `numero?` (alem do rua, bairro, complemento existentes)

**2. `src/components/pdv/AbaIdentificacao.tsx`** — Reescrever secao de endereco

**Estado novo:**
- `buscaEndereco: string` — texto digitado no input de busca
- `enderecoSelecionado: EnderecoCache | null` — endereco escolhido do cache ou da "API"
- `numero: string`, `complemento: string` — campos editaveis apos selecao
- `mostrarCampos: boolean` — controla exibicao dos campos detalhados

**Fluxo de busca:**
1. Usuario digita no input unico "Buscar endereco..."
2. Filtra `enderecoCacheMock` por rua ou bairro, exibe ate 3 resultados
3. Botao fixo no final: "Buscar esse endereco" (simula chamada API)
4. Ao clicar num resultado do cache: seta `enderecoSelecionado`, preenche campos automaticamente, revela inputs de rua, bairro, cep, cidade (readonly), numero e complemento (editaveis)
5. Ao clicar "Buscar esse endereco": simula API com timeout, retorna um resultado mock, mesmo fluxo de preenchimento

**Fluxo de salvar:**
1. Botao "Salvar Endereco" habilitado quando numero preenchido
2. Ao salvar: verifica se `enderecoCacheMock` ja tem um endereco com mesma rua + numero
3. Se nao tem: cria novo `EnderecoCache` e adiciona ao array cache
4. Cria `EnderecoCliente` no array `cliente.enderecos` com rua, bairro, cep, cidade, numero e complemento
5. Seta `enderecoId` e fecha modo de cadastro

**UI dos campos revelados:**
- Rua, Bairro, CEP, Cidade: inputs `readonly` com bg cinza, preenchidos automaticamente
- Numero: input editavel (preenchido se o cache tinha numero)
- Complemento: input editavel (sempre vazio, e individual do cliente)
- Botao "Salvar Endereco"

### Detalhes Tecnicos

- Funcao `simularBuscaAPI(texto)`: retorna Promise com delay de 500ms + resultado mock formatado (para simular latencia de API real)
- O cache e um array mutavel em memoria (igual `clientesMock`), novas entradas sao pushadas
- A busca no cache usa `.filter()` case-insensitive em `rua` e `bairro`, limitado a `.slice(0, 3)`
- Verificacao de duplicata no cache: comparar `rua.toLowerCase()` + `numero` para decidir se cria novo ou reutiliza existente




## Nova aba "Endereços Cache" nas Configurações

### O que faz
Adiciona uma terceira aba ao lado de "Configuração de Entrega" chamada **"Endereços Cache"**. Ela exibe todos os endereços do cache do sistema (`enderecoCacheMock`) em uma tabela com busca/filtro e permite edição e exclusão manual.

### Arquivos

**1. `src/components/configuracoes/AbaEnderecosCache.tsx`** (novo)
- Props: `enderecos: EnderecoCache[]`, `setEnderecos`
- Input de busca no topo que filtra por rua, bairro ou CEP
- Tabela com colunas: Rua, Número, Bairro, CEP, Cidade, Ações (editar/excluir)
- Botão editar abre `EnderecoCacheDialog`
- Botão excluir remove do array com confirmação via toast

**2. `src/components/configuracoes/EnderecoCacheDialog.tsx`** (novo)
- Dialog modal com campos: Rua, Número, Bairro, CEP, Cidade
- Ao salvar, atualiza o endereço no array via `setEnderecos`

**3. `src/pages/Configuracoes.tsx`** (editado)
- Importar `EnderecoCache`, `enderecoCacheMock` de `mockPdvData`
- Adicionar estado `enderecos` inicializado com cópia do mock
- Nova `TabsTrigger value="enderecos"` com texto "Endereços Cache"
- Novo `TabsContent` renderizando `AbaEnderecosCache`


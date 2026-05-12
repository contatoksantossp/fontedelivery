## Migração completa para Lovable Cloud

App hoje é 100% frontend com mocks em 9 arquivos (`mockCatalogoData`, `mockPdvData`, `mockRotasData`, `mockData` da Visão Geral, `mockEstoqueData`, `mockFinanceiroData`, `mockParceirosData`, `mockCuponsData`, `mockConfigData`). Vamos trocar tudo por dados reais no Lovable Cloud, com login real e papéis de usuário.

Por ser uma refatoração grande (≈40 telas, ~2.500 linhas de mock), vou executar em **fases**. Cada fase é entregue funcional, testável e termina com sugestão de revisar antes de seguir.

---

### Fase 0 — Fundação (1 etapa)

1. Habilitar Lovable Cloud.
2. Habilitar autenticação Email/Senha; sign-up aberto desativado (admin cria contas).
3. Criar tabela `profiles` (nome, telefone) ligada a `auth.users` com trigger de auto-criação.
4. Criar enum `app_role` (`admin`, `operador`) + tabela `user_roles` + função `has_role()` com `SECURITY DEFINER` (padrão seguro contra recursão de RLS).
5. Substituir `src/pages/Login.tsx` mock por login real do Cloud.
6. Criar `ProtectedRoute` em `App.tsx` que exige sessão; redireciona para `/` se deslogado.
7. Adicionar listener `onAuthStateChange` global + botão de logout no `AppHeader`.
8. Seed de um usuário admin inicial (você define email/senha na hora — peço pelo chat após habilitar Cloud).

---

### Fase 1 — Catálogo + Estoque

Tabelas: `categorias`, `subcategorias`, `produtos`, `variantes`, `kits_combos`, `kit_slots`, `estoque_movimentos`, `estoque_fila_espera`.

- Refatorar `src/pages/Catalogo.tsx` e diálogos (`CategoriaDialog`, `SubcategoriaDialog`, `ProdutoDialog`, `VarianteCard`, `KitComboDialog`) para usar React Query + Cloud.
- Refatorar `src/pages/Estoque.tsx` (PosicaoAtual, FilaEspera, Histórico) com mutations reais.
- Upload de fotos via Storage bucket `catalogo` (público para leitura).
- Seed das 5 categorias, subcategorias, produtos e variantes do mock atual.
- RLS: leitura para qualquer logado; escrita só para admin.

---

### Fase 2 — Parceiros (Clientes, Colaboradores, Entregadores, Fornecedores)

Tabelas: `clientes`, `cliente_enderecos`, `colaboradores`, `entregadores` (com `cor`), `fornecedores`, `fornecedor_compras`, `compra_itens`.

- Refatorar 4 abas de `Parceiros.tsx` + diálogos.
- Cache de endereços (usado pelo PDV) vira tabela `enderecos_cache` consultada por busca textual.
- Seed dos 10 clientes, 3 colaboradores, 3 entregadores e 4 fornecedores.

---

### Fase 3 — PDV + Visão Geral + Pedidos

Tabelas: `pedidos`, `pedido_itens`, `pedido_pagamentos`, `pedido_status_log`.

- Substituir `mockPdvData` e `mockData` (Visão Geral) por queries.
- Fluxo real: PDV cria pedido (status `rascunho` → `pendente` → `pronto` → `em_rota` → `entregue` → `cancelado`). Voltar/editar atualiza status.
- Visão Geral: listas pendente/pronto vêm de `pedidos` filtrados; ações (cancelar, editar, voltar, marcar pronto) viram mutations.
- Realtime via Supabase channel para os 3 kanbans atualizarem sozinhos.
- Impressão não-fiscal continua client-side.
- RLS: operador vê todos pedidos; só admin cancela pedido despachado.

---

### Fase 4 — Rotas + Logística

Tabelas: `rotas`, `rota_pedidos`, `rota_eventos`.

- Refatorar `Rotas.tsx`, `RotaCard`, `RotaDetalhes`, `RotaTimeline`, `RotaAcerto`.
- Atribuição de entregador, despacho, fechamento de rota via mutations.
- Mantém Leaflet puro como hoje.

---

### Fase 5 — Financeiro

Tabelas: `caixa_sessoes`, `caixa_movimentos`, `contas_pagar`, `entregador_acertos`, `lancamentos`.

- Refatorar 4 abas (Resumo, Caixa, Contas, Extrato) + diálogos.
- Saldos calculados via views/funções server-side.
- RLS: apenas admin lê valores; operador vê só caixa do dia.

---

### Fase 6 — Cupons & Promoções

Tabelas: `cupons`, `cupom_uso`, `promocoes_banner`, `promocao_produtos`.

- Refatorar abas + diálogos.
- Upload de banners via Storage bucket `promocoes`.

---

### Fase 7 — Configurações

Tabelas: `perfil_loja` (singleton), `horarios_funcionamento`, `taxas_entrega_cliente`, `taxas_entrega_entregador`, `enderecos_cache`.

- Refatorar 3 abas de configurações.
- StatusBadge "loja aberta" no header passa a ler/gravar em `perfil_loja`.
- Logo da loja via Storage bucket `loja`.

---

### Fase 8 — Limpeza final

- Remover todos arquivos `mock*.ts`.
- Atualizar memórias do projeto: remover "Frontend-only" e "Mock auth credentials"; adicionar "Lovable Cloud + papéis admin/operador".
- Rodar `security--run_security_scan` e corrigir achados.

---

### Detalhes técnicos relevantes

- **Stack adicionada**: `@supabase/supabase-js` (já vem com Cloud), `@tanstack/react-query` (já instalado).
- **Padrão de hooks**: cada módulo terá `src/hooks/use<Modulo>.ts` com queries/mutations tipadas.
- **Tipos**: usar `Database` types gerados pelo Cloud, não duplicar interfaces dos mocks.
- **RLS**: toda tabela com RLS habilitado. Função `has_role(auth.uid(), 'admin')` em policies sensíveis. Nenhuma role na tabela `profiles` (anti privilege-escalation).
- **Realtime**: ativado em `pedidos`, `rotas`, `caixa_sessoes`.
- **Storage buckets**: `catalogo`, `promocoes`, `loja` (públicos para leitura, escrita só admin).
- **Migração de imagens mock**: as fotos de produtos em `src/assets/products` continuam no bundle; campo `foto` aceita tanto URL externa (Storage) quanto path local — seed usa os paths atuais.

---

### Ordem de execução proposta

Vou começar pela **Fase 0** assim que aprovado. Ao final de cada fase paro, mostro o que mudou e aguardo seu OK para a próxima — assim você não recebe um diff gigante de uma vez e podemos ajustar no caminho.

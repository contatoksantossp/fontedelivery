

## Modulo 8: Cupons e Promocoes — Plano de Implementacao

### Arquivos

```text
src/pages/CuponsPromocoes.tsx                  — Pagina principal com 2 abas (Cupons, Promocoes e Banners)
src/components/cupons/
  mockCuponsData.ts                            — Dados mock: cupons, promocoes/banners
  AbaCupons.tsx                                — Aba 1: tabela de cupons + dialog de criacao
  CupomDialog.tsx                              — Dialog para criar/editar cupom
  AbaPromocoes.tsx                             — Aba 2: grade de cards de banners/promocoes
  PromocaoDialog.tsx                           — Dialog hibrido para criar/editar promocao/banner
```

Atualizar `src/App.tsx` para trocar o placeholder `/cupons` pelo novo componente.

---

### 1. Mock Data (`mockCuponsData.ts`)

- **Cupom**: id, codigo, tipo (`percentual` | `fixo`), valor, pedidoMinimo, totalUsos, expiracao (date string), ativo (boolean)
- **PromocaoBanner**: id, nome, descricao, imagemUrl (placeholder gradient/cor), tipoDesconto (`percentual` | `fixo` | `nenhum`), valorDesconto, ativo, produtos[] ({produtoNome, varianteNome, precoOriginal, precoFinal}), ordem (number)

Mock: ~6 cupons (PRIMEIRACOMPRA, FRETE10, VERAO25, etc.) e ~4 banners/promocoes (Festival de Cervejas, Noite do Whisky, Banner Informativo Horario, Combo Churrasco).

---

### 2. Aba Cupons (`AbaCupons.tsx`)

- **Botao "Novo Cupom"** no topo, abre `CupomDialog`
- **Tabela**: Colunas: Codigo, Tipo (Badge % ou R$), Valor, Pedido Minimo, Usos, Expiracao, Status (Switch toggle ativo/inativo)
- Switch inline alterna `ativo` diretamente na tabela

### 3. CupomDialog

- Campos: Codigo (Input uppercase), Tipo de Desconto (toggle % / R$), Valor, Pedido Minimo, Data de Validade
- Modo criacao e edicao (recebe cupom opcional como prop)

---

### 4. Aba Promocoes e Banners (`AbaPromocoes.tsx`)

- **Botao "Nova Promocao/Banner"** no topo
- **Grade de cards** (grid 1-2 colunas): cada card exibe:
  - Area colorida/gradiente simulando banner (sem imagem real, usar div com gradiente)
  - Nome da campanha, descricao, tipo de desconto (Badge)
  - Lista de produtos vinculados com preco riscado + preco novo (se houver)
  - Botao editar (Pencil) + Switch de status ativo/inativo

### 5. PromocaoDialog

- **Configuracao do Banner**: Nome, descricao, area de "upload" (simulada com placeholder)
- **Configuracao de Desconto**: Toggle entre Percentual / Valor Fixo / Nenhum. Se "Nenhum", oculta secao de produtos
- **Vinculo de Produtos**: Select com busca para adicionar produtos do catalogo. Calculo automatico do preco final exibido em tempo real
- Botao "Publicar no Carrossel"

---

### Detalhes Tecnicos

- Reutilizar `Tabs`, `Table`, `Dialog`, `Badge`, `Button`, `Input`, `Select`, `Switch` do shadcn
- Importar produtos/variantes do `mockCatalogoData.ts` para o seletor de vinculo
- Sidebar colapsa via `useSidebar` (padrao dos outros modulos)
- Gradientes nos cards simulam banners (ex: `bg-gradient-to-r from-orange-500 to-red-500`)
- Nenhuma dependencia nova necessaria
- Todos os estados via useState local


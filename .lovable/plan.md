

## Melhorias no Dialog de Cadastro de Produto

### Problemas atuais
- Foto do produto pai: campo de texto "URL da Foto" sem preview visual
- Foto das variantes: campo nem existe no formulario
- Formulario basico demais para um cadastro completo

### Plano de melhorias

#### 1. Preview de foto do produto pai
- Substituir o campo "URL da Foto" por um bloco visual: thumbnail da imagem atual (64x64) + input de URL ao lado
- Mostra placeholder quando vazio

#### 2. Foto em cada variante
- Adicionar campo de URL de foto + thumbnail pequeno (40x40) na linha de cada variante
- Por padrao herda a foto do produto pai

#### 3. Campos adicionais sugeridos

**Produto pai:**
- **Ativo (Switch)** - ligar/desligar produto no catalogo
- **Destaque (Switch)** - marcar como destaque (ja existe no modelo mas nao no dialog)
- **Codigo de barras / EAN** - campo texto opcional

**Variante:**
- **Descricao** - campo ja existe no modelo mas nao aparece no form
- **Margem calculada** - exibir automaticamente (valorVenda - custo) como texto readonly
- **Unidade de medida** - select (un, kg, L, ml, g, pct)

#### 4. Layout reorganizado
- Seção produto pai: foto preview + nome + descrição + switches (ativo/destaque) em grid organizado
- Seção variantes: cada card com thumbnail + campos em layout mais compacto e completo

### Arquivos editados
- `src/components/catalogo/ProdutoDialog.tsx` - reformular layout completo
- `src/components/catalogo/mockCatalogoData.ts` - adicionar campos `ativo`, `ean` ao tipo `CatalogProduto` e `unidade` ao tipo `CatalogVariante` (se aprovado)

### Resultado
- Dialog visualmente mais rico com previews de imagem
- Todos os campos do modelo representados no formulario
- Informacoes uteis como margem calculada e status ativo/destaque


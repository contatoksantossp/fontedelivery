

## Duas mudanças no PromocaoDialog

### 1. Banner: trocar gradiente por upload de imagem
- Substituir o `<div>` com gradiente (linha 107-109) pelo componente `BannerUpload` igual ao do `KitComboDialog` (botão clicável com preview da imagem, overlay de upload no hover)
- Adicionar estado `imagem` ao dialog, inicializado com `"/placeholder.svg"`
- Remover o array `gradientes` e o estado/select de `gradiente`
- Atualizar `PromocaoBanner` no `mockCuponsData.ts`: trocar campo `gradiente: string` por `imagem: string`
- Atualizar `AbaPromocoes.tsx`: trocar o `<div>` com gradiente pelo `<img>` usando `p.imagem`
- Atualizar mock data com `/placeholder.svg`
- Atualizar `handleSalvar` para enviar `imagem` em vez de `gradiente`

### 2. Vincular Produtos: trocar Select por busca com autocomplete
- Remover o `<Select>` + botão `<Plus>` (linhas 153-165)
- Adicionar estado `buscaProduto` (string) e lógica de filtragem
- Colocar um `<Input>` com placeholder "Buscar produto..."
- Ao digitar, filtrar `variantesDisponiveis` com `.filter()` + `.slice(0, 3)` para mostrar no máximo 3 resultados
- Exibir resultados como lista clicável abaixo do input (div com border, rounded)
- Ao clicar num resultado, adicionar o produto e limpar o input
- Remover imports de `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`

### Arquivos editados
- `src/components/cupons/mockCuponsData.ts` — tipo + mock
- `src/components/cupons/PromocaoDialog.tsx` — banner upload + busca
- `src/components/cupons/AbaPromocoes.tsx` — exibir imagem no card


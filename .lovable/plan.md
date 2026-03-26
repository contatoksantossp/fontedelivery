

## Ajustes no ProdutoDialog

### Mudancas

**1. Mover EAN do produto pai para a variante**
- Remover campo EAN da secao do produto pai
- Remover `ean` do state do dialog e do `CatalogProduto`
- Adicionar campo `ean` ao `VarianteForm` e ao tipo `CatalogVariante` (substituindo `sku`)
- No grid da variante, trocar o campo "SKU" por "EAN / Codigo de Barras" com icone Barcode
- Atualizar `mockCatalogoData.ts`: remover `ean` de `CatalogProduto`, adicionar `ean` a `CatalogVariante` (mover os valores de SKU para EAN ou manter ambos conforme necessario)

**2. Upload de foto ao clicar na imagem**
- Transformar `FotoPreview` em elemento clicavel com `cursor-pointer` e hover overlay
- Ao clicar, abrir um `<input type="file" accept="image/*">` hidden via ref
- Ao selecionar arquivo, usar `URL.createObjectURL()` para preview instantaneo
- Aplicar tanto na foto do produto pai (80px) quanto nas fotos das variantes (48px)
- Remover os campos de texto "URL da Foto" e "URL Foto" (a foto agora e alterada pelo clique)

**3. Melhorar campo de Tags**
- Renomear label de "Tags (virgula)" para "Tags de busca (virgula)"
- Adicionar placeholder explicativo: "Ex: cereja, cherry, ziggy"
- Manter comportamento atual de separacao por virgula

**4. Renomear SKU para EAN na variante**
- Campo SKU vira EAN com icone de Barcode
- Atualizar `emptyVariante()` para ter `ean: ""` ao inves de `sku: ""`

### Arquivos editados
- `src/components/catalogo/ProdutoDialog.tsx` - todas as mudancas de UI
- `src/components/catalogo/mockCatalogoData.ts` - ajustar tipos e dados mock


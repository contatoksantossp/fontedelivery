

## Mover botões Edit/Delete para baixo do card de categoria

### Problema
Os botões de editar/excluir ficam como overlay no meio da imagem, bloqueando o clique de seleção da categoria.

### Solução
Remover o overlay da imagem e colocar os botões **abaixo do nome**, visíveis apenas no hover (`group-hover`) ou quando a categoria está selecionada. Isso empurra o conteúdo abaixo (subcategorias) naturalmente.

### Arquivo: `src/components/catalogo/CategoriaCard.tsx`

- Remover o `<div>` overlay (linhas 27-44) de dentro da imagem
- Adicionar uma `<div>` após o `<span>` do nome com os botões Edit/Delete
- Essa div usa `hidden group-hover:flex` + mostrar também quando `selected`
- Botões pequenos lado a lado: `h-5 w-5` com ícones `h-3 w-3`
- Layout: `flex items-center justify-center gap-1`

```tsx
{/* Botões aparecem abaixo no hover ou quando selecionado */}
<div className={`flex items-center justify-center gap-1 ${selected ? "flex" : "hidden group-hover:flex"}`}>
  <Button size="icon" variant="ghost" className="h-5 w-5" onClick={...}>
    <Edit className="h-3 w-3" />
  </Button>
  <Button size="icon" variant="ghost" className="h-5 w-5" onClick={...}>
    <Trash2 className="h-3 w-3" />
  </Button>
</div>
```

### Arquivo editado
- `src/components/catalogo/CategoriaCard.tsx`


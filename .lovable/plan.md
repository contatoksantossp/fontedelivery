

## Adicionar botão de limpar busca no campo de pesquisa do Catálogo

### Mudança
Adicionar um ícone de lixeira (ou X) no canto direito do input de busca, visível apenas quando há texto digitado. Ao clicar, limpa o campo.

### Arquivo: `src/pages/Catalogo.tsx`

1. Importar `X` de `lucide-react` (ícone de limpar, mais padrão que lixeira para inputs)
2. No `<div className="relative">` do search bar (linha 133-141):
   - Adicionar `pr-9` ao Input para dar espaço ao botão
   - Adicionar botão com ícone `X` posicionado `absolute right-2 top-1/2 -translate-y-1/2`
   - Mostrar apenas quando `busca.length > 0`
   - `onClick={() => setBusca("")}`

```tsx
<div className="relative">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input
    placeholder="Buscar por nome, descrição ou tag..."
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
    className="pl-9 pr-9"
  />
  {busca && (
    <button onClick={() => setBusca("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
      <X className="h-4 w-4" />
    </button>
  )}
</div>
```

### Arquivo editado
- `src/pages/Catalogo.tsx`


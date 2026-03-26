

## Altura máxima 100% da tela — sem esticamento

### Problema
Atualmente o layout usa `min-h-screen` no container principal, permitindo que o conteúdo estique além da viewport. As colunas não têm restrição de altura, causando scroll na página inteira em vez de scroll interno nos componentes.

### Solução

**1. `src/layouts/AppLayout.tsx`** — Container principal
- Trocar `min-h-screen` por `h-screen` + `overflow-hidden` no wrapper raiz
- Adicionar `overflow-hidden` no container do conteúdo para que o Outlet nunca ultrapasse o espaço disponível

```tsx
<div className="h-screen flex w-full overflow-hidden">
  <AppSidebar />
  <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
    <AppHeader />
    <Outlet /> {/* já usa flex-1 nas páginas */}
  </div>
</div>
```

**2. `src/components/PageContainer.tsx`** — Páginas com scroll interno
- Adicionar `overflow-auto` para que páginas como Dashboard, Catálogo etc. tenham scroll interno quando o conteúdo exceder o espaço

```tsx
<div className={cn("flex-1 p-6 space-y-6 overflow-auto", className)}>
```

**3. Páginas multi-coluna** (já usam `flex-1 flex overflow-hidden`)
- PDV, VisaoGeral, Rotas já estão corretas com `flex-1 flex overflow-hidden`
- Nenhuma mudança necessária nessas páginas

### Resultado
- Toda a aplicação fica contida em 100vh
- Scroll apenas interno nos componentes/colunas que precisam
- 2 arquivos editados




## StatusBadge clicavel com confirmacao de abrir/fechar loja

### O que muda
O StatusBadge no header vira um botao clicavel. Ao clicar, abre um AlertDialog perguntando se deseja fechar (quando online) ou abrir (quando offline) a loja. Ao confirmar, o status alterna.

### Arquivos

**1. `src/components/StatusBadge.tsx`** (editado)
- Aceitar props `onClick` opcional e `clickable?: boolean`
- Quando clickable, aplicar `cursor-pointer` e hover effect
- Renderizar como `<button>` em vez de `<div>` quando clickable

**2. `src/components/AppHeader.tsx`** (editado)
- Adicionar state `lojaAberta: boolean` (inicia `true`)
- Adicionar state `confirmOpen: boolean` para o AlertDialog
- Clicar no StatusBadge abre o AlertDialog
- Confirmar alterna o estado e mostra toast
- Importar AlertDialog do shadcn e toast do sonner


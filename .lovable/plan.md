

## Layout Kanban Lado a Lado

### Mudanca

Alterar a coluna esquerda dos Kanbans de `flex-col` (empilhado) para `flex-row` (lado a lado), com altura fixa de 100% da area disponivel.

### Arquivo: `src/pages/VisaoGeral.tsx`

- Linha 83: trocar `flex flex-col gap-2` por `flex flex-row gap-2` no container dos Kanbans
- Remover o `style={{ flex: ... }}` dinamico de ambos os KanbanColumns (nao faz mais sentido em layout horizontal)
- Cada KanbanColumn ocupa `w-1/2 h-full` com overflow interno via ScrollArea

### Arquivo: `src/components/visao-geral/KanbanColumn.tsx`

- Garantir que o componente aceita `h-full` e que o ScrollArea preenche o espaco restante corretamente (ja parece ok com `flex-1`)




## Filtros da Fila de Pedidos — mesmo estilo do Canal de Venda

### Mudança

Trocar os filtros atuais (chips horizontais com `flex-wrap`) pelo mesmo padrão visual usado na `AbaIdentificacao` para seleção de canal: botões com ícone em cima + texto embaixo, `flex-col`, bordas, ocupando largura igual (`flex-1`).

- Linha 1: botões dos 5 canais (Balcão, WhatsApp, iFood, 99Food, App) lado a lado com `flex-1`
- Linha 2: botão "Todos" mais largo (`w-full`) abaixo

### Arquivo: `src/components/pdv/FilaPedidos.tsx`

- Separar `filtrosCanal` em dois grupos: canais individuais (sem "todos") e o item "todos"
- Canais individuais renderizados numa `div className="flex gap-1 w-full"` com cada botão usando:
  ```tsx
  className={cn(
    "flex-1 flex flex-col items-center justify-center gap-0.5 rounded-lg border py-1.5 transition-colors min-w-0",
    filtroCanal === f.id
      ? "border-primary bg-primary/10 text-primary"
      : "border-border bg-card text-muted-foreground hover:text-foreground"
  )}
  ```
  Com ícone `h-3.5 w-3.5` e label `text-[9px]`
- Botão "Todos" renderizado separadamente abaixo com `w-full`, mesmo estilo mas layout horizontal (ícone + texto na mesma linha)


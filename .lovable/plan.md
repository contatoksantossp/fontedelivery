

## Adicionar botoes rapidos no header

### O que muda
Dois novos botoes ao lado esquerdo do "Novo Pedido": **Visao Geral** e **Rotas e Logistica**. Estilo `ghost` ou `outline` para diferenciar do botao primario.

### Arquivo: `src/components/AppHeader.tsx`
- Adicionar dois `<Button variant="ghost" size="sm">` antes do botao "Novo Pedido"
- Icones: `LayoutDashboard` para Visao Geral, `Truck` para Rotas e Logistica
- Cada botao navega para sua rota (`/visao-geral`, `/rotas`) via `navigate()`
- Agrupar os 3 botoes em um `div` com `flex items-center gap-2`


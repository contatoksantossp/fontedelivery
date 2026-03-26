

## Botão "Novo Pedido" CTA no cabeçalho

### Arquivo: `src/components/AppHeader.tsx`

- Importar `Button`, `Plus` (lucide-react), `useNavigate` (react-router-dom)
- Adicionar botão CTA primário entre o bloco esquerdo (nome/status) e o bloco direito (caixa/fundo)

```tsx
<Button size="sm" className="gap-1.5" onClick={() => navigate("/pdv")}>
  <Plus className="h-4 w-4" />
  Novo Pedido
</Button>
```

- O layout `justify-between` existente já posiciona os 3 blocos naturalmente

### Resultado
- Botão visível em qualquer módulo
- Clique navega para `/pdv` com estado inicial (carrinho vazio)
- 1 arquivo editado


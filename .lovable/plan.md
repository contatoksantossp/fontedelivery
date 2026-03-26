

## Corrigir estilo de impressao do cupom

O texto impresso sai pequeno e fino porque o CSS de print atual usa `width: 80mm` e herda o `font-mono text-xs` sem override de tamanho ou peso para impressao.

### Alteracoes em `src/index.css`

Atualizar o bloco `@media print` existente:

- Aumentar `width` de `80mm` para `100%`
- Adicionar `font-size: 14pt` e `line-height: 1.5` no `#cupom-print`
- Adicionar `font-weight: 600` para engrossar o texto
- Forcar elementos internos (`p, span, div`) para `font-size: 12pt` minimo
- Elementos bold (`.font-bold`) para `font-weight: 800`
- Titulo do pedido (`text-lg`, `text-sm`) com tamanhos maiores para print (`18pt`, `14pt`)


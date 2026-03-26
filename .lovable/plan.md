

## Cupom Fiscal + Botao Imprimir no PedidoDetalhes

### O que muda

1. **Fundo branco e texto preto** — container com `bg-white text-black` fixo (independente do tema)
2. **Layout estilo cupom/nota fiscal** — fonte mono, separadores tracejados (`- - -`), alinhamento centralizado no header, largura estreita
3. **Botao Imprimir** — fixo no topo da coluna, cor laranja, icone `Printer`
   - Ao clicar: usa `window.print()` com CSS `@media print` que esconde tudo exceto o conteudo do cupom
   - Apos imprimir: botao fica "apagado" (opacidade reduzida, cor cinza) via state `printed`
   - Pode clicar novamente (reseta o estado printed e imprime de novo)
4. **State `printed`** — reseta quando o pedido selecionado muda

### Arquivo editado

**`src/components/visao-geral/PedidoDetalhes.tsx`**
- Adicionar `useRef` para referenciar o conteudo do cupom
- Adicionar state `printed` (boolean)
- Resetar `printed` quando `pedido.id` muda
- Botao imprimir no topo: quando `printed=false` bg laranja, quando `printed=true` bg cinza/opaco
- Ao clicar no botao: chamar funcao que injeta style de print temporario, chama `window.print()`, e no callback marca `printed=true`
- Reformatar layout para estilo cupom: fonte `font-mono text-xs`, separadores tracejados, header centralizado com codigo e data

**`src/index.css`**
- Adicionar regra `@media print` que esconde tudo exceto `#cupom-print` e garante fundo branco


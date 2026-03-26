

## Adicionar color picker personalizado ao EntregadorEditDialog

### O que muda
Alem das 6 bolinhas pre-definidas, adicionar um input `type="color"` nativo ao lado delas, permitindo escolher qualquer cor personalizada.

### Arquivo: `src/components/parceiros/EntregadorEditDialog.tsx`
- Adicionar um `<input type="color">` estilizado como uma bolinha (mesmo tamanho das outras) ao final da lista de cores
- Quando o usuario escolher uma cor personalizada, ela se torna a cor selecionada
- Se a cor atual nao estiver na lista CORES, o color picker mostra a cor atual e fica com borda de selecionado


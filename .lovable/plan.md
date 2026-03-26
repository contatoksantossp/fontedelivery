

## Adicionar modo editar para Entregadores

### O que muda
Botão "Editar" no card do entregador que abre um Dialog para editar o nome (do cliente vinculado), veículo e cor. A cor é selecionada via paleta de bolinhas coloridas.

### Arquivos

**1. `src/components/parceiros/EntregadorEditDialog.tsx`** (novo)
- Dialog com campos: Nome (input text), Veículo (select: Moto/Bicicleta/Carro), Cor (grid de bolinhas coloridas clicáveis com as 6 cores padrão do sistema)
- Props: `entregador: Entregador | null`, `clienteNome: string`, `open: boolean`, `onOpenChange`, `onSave(id, dados: { veiculo, cor, clienteNome })`

**2. `src/components/parceiros/AbaEntregadores.tsx`** (editado)
- Adicionar prop `onEdit(id: string, dados: { veiculo: string; cor: string; clienteNome: string })` 
- Adicionar state local para dialog (open + entregador selecionado)
- Botão "Editar" (ícone Pencil) ao lado do botão de excluir no card
- Renderizar `EntregadorEditDialog`

**3. `src/pages/Parceiros.tsx`** (editado)
- Adicionar handler `editEntregador` que atualiza veículo e cor no state de entregadores, e nome no state de clientes
- Passar `onEdit` para `AbaEntregadores`


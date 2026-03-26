

## Scroll horizontal para cards de promoções

### O que muda
- Trocar o grid vertical (`grid grid-cols-1 lg:grid-cols-2`) por um container com scroll horizontal (`flex overflow-x-auto`)
- Cada card ganha largura fixa (~380px) e `flex-shrink-0` para não comprimir
- Cards ficam lado a lado, rolando horizontalmente
- Altura dos cards fica livre (sem limitar), permitindo listar muitos produtos para baixo

### Arquivo editado
- `src/components/cupons/AbaPromocoes.tsx` — linha 56: trocar `div.grid` por `div.flex overflow-x-auto gap-4 pb-2` e adicionar `w-[380px] flex-shrink-0` em cada Card


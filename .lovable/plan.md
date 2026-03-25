

## Mapa Interativo Leaflet + Cores por Entregador

### Mudanca Principal

As cores nao sao mais por rota — sao por **entregador**. Cada entregador tem uma cor definida no seu perfil. Quando um entregador e atribuido a uma rota, todos os pedidos daquela rota e o slot da rota assumem a cor do entregador.

### Arquivos e Mudancas

**1. `src/components/parceiros/mockParceirosData.ts`**
- Adicionar campo `cor: string` na interface `Entregador` (ex: `"#3b82f6"`)
- Atribuir cores distintas a cada entregador mock

**2. `src/components/parceiros/AbaEntregadores.tsx`**
- Exibir a cor do entregador no card (bolinha colorida ou borda lateral)
- Permitir editar a cor (color picker simples ou paleta predefinida)

**3. `src/components/visao-geral/mockData.ts`**
- Adicionar `lat` e `lng` na interface `Pedido`
- Adicionar coordenadas mock (Sao Paulo) a cada pedido
- Adicionar campo `cor` na interface `Entregador` local e sincronizar com os dados de parceiros
- Expandir para 6+ entregadores com cores

**4. `package.json`**
- Adicionar `leaflet`, `react-leaflet`, `@types/leaflet`

**5. `src/index.css`**
- Importar CSS do Leaflet
- Estilos para pins customizados (div icons coloridos)

**6. `src/components/visao-geral/MapaRotas.tsx`** (reescrever)
- `<MapContainer>` com tiles CartoDB Dark Matter
- Markers para cada pedido pronto tipo entrega
- Pins sem rota: cor cinza padrao
- Pins com rota que tem entregador atribuido: cor do entregador
- Click no marker em modo selecao: adiciona pedido a rota ativa
- Click no marker fora do modo selecao: seleciona pedido para detalhes
- Manter slots de rota compactos abaixo do mapa

**7. `src/pages/VisaoGeral.tsx`**
- State `entregadorPorRota: [string | null, string | null]` — id do entregador atribuido a cada slot
- Callback `onSelectEntregador(slotIndex, entregadorId)` que atualiza o state
- Derivar `pedidoCorMap: Map<string, string>` — para cada pedido em rota, buscar cor do entregador atribuido aquela rota
- Passar `pedidoCorMap` para `MapaRotas` e `PedidoCard`
- Passar `entregadorCor` para `SlotRota` e `SlotRotaExpanded`

**8. `src/components/visao-geral/PedidoCard.tsx`**
- Nova prop `rotaColor?: string`
- Quando `inRota` e `rotaColor` definida: background sutil com a cor (alpha 20%) em vez de `opacity-50`
- Sem `rotaColor` (entregador nao atribuido ainda): manter visual atual de `inRota`

**9. `src/components/visao-geral/SlotRota.tsx`**
- `SlotRota` compacto: receber `entregadorCor` e aplicar borda lateral colorida quando tem entregador
- `SlotRotaExpanded`: substituir `<Select>` por grid de botoes (`grid grid-cols-2 gap-1.5, max-h-[120px] overflow-y-auto`)
  - Cada botao mostra nome + veiculo + bolinha da cor do entregador
  - Botao selecionado fica com borda na cor do entregador
  - Callback `onSelectEntregador(entregadorId)` sobe para VisaoGeral
- Header do slot expandido usa a cor do entregador como accent

### Fluxo

1. Usuario expande slot de rota → modo selecao ativa
2. Clica em pedidos (cards ou pins no mapa) para adicionar
3. Seleciona entregador clicando num botao no painel central
4. Ao selecionar entregador: pins no mapa, cards dos pedidos e slot da rota mudam para a cor do entregador
5. Se trocar entregador, as cores atualizam imediatamente

### Detalhes Tecnicos

- Tiles dark: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`
- Pins via `L.divIcon`: div redondo 14px com box-shadow, cor inline
- Centro do mapa: Sao Paulo (-23.55, -46.63), zoom 13
- Cores dos entregadores: definidas no mock, ex: `#3b82f6`, `#ef4444`, `#10b981`, `#f59e0b`, `#8b5cf6`, `#ec4899`


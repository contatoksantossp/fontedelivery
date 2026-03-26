

## Sistema de Cores, Mapa, Detalhes Melhorados e Bonificacao no Modulo Rotas

### O que muda

1. **Cores do entregador nos cards de rota** -- cada RotaCard ganha borda lateral na cor do entregador (igual SlotRota da Visao Geral)
2. **Mapa Leaflet na coluna direita** -- mostra pins das paradas: amarelo = pendente, cinza = entregue, cor do entregador = posicao dele
3. **Coluna central redesenhada** -- header com nome/cor do entregador, timeline vertical ordenada (entregues primeiro, pendentes depois), metade inferior com accordion de pedidos
4. **Mini-cards modernizados** -- visual mais polished com indicador de status colorido e layout refinado
5. **Bonificacao editavel** -- input para alterar bonificacao enquanto rota nao estiver finalizada/concluida

---

### Detalhes tecnicos

**1. Mock data -- `mockRotasData.ts`**
- Adicionar campo `entregadorId: string` na interface `Rota` (referencia ao `entregadoresMock` de `visao-geral/mockData`)
- Adicionar coordenadas `lat/lng` em cada `Parada` para pins no mapa
- Adicionar `entregadorLat/entregadorLng` na `Rota` para posicao atual do entregador
- Mapear: r1 -> e1 (Ricardo, #3b82f6), r2 -> e2 (Lucas, #10b981), r3 -> e3 (Andre, #f59e0b), r4 -> e1 (Ricardo)

**2. `RotaCard.tsx` -- cores e mini-cards modernos**
- Receber prop `cor: string` do entregador
- Aplicar `borderLeftWidth: 3, borderLeftColor: cor` no card (inline style)
- Bolinha colorida ao lado do nome do entregador
- Mini-cards: adicionar dot de status (amarelo/cinza), bordas arredondadas maiores, sombra sutil, layout com icone de status

**3. `RotaDetalhes.tsx` -- coluna central melhorada**
- Receber `cor: string` do entregador
- Header: bolinha colorida + nome + veiculo com a cor
- Timeline reordenada: entregues no topo, pendentes embaixo (ordem de progresso)
- Timeline ocupa ~metade superior; accordion de pedidos ocupa metade inferior com ScrollArea
- Adicionar input de bonificacao editavel (Input type number) com callback `onBonificacaoChange`
- Bonificacao editavel apenas se status != "finalizada" e != "concluida"

**4. `RotaTimeline.tsx` -- melhorias visuais**
- Receber `cor: string` para usar nos icones pendentes (amarelo fica, entregues ficam cinza)
- Ordenar internamente: entregues primeiro, pendentes depois

**5. Mapa Leaflet -- `RotaMapaLeaflet.tsx` (novo)**
- Componente com Leaflet puro via useRef (padrao do projeto)
- Props: `rota: Rota | null`, `cor: string`, `allRotas: Rota[]`
- Sem rota selecionada: mostra todos os entregadores nos pins com suas cores
- Com rota selecionada: paradas pendentes = pin amarelo, paradas entregues = pin cinza, entregador = pin na cor dele
- Tile layer: CartoDB dark (mesmo do MapaRotas existente)
- CSS `.map-pin` reutilizado do existente

**6. `Rotas.tsx` -- integracao**
- Importar `entregadoresMock` de `visao-geral/mockData`
- Computar mapa `rotaId -> cor` via `entregadorId`
- Passar `cor` para RotaCard e RotaDetalhes
- Coluna direita: renderizar `RotaMapaLeaflet` quando status != "finalizada", manter RotaAcerto para finalizadas
- Adicionar handler `handleBonificacaoChange(rotaId, valor)` que atualiza o state
- Passar `onBonificacaoChange` para RotaDetalhes

---

### Arquivos

| Arquivo | Acao |
|---|---|
| `src/components/rotas/mockRotasData.ts` | Adicionar `entregadorId`, `lat/lng` nas paradas, coords do entregador |
| `src/components/rotas/RotaCard.tsx` | Cor na borda, bolinha, mini-cards modernos |
| `src/components/rotas/RotaDetalhes.tsx` | Cor no header, layout 50/50, input bonificacao |
| `src/components/rotas/RotaTimeline.tsx` | Ordenacao entregues primeiro, cor |
| `src/components/rotas/RotaMapaLeaflet.tsx` | Novo -- mapa Leaflet com pins coloridos |
| `src/pages/Rotas.tsx` | Integracao cores, mapa, bonificacao handler |




## Rastreio padrao para cards de pedido (PDV + Visao Geral)

Criar um componente reutilizavel `PedidoRastreio` que exibe uma mini-timeline horizontal com 3 etapas: **Rascunho → Pendente → Pronto**. O status atual determina qual bolinha fica em foco (primary) e quais ficam cinza ou mostram horario.

### Logica visual

```text
PDV (rascunho):
  ● Rascunho ─── ○ Pendente ─── ○ Pronto
  (foco)         (cinza)        (cinza)

Visao Geral (pendente):
  10:32 ─── ● Pendente ─── ○ Pronto
  (hora)    (foco)         (cinza)

Visao Geral (pronto):
  10:32 ─── 10:45 ─── ● Pronto
  (hora)    (hora)     (foco)
```

### Arquivos

**1. Criar `src/components/PedidoRastreio.tsx`**
- Props: `status: "rascunho" | "pendente" | "pronto"`, `criadoEm: Date`, `prontoEm?: Date`
- 3 bolinhas conectadas por linhas, em uma unica linha compacta (text-[10px])
- Etapa atual: bolinha primary com leve pulse/ring
- Etapas passadas: mostram `format(date, "HH:mm")` com bolinha primary solida
- Etapas futuras: bolinha cinza (muted-foreground/30)
- Linhas entre bolinhas: primary se ja passou, cinza se futuro

**2. Editar `src/components/pdv/FilaPedidoCard.tsx`**
- Importar e adicionar `<PedidoRastreio status="rascunho" criadoEm={pedido.criadoEm} />` abaixo do L4 (valor)
- Separado por `border-t border-border/50 mt-1.5 pt-1.5`

**3. Editar `src/components/visao-geral/PedidoCard.tsx`**
- Substituir o bloco de rastreio existente (linhas 148-176) pelo novo `<PedidoRastreio>`
- Passar `status={pedido.status}`, `criadoEm={pedido.criadoEm}`, `prontoEm={pedido.prontoEm}`
- Manter o timer `elapsed` separado ao lado




## Acerto de Entregadores: novo fluxo

### Conceito
Taxas já são acumuladas automaticamente conforme pedidos são finalizados. No acerto de fim de turno, o gestor só precisa definir a diária e adicionais (chuva, bonificação, etc.).

### Mudanças no card colapsado (header)
- Mostrar resumo: taxas acumuladas + bonificações de rota + qtd entregas
- Exemplo: `R$ 85,00 em taxas · R$ 12,00 bonificações · 8 entregas`
- Total à direita continua sendo taxas + bonificações + diária + extras

### Mudanças no card expandido
- Remover o grid de 3 colunas (Taxas/Bonificações/Entregas) — essa info já está no header
- Manter apenas:
  1. Input de **Diária** com label
  2. Seção **Adicionais** (renomear de "Extras") com botão Adicionar — cada linha tem descrição (ex: "Adicional chuva") + valor
  3. Separador + linha de **Total** + botão Registrar Acerto

### Arquivos editados
- `src/components/financeiro/EntregadorAcerto.tsx` — reestruturar header e conteúdo expandido


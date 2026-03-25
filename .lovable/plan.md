

## Plano: Atualizar todos os mocks para Bebidas, Adega, Tabacaria, Conveniencia e Mercearia

### Escopo

4 arquivos de mock data + Dashboard precisam ser atualizados para refletir o negocio real do usuario.

### Novas Categorias e Subcategorias

```text
cat1: Bebidas        → Refrigerantes, Sucos, Energeticos, Agua
cat2: Adega          → Cervejas, Vinhos, Destilados, Espumantes
cat3: Tabacaria      → Cigarros, Seda/Papel, Essencias, Acessorios
cat4: Conveniencia   → Snacks, Sorvetes, Doces, Descartaveis
cat5: Mercearia      → Carvao/Gelo, Enlatados, Biscoitos, Higiene
```

### Produtos (~15-18 produtos com variantes realistas)

- **Bebidas**: Coca-Cola (350ml/600ml/2L), Guarana Antarctica (350ml/2L), Red Bull (250ml/473ml), Agua Mineral (500ml/1.5L)
- **Adega**: Skol Lata, Heineken Long Neck, Brahma Litrao, Vinho Tinto Reservado, Absolut Vodka
- **Tabacaria**: Marlboro Box, Seda Smoking, Essencia Narguile, Isqueiro BIC
- **Conveniencia**: Doritos, Trident, Picole Kibon, Copo Descartavel
- **Mercearia**: Carvao 4kg, Gelo 5kg, Atum Lata, Biscoito Cream Cracker

### Arquivos a Editar

1. **`src/components/catalogo/mockCatalogoData.ts`** — Categorias, subcategorias, produtos, variantes e kits/combos todos do novo dominio
2. **`src/components/pdv/mockPdvData.ts`** — Mesmas categorias/produtos adaptados ao formato PDV. Pedidos da fila com itens do novo dominio
3. **`src/components/visao-geral/mockData.ts`** — Pedidos mock com itens de bebidas, adega, tabacaria, etc.
4. **`src/components/rotas/mockRotasData.ts`** — Paradas/itens das rotas com produtos do novo dominio
5. **`src/pages/Dashboard.tsx`** — `quickCountItems` ja esta parcialmente correto (Skol, Brahma, Carvao), ajustar os restantes

### Kits/Combos adaptados

- "Kit Churrasco" (Carvao + Gelo + Cerveja)
- "Combo Happy Hour" (Destilado + Energetico + Gelo)

### Detalhes Tecnicos

- Manter todos os IDs (`cat1`, `sub1a`, `p1`, `v1`, etc.) consistentes entre os 4 arquivos
- Interfaces e tipos nao mudam, apenas os dados mock
- Precos realistas de conveniencia/adega brasileira
- SKUs coerentes (ex: `SKL-350`, `HNK-LN`, `MRL-BOX`)


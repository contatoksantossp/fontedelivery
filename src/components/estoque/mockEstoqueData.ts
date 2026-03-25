export interface EstoqueItem {
  varianteId: string;
  produtoNome: string;
  varianteNome: string;
  sku: string;
  estoqueMinimo: number;
  estoqueAtual: number;
  categoriaId: string;
  subcategoriaId: string;
}

export type MovimentacaoTipo = "entrada" | "saida" | "perda" | "correcao";

export interface Movimentacao {
  id: string;
  dataHora: string;
  produtoNome: string;
  varianteNome: string;
  tipo: MovimentacaoTipo;
  quantidade: number;
  saldoFinal: number;
}

export interface FilaEsperaItem {
  id: string;
  clienteNome: string;
  varianteNome: string;
  dataSolicitacao: string;
  contato: string;
}

// ── Estoque Items ──────────────────────────────────────────
export const estoqueItemsMock: EstoqueItem[] = [
  // Bebidas
  { varianteId: "v1a", produtoNome: "Coca-Cola", varianteNome: "Lata 350ml", sku: "CC-350", estoqueMinimo: 48, estoqueAtual: 72, categoriaId: "cat1", subcategoriaId: "sub1a" },
  { varianteId: "v1b", produtoNome: "Coca-Cola", varianteNome: "600ml", sku: "CC-600", estoqueMinimo: 24, estoqueAtual: 18, categoriaId: "cat1", subcategoriaId: "sub1a" },
  { varianteId: "v1c", produtoNome: "Coca-Cola", varianteNome: "2L", sku: "CC-2L", estoqueMinimo: 12, estoqueAtual: 5, categoriaId: "cat1", subcategoriaId: "sub1a" },
  { varianteId: "v2a", produtoNome: "Guaraná Antarctica", varianteNome: "Lata 350ml", sku: "GA-350", estoqueMinimo: 48, estoqueAtual: 60, categoriaId: "cat1", subcategoriaId: "sub1a" },
  { varianteId: "v2b", produtoNome: "Guaraná Antarctica", varianteNome: "2L", sku: "GA-2L", estoqueMinimo: 12, estoqueAtual: 3, categoriaId: "cat1", subcategoriaId: "sub1a" },
  { varianteId: "v3a", produtoNome: "Red Bull", varianteNome: "250ml", sku: "RB-250", estoqueMinimo: 24, estoqueAtual: 30, categoriaId: "cat1", subcategoriaId: "sub1c" },
  { varianteId: "v3b", produtoNome: "Red Bull", varianteNome: "473ml", sku: "RB-473", estoqueMinimo: 12, estoqueAtual: 0, categoriaId: "cat1", subcategoriaId: "sub1c" },
  { varianteId: "v4a", produtoNome: "Água Mineral Crystal", varianteNome: "500ml", sku: "AM-500", estoqueMinimo: 48, estoqueAtual: 96, categoriaId: "cat1", subcategoriaId: "sub1d" },
  { varianteId: "v4b", produtoNome: "Água Mineral Crystal", varianteNome: "1.5L", sku: "AM-1.5", estoqueMinimo: 24, estoqueAtual: 20, categoriaId: "cat1", subcategoriaId: "sub1d" },
  // Adega
  { varianteId: "v5", produtoNome: "Skol Lata", varianteNome: "Lata 350ml", sku: "SKL-350", estoqueMinimo: 96, estoqueAtual: 144, categoriaId: "cat2", subcategoriaId: "sub2a" },
  { varianteId: "v6a", produtoNome: "Heineken", varianteNome: "Long Neck 330ml", sku: "HNK-LN", estoqueMinimo: 48, estoqueAtual: 36, categoriaId: "cat2", subcategoriaId: "sub2a" },
  { varianteId: "v6b", produtoNome: "Heineken", varianteNome: "Lata 350ml", sku: "HNK-350", estoqueMinimo: 48, estoqueAtual: 50, categoriaId: "cat2", subcategoriaId: "sub2a" },
  { varianteId: "v7", produtoNome: "Brahma Litrão", varianteNome: "1L", sku: "BRM-1L", estoqueMinimo: 24, estoqueAtual: 0, categoriaId: "cat2", subcategoriaId: "sub2a" },
  { varianteId: "v8", produtoNome: "Vinho Casillero del Diablo", varianteNome: "750ml", sku: "VCD-750", estoqueMinimo: 6, estoqueAtual: 8, categoriaId: "cat2", subcategoriaId: "sub2b" },
  { varianteId: "v9a", produtoNome: "Absolut Vodka", varianteNome: "750ml", sku: "ABS-750", estoqueMinimo: 4, estoqueAtual: 2, categoriaId: "cat2", subcategoriaId: "sub2c" },
  { varianteId: "v9b", produtoNome: "Absolut Vodka", varianteNome: "1L", sku: "ABS-1L", estoqueMinimo: 3, estoqueAtual: 1, categoriaId: "cat2", subcategoriaId: "sub2c" },
  // Tabacaria
  { varianteId: "v10", produtoNome: "Marlboro Box", varianteNome: "Maço", sku: "MRL-BOX", estoqueMinimo: 20, estoqueAtual: 25, categoriaId: "cat3", subcategoriaId: "sub3a" },
  { varianteId: "v11", produtoNome: "Seda Smoking", varianteNome: "King Size", sku: "SED-KS", estoqueMinimo: 30, estoqueAtual: 15, categoriaId: "cat3", subcategoriaId: "sub3b" },
  { varianteId: "v12a", produtoNome: "Essência Narguile", varianteNome: "50g Menta", sku: "ESS-MNT", estoqueMinimo: 10, estoqueAtual: 12, categoriaId: "cat3", subcategoriaId: "sub3c" },
  { varianteId: "v12b", produtoNome: "Essência Narguile", varianteNome: "50g Uva", sku: "ESS-UVA", estoqueMinimo: 10, estoqueAtual: 0, categoriaId: "cat3", subcategoriaId: "sub3c" },
  { varianteId: "v13", produtoNome: "Isqueiro BIC", varianteNome: "Único", sku: "BIC-ISQ", estoqueMinimo: 30, estoqueAtual: 45, categoriaId: "cat3", subcategoriaId: "sub3d" },
  // Conveniência
  { varianteId: "v14a", produtoNome: "Doritos", varianteNome: "96g", sku: "DRT-96", estoqueMinimo: 20, estoqueAtual: 22, categoriaId: "cat4", subcategoriaId: "sub4a" },
  { varianteId: "v14b", produtoNome: "Doritos", varianteNome: "167g", sku: "DRT-167", estoqueMinimo: 12, estoqueAtual: 8, categoriaId: "cat4", subcategoriaId: "sub4a" },
  { varianteId: "v15", produtoNome: "Trident", varianteNome: "8 unidades", sku: "TRD-8", estoqueMinimo: 40, estoqueAtual: 55, categoriaId: "cat4", subcategoriaId: "sub4c" },
  { varianteId: "v16a", produtoNome: "Picolé Kibon", varianteNome: "Morango", sku: "PKB-MOR", estoqueMinimo: 20, estoqueAtual: 10, categoriaId: "cat4", subcategoriaId: "sub4b" },
  { varianteId: "v16b", produtoNome: "Picolé Kibon", varianteNome: "Chocolate", sku: "PKB-CHO", estoqueMinimo: 20, estoqueAtual: 18, categoriaId: "cat4", subcategoriaId: "sub4b" },
  // Mercearia
  { varianteId: "v17a", produtoNome: "Carvão Vegetal", varianteNome: "4kg", sku: "CRV-4", estoqueMinimo: 15, estoqueAtual: 20, categoriaId: "cat5", subcategoriaId: "sub5a" },
  { varianteId: "v17b", produtoNome: "Carvão Vegetal", varianteNome: "8kg", sku: "CRV-8", estoqueMinimo: 8, estoqueAtual: 4, categoriaId: "cat5", subcategoriaId: "sub5a" },
  { varianteId: "v18a", produtoNome: "Gelo", varianteNome: "5kg", sku: "GLO-5", estoqueMinimo: 30, estoqueAtual: 35, categoriaId: "cat5", subcategoriaId: "sub5a" },
  { varianteId: "v18b", produtoNome: "Gelo", varianteNome: "10kg", sku: "GLO-10", estoqueMinimo: 15, estoqueAtual: 0, categoriaId: "cat5", subcategoriaId: "sub5a" },
];

// ── Movimentações ──────────────────────────────────────────
export const movimentacoesMock: Movimentacao[] = [
  { id: "m1", dataHora: "2026-03-25T08:30:00", produtoNome: "Coca-Cola", varianteNome: "Lata 350ml", tipo: "entrada", quantidade: 48, saldoFinal: 72 },
  { id: "m2", dataHora: "2026-03-25T09:15:00", produtoNome: "Skol Lata", varianteNome: "Lata 350ml", tipo: "entrada", quantidade: 96, saldoFinal: 144 },
  { id: "m3", dataHora: "2026-03-25T10:00:00", produtoNome: "Red Bull", varianteNome: "473ml", tipo: "saida", quantidade: -12, saldoFinal: 0 },
  { id: "m4", dataHora: "2026-03-24T14:20:00", produtoNome: "Heineken", varianteNome: "Long Neck 330ml", tipo: "saida", quantidade: -24, saldoFinal: 36 },
  { id: "m5", dataHora: "2026-03-24T16:45:00", produtoNome: "Brahma Litrão", varianteNome: "1L", tipo: "saida", quantidade: -24, saldoFinal: 0 },
  { id: "m6", dataHora: "2026-03-24T11:00:00", produtoNome: "Essência Narguile", varianteNome: "50g Uva", tipo: "perda", quantidade: -5, saldoFinal: 0 },
  { id: "m7", dataHora: "2026-03-23T09:00:00", produtoNome: "Absolut Vodka", varianteNome: "750ml", tipo: "correcao", quantidade: -1, saldoFinal: 2 },
  { id: "m8", dataHora: "2026-03-23T10:30:00", produtoNome: "Gelo", varianteNome: "10kg", tipo: "saida", quantidade: -15, saldoFinal: 0 },
  { id: "m9", dataHora: "2026-03-23T13:00:00", produtoNome: "Doritos", varianteNome: "167g", tipo: "saida", quantidade: -6, saldoFinal: 8 },
  { id: "m10", dataHora: "2026-03-22T08:00:00", produtoNome: "Marlboro Box", varianteNome: "Maço", tipo: "entrada", quantidade: 30, saldoFinal: 25 },
  { id: "m11", dataHora: "2026-03-22T15:00:00", produtoNome: "Seda Smoking", varianteNome: "King Size", tipo: "saida", quantidade: -20, saldoFinal: 15 },
  { id: "m12", dataHora: "2026-03-21T10:00:00", produtoNome: "Carvão Vegetal", varianteNome: "8kg", tipo: "saida", quantidade: -6, saldoFinal: 4 },
  { id: "m13", dataHora: "2026-03-21T14:30:00", produtoNome: "Picolé Kibon", varianteNome: "Morango", tipo: "perda", quantidade: -3, saldoFinal: 10 },
  { id: "m14", dataHora: "2026-03-20T09:00:00", produtoNome: "Guaraná Antarctica", varianteNome: "2L", tipo: "saida", quantidade: -9, saldoFinal: 3 },
  { id: "m15", dataHora: "2026-03-20T11:30:00", produtoNome: "Água Mineral Crystal", varianteNome: "500ml", tipo: "entrada", quantidade: 48, saldoFinal: 96 },
];

// ── Fila de Espera ─────────────────────────────────────────
export const filaEsperaMock: FilaEsperaItem[] = [
  { id: "fe1", clienteNome: "João Silva", varianteNome: "Red Bull 473ml", dataSolicitacao: "2026-03-25T10:30:00", contato: "(11) 99876-5432" },
  { id: "fe2", clienteNome: "Maria Santos", varianteNome: "Brahma Litrão 1L", dataSolicitacao: "2026-03-24T17:00:00", contato: "(11) 98765-4321" },
  { id: "fe3", clienteNome: "Carlos Oliveira", varianteNome: "Essência Narguile 50g Uva", dataSolicitacao: "2026-03-24T12:00:00", contato: "(11) 97654-3210" },
  { id: "fe4", clienteNome: "Ana Pereira", varianteNome: "Gelo 10kg", dataSolicitacao: "2026-03-23T14:00:00", contato: "(11) 96543-2109" },
  { id: "fe5", clienteNome: "Pedro Costa", varianteNome: "Coca-Cola 2L", dataSolicitacao: "2026-03-25T11:00:00", contato: "(11) 95432-1098" },
];

export interface CaixaState {
  status: "aberto" | "fechado";
  fundoInicial: number;
  entradas: number;
  saidas: number;
  saldoEsperado: number;
  ultimoFechamento: {
    data: string;
    total: number;
  };
}

export interface EntregadorTurno {
  id: string;
  nome: string;
  veiculo: string;
  entregas: number;
  totalTaxas: number;
  totalBonificacoes: number;
  diaria: number;
  extras: { valor: number; descricao: string }[];
  pago: boolean;
}

export type TransacaoTipo = "entrada" | "saida";
export type TransacaoMetodo = "dinheiro" | "pix" | "cartao" | "qrcode";
export type TransacaoOrigem = "venda" | "acerto" | "sangria" | "reforco" | "manual";

export interface Transacao {
  id: string;
  dataHora: string;
  descricao: string;
  tipo: TransacaoTipo;
  metodo: TransacaoMetodo;
  valor: number;
  origem: TransacaoOrigem;
}

export interface VendaDiaria {
  data: string;
  vendasBruto: number;
  receitaReal: number;
  despesas: number;
  resultado: number;
  pedidos: number;
  ticketMedio: number;
}

export interface TopProduto {
  nome: string;
  unidades: number;
  valorTotal: number;
  lucro: number;
}

// ---- Mock Data ----

export const caixaStateMock: CaixaState = {
  status: "aberto",
  fundoInicial: 500,
  entradas: 3842.5,
  saidas: 1256.0,
  saldoEsperado: 2586.5,
  ultimoFechamento: {
    data: "2026-03-24T23:45:00",
    total: 2780.0,
  },
};

export const entregadoresTurnoMock: EntregadorTurno[] = [
  {
    id: "et1",
    nome: "Rafael Moto",
    veiculo: "Moto",
    entregas: 8,
    totalTaxas: 72.0,
    totalBonificacoes: 15.0,
    diaria: 80.0,
    extras: [{ valor: 10, descricao: "Gorjeta cliente VIP" }],
    pago: false,
  },
  {
    id: "et2",
    nome: "Lucas Bike",
    veiculo: "Bicicleta",
    entregas: 5,
    totalTaxas: 30.0,
    totalBonificacoes: 9.0,
    diaria: 50.0,
    extras: [],
    pago: false,
  },
  {
    id: "et3",
    nome: "Marcos Carro",
    veiculo: "Carro",
    entregas: 6,
    totalTaxas: 66.0,
    totalBonificacoes: 12.0,
    diaria: 90.0,
    extras: [{ valor: 15, descricao: "Combustível extra" }],
    pago: true,
  },
];

const hoje = new Date("2026-03-25");
function daysAgo(n: number) {
  const d = new Date(hoje);
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const transacoesMock: Transacao[] = [
  { id: "t1", dataHora: daysAgo(0), descricao: "Venda #1052 - Heineken Pack", tipo: "entrada", metodo: "pix", valor: 89.9, origem: "venda" },
  { id: "t2", dataHora: daysAgo(0), descricao: "Venda #1051 - Absolut + Red Bull", tipo: "entrada", metodo: "cartao", valor: 137.8, origem: "venda" },
  { id: "t3", dataHora: daysAgo(0), descricao: "Sangria - Depósito banco", tipo: "saida", metodo: "dinheiro", valor: 500.0, origem: "sangria" },
  { id: "t4", dataHora: daysAgo(0), descricao: "Venda #1050 - Brahma Litrão x6", tipo: "entrada", metodo: "dinheiro", valor: 54.0, origem: "venda" },
  { id: "t5", dataHora: daysAgo(0), descricao: "Reforço - Troco para caixa", tipo: "entrada", metodo: "dinheiro", valor: 200.0, origem: "reforco" },
  { id: "t6", dataHora: daysAgo(0), descricao: "Acerto Rafael Moto", tipo: "saida", metodo: "pix", valor: 177.0, origem: "acerto" },
  { id: "t7", dataHora: daysAgo(0), descricao: "Venda #1049 - Kit Churrasco", tipo: "entrada", metodo: "cartao", valor: 245.0, origem: "venda" },
  { id: "t8", dataHora: daysAgo(0), descricao: "Venda #1048 - Coca-Cola 2L x3", tipo: "entrada", metodo: "qrcode", valor: 33.0, origem: "venda" },
  { id: "t9", dataHora: daysAgo(1), descricao: "Venda #1045 - Smirnoff + Energético", tipo: "entrada", metodo: "pix", valor: 112.5, origem: "venda" },
  { id: "t10", dataHora: daysAgo(1), descricao: "Venda #1044 - Gelo 10kg x2", tipo: "entrada", metodo: "dinheiro", valor: 31.8, origem: "venda" },
  { id: "t11", dataHora: daysAgo(1), descricao: "Sangria - Pagamento fornecedor", tipo: "saida", metodo: "pix", valor: 850.0, origem: "sangria" },
  { id: "t12", dataHora: daysAgo(1), descricao: "Acerto Lucas Bike", tipo: "saida", metodo: "dinheiro", valor: 89.0, origem: "acerto" },
  { id: "t13", dataHora: daysAgo(2), descricao: "Venda #1040 - Corona Extra Pack", tipo: "entrada", metodo: "cartao", valor: 65.9, origem: "venda" },
  { id: "t14", dataHora: daysAgo(2), descricao: "Venda #1039 - Doritos + Trident", tipo: "entrada", metodo: "dinheiro", valor: 19.0, origem: "venda" },
  { id: "t15", dataHora: daysAgo(2), descricao: "Lançamento manual - Conta de luz", tipo: "saida", metodo: "pix", valor: 380.0, origem: "manual" },
  { id: "t16", dataHora: daysAgo(3), descricao: "Venda #1035 - Jack Daniels 1L", tipo: "entrada", metodo: "cartao", valor: 189.9, origem: "venda" },
  { id: "t17", dataHora: daysAgo(3), descricao: "Venda #1034 - Skol Lata x12", tipo: "entrada", metodo: "pix", valor: 47.88, origem: "venda" },
  { id: "t18", dataHora: daysAgo(4), descricao: "Venda #1030 - Whisky + Gelo", tipo: "entrada", metodo: "cartao", valor: 156.8, origem: "venda" },
  { id: "t19", dataHora: daysAgo(4), descricao: "Sangria - Banco", tipo: "saida", metodo: "dinheiro", valor: 600.0, origem: "sangria" },
  { id: "t20", dataHora: daysAgo(5), descricao: "Venda #1025 - Budweiser Pack", tipo: "entrada", metodo: "qrcode", valor: 72.0, origem: "venda" },
  { id: "t21", dataHora: daysAgo(5), descricao: "Venda #1024 - Espumante Chandon", tipo: "entrada", metodo: "cartao", valor: 119.9, origem: "venda" },
  { id: "t22", dataHora: daysAgo(6), descricao: "Venda #1020 - Carvão + Coca-Cola", tipo: "entrada", metodo: "dinheiro", valor: 56.9, origem: "venda" },
  { id: "t23", dataHora: daysAgo(6), descricao: "Acerto Marcos Carro", tipo: "saida", metodo: "pix", valor: 183.0, origem: "acerto" },
  { id: "t24", dataHora: daysAgo(7), descricao: "Venda #1015 - Amstel Pack x2", tipo: "entrada", metodo: "pix", valor: 95.8, origem: "venda" },
  { id: "t25", dataHora: daysAgo(7), descricao: "Lançamento manual - Aluguel", tipo: "saida", metodo: "pix", valor: 2500.0, origem: "manual" },
];

function generateVendasDiarias(): VendaDiaria[] {
  const vendas: VendaDiaria[] = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date(hoje);
    d.setDate(d.getDate() - i);
    const base = 2000 + Math.random() * 3000;
    const despesa = 400 + Math.random() * 800;
    const pedidos = 15 + Math.floor(Math.random() * 25);
    vendas.push({
      data: d.toISOString().split("T")[0],
      vendasBruto: Math.round(base * 100) / 100,
      receitaReal: Math.round((base * 0.88) * 100) / 100,
      despesas: Math.round(despesa * 100) / 100,
      resultado: Math.round((base * 0.88 - despesa) * 100) / 100,
      pedidos,
      ticketMedio: Math.round((base / pedidos) * 100) / 100,
    });
  }
  return vendas;
}

export const vendasDiariasMock: VendaDiaria[] = generateVendasDiarias();

export const topProdutosMock: TopProduto[] = [
  { nome: "Heineken Lata 350ml", unidades: 148, valorTotal: 1110.0, lucro: 444.0 },
  { nome: "Absolut Vodka 750ml", unidades: 32, valorTotal: 2876.8, lucro: 960.0 },
  { nome: "Brahma Litrão 1L", unidades: 96, valorTotal: 864.0, lucro: 288.0 },
  { nome: "Red Bull 473ml", unidades: 64, valorTotal: 1088.0, lucro: 384.0 },
  { nome: "Coca-Cola 2L", unidades: 78, valorTotal: 858.0, lucro: 234.0 },
  { nome: "Gelo 5kg", unidades: 110, valorTotal: 979.0, lucro: 550.0 },
  { nome: "Smirnoff Ice 275ml", unidades: 56, valorTotal: 504.0, lucro: 168.0 },
  { nome: "Jack Daniels 1L", unidades: 18, valorTotal: 3418.2, lucro: 720.0 },
  { nome: "Doritos 167g", unidades: 45, valorTotal: 540.0, lucro: 180.0 },
  { nome: "Carvão Vegetal 8kg", unidades: 38, valorTotal: 1326.2, lucro: 380.0 },
];

export const recebimentosPorMetodo = {
  dinheiro: 1245.6,
  pix: 1890.3,
  cartao: 2456.8,
  qrcode: 420.0,
};

// ---- Vendas por hora (diário) ----

export interface VendaPorHora {
  hora: string;
  valor: number;
}

export const vendasPorHoraMock: VendaPorHora[] = [
  { hora: "06h", valor: 0 },
  { hora: "07h", valor: 45 },
  { hora: "08h", valor: 120 },
  { hora: "09h", valor: 85 },
  { hora: "10h", valor: 210 },
  { hora: "11h", valor: 340 },
  { hora: "12h", valor: 520 },
  { hora: "13h", valor: 410 },
  { hora: "14h", valor: 280 },
  { hora: "15h", valor: 190 },
  { hora: "16h", valor: 310 },
  { hora: "17h", valor: 480 },
  { hora: "18h", valor: 620 },
  { hora: "19h", valor: 750 },
  { hora: "20h", valor: 890 },
  { hora: "21h", valor: 680 },
  { hora: "22h", valor: 420 },
  { hora: "23h", valor: 250 },
];

// ---- Mocks diferenciados por período ----

export const topProdutosSemanalMock: TopProduto[] = [
  { nome: "Heineken Lata 350ml", unidades: 312, valorTotal: 2340.0, lucro: 936.0 },
  { nome: "Brahma Litrão 1L", unidades: 245, valorTotal: 2205.0, lucro: 735.0 },
  { nome: "Red Bull 473ml", unidades: 156, valorTotal: 2652.0, lucro: 936.0 },
  { nome: "Absolut Vodka 750ml", unidades: 68, valorTotal: 6119.2, lucro: 2040.0 },
  { nome: "Coca-Cola 2L", unidades: 198, valorTotal: 2178.0, lucro: 594.0 },
  { nome: "Gelo 5kg", unidades: 280, valorTotal: 2492.0, lucro: 1400.0 },
  { nome: "Jack Daniels 1L", unidades: 42, valorTotal: 7982.2, lucro: 1680.0 },
  { nome: "Smirnoff Ice 275ml", unidades: 134, valorTotal: 1206.0, lucro: 402.0 },
  { nome: "Carvão Vegetal 8kg", unidades: 89, valorTotal: 3105.1, lucro: 890.0 },
  { nome: "Doritos 167g", unidades: 102, valorTotal: 1224.0, lucro: 408.0 },
];

export const topProdutosMensalMock: TopProduto[] = [
  { nome: "Heineken Lata 350ml", unidades: 1240, valorTotal: 9300.0, lucro: 3720.0 },
  { nome: "Brahma Litrão 1L", unidades: 980, valorTotal: 8820.0, lucro: 2940.0 },
  { nome: "Absolut Vodka 750ml", unidades: 285, valorTotal: 25636.5, lucro: 8550.0 },
  { nome: "Red Bull 473ml", unidades: 620, valorTotal: 10540.0, lucro: 3720.0 },
  { nome: "Jack Daniels 1L", unidades: 165, valorTotal: 31363.5, lucro: 6600.0 },
  { nome: "Coca-Cola 2L", unidades: 810, valorTotal: 8910.0, lucro: 2430.0 },
  { nome: "Gelo 5kg", unidades: 1150, valorTotal: 10235.0, lucro: 5750.0 },
  { nome: "Smirnoff Ice 275ml", unidades: 540, valorTotal: 4860.0, lucro: 1620.0 },
  { nome: "Carvão Vegetal 8kg", unidades: 350, valorTotal: 12215.0, lucro: 3500.0 },
  { nome: "Doritos 167g", unidades: 420, valorTotal: 5040.0, lucro: 1680.0 },
];

export const recebimentosSemanalMock = {
  dinheiro: 4820.3,
  pix: 7560.9,
  cartao: 9840.5,
  qrcode: 1680.0,
};

export const recebimentosMensalMock = {
  dinheiro: 18950.8,
  pix: 29840.2,
  cartao: 38720.6,
  qrcode: 6520.0,
};

export interface ItemPedido {
  nome: string;
  qtd: number;
  preco: number;
  obs?: string;
}

export interface Pedido {
  id: string;
  codigo: string;
  cliente: string;
  telefone: string;
  endereco: string;
  bairro: string;
  lat: number;
  lng: number;
  tipo: "entrega" | "retirada";
  status: "pendente" | "pronto";
  criadoEm: Date;
  prontoEm?: Date;
  itens: ItemPedido[];
  subtotal: number;
  taxaEntrega: number;
  desconto: number;
  total: number;
  formaPagamento: string;
  observacoes?: string;
}

export const pedidosMock: Pedido[] = [
  {
    id: "1",
    codigo: "#1042",
    cliente: "Maria Silva",
    telefone: "(11) 98765-4321",
    endereco: "Rua das Flores, 123",
    bairro: "Centro",
    lat: -23.5505,
    lng: -46.6340,
    tipo: "entrega",
    status: "pendente",
    criadoEm: new Date(Date.now() - 15 * 60000),
    itens: [
      { nome: "Skol Lata 350ml", qtd: 12, preco: 4.50 },
      { nome: "Carvão Vegetal 4kg", qtd: 1, preco: 19.90 },
      { nome: "Gelo 5kg", qtd: 1, preco: 8.90 },
    ],
    subtotal: 82.80,
    taxaEntrega: 7.00,
    desconto: 5.00,
    total: 84.80,
    formaPagamento: "PIX",
    observacoes: "Ligar ao chegar",
  },
  {
    id: "2",
    codigo: "#1043",
    cliente: "João Oliveira",
    telefone: "(11) 91234-5678",
    endereco: "Av. Brasil, 456",
    bairro: "Jardim Paulista",
    lat: -23.5640,
    lng: -46.6520,
    tipo: "entrega",
    status: "pendente",
    criadoEm: new Date(Date.now() - 8 * 60000),
    itens: [
      { nome: "Heineken Long Neck", qtd: 6, preco: 8.50 },
      { nome: "Doritos 96g", qtd: 2, preco: 7.50 },
      { nome: "Gelo 5kg", qtd: 1, preco: 8.90 },
    ],
    subtotal: 74.90,
    taxaEntrega: 5.00,
    desconto: 0,
    total: 79.90,
    formaPagamento: "Cartão Crédito",
  },
  {
    id: "3",
    codigo: "#1044",
    cliente: "Ana Costa",
    telefone: "(11) 99876-1234",
    endereco: "Rua Ipê, 789",
    bairro: "Vila Nova",
    lat: -23.5580,
    lng: -46.6450,
    tipo: "retirada",
    status: "pendente",
    criadoEm: new Date(Date.now() - 22 * 60000),
    itens: [
      { nome: "Marlboro Box", qtd: 2, preco: 12.00 },
      { nome: "Isqueiro BIC", qtd: 1, preco: 5.00 },
      { nome: "Red Bull 250ml", qtd: 1, preco: 12.00 },
    ],
    subtotal: 41.00,
    taxaEntrega: 0,
    desconto: 0,
    total: 41.00,
    formaPagamento: "Dinheiro",
    observacoes: "Cliente retira no balcão",
  },
  {
    id: "4",
    codigo: "#1045",
    cliente: "Pedro Santos",
    telefone: "(11) 92345-6789",
    endereco: "Rua Harmonia, 55",
    bairro: "Pinheiros",
    lat: -23.5620,
    lng: -46.6880,
    tipo: "entrega",
    status: "pronto",
    criadoEm: new Date(Date.now() - 35 * 60000),
    prontoEm: new Date(Date.now() - 20 * 60000),
    itens: [
      { nome: "Absolut Vodka 750ml", qtd: 1, preco: 89.90 },
      { nome: "Red Bull 473ml", qtd: 2, preco: 17.00 },
      { nome: "Gelo 10kg", qtd: 1, preco: 15.90 },
    ],
    subtotal: 139.80,
    taxaEntrega: 8.00,
    desconto: 10.00,
    total: 137.80,
    formaPagamento: "Cartão Débito",
  },
  {
    id: "5",
    codigo: "#1046",
    cliente: "Fernanda Lima",
    telefone: "(11) 93456-7890",
    endereco: "Av. Paulista, 1000",
    bairro: "Bela Vista",
    lat: -23.5614,
    lng: -46.6558,
    tipo: "retirada",
    status: "pronto",
    criadoEm: new Date(Date.now() - 40 * 60000),
    prontoEm: new Date(Date.now() - 28 * 60000),
    itens: [
      { nome: "Vinho Casillero del Diablo 750ml", qtd: 1, preco: 49.90 },
      { nome: "Trident", qtd: 1, preco: 3.50 },
    ],
    subtotal: 53.40,
    taxaEntrega: 0,
    desconto: 0,
    total: 53.40,
    formaPagamento: "PIX",
  },
  {
    id: "6",
    codigo: "#1047",
    cliente: "Carlos Mendes",
    telefone: "(11) 94567-8901",
    endereco: "Rua Augusta, 200",
    bairro: "Consolação",
    lat: -23.5530,
    lng: -46.6560,
    tipo: "entrega",
    status: "pendente",
    criadoEm: new Date(Date.now() - 3 * 60000),
    itens: [
      { nome: "Brahma Litrão 1L", qtd: 6, preco: 9.00 },
      { nome: "Carvão Vegetal 8kg", qtd: 1, preco: 34.90 },
      { nome: "Coca-Cola 2L", qtd: 2, preco: 11.00 },
    ],
    subtotal: 110.90,
    taxaEntrega: 6.00,
    desconto: 0,
    total: 116.90,
    formaPagamento: "Cartão Crédito",
    observacoes: "Deixar na portaria",
  },
  {
    id: "7",
    codigo: "#1048",
    cliente: "Lucia Ferreira",
    telefone: "(11) 95678-9012",
    endereco: "Rua Oscar Freire, 340",
    bairro: "Jardins",
    lat: -23.5660,
    lng: -46.6720,
    tipo: "entrega",
    status: "pronto",
    criadoEm: new Date(Date.now() - 25 * 60000),
    prontoEm: new Date(Date.now() - 12 * 60000),
    itens: [
      { nome: "Corona Extra 355ml", qtd: 12, preco: 7.00 },
      { nome: "Limão Siciliano", qtd: 3, preco: 2.50 },
    ],
    subtotal: 91.50,
    taxaEntrega: 5.00,
    desconto: 0,
    total: 96.50,
    formaPagamento: "PIX",
  },
  {
    id: "8",
    codigo: "#1049",
    cliente: "Roberto Almeida",
    telefone: "(11) 96789-0123",
    endereco: "Av. Rebouças, 800",
    bairro: "Pinheiros",
    lat: -23.5700,
    lng: -46.6780,
    tipo: "entrega",
    status: "pronto",
    criadoEm: new Date(Date.now() - 30 * 60000),
    prontoEm: new Date(Date.now() - 18 * 60000),
    itens: [
      { nome: "Whisky Jack Daniel's 750ml", qtd: 1, preco: 149.90 },
      { nome: "Gelo 10kg", qtd: 2, preco: 15.90 },
    ],
    subtotal: 181.70,
    taxaEntrega: 7.00,
    desconto: 15.00,
    total: 173.70,
    formaPagamento: "Cartão Crédito",
  },
];

export interface Entregador {
  id: string;
  nome: string;
  veiculo: string;
  cor: string;
}

export const entregadoresMock: Entregador[] = [
  { id: "e1", nome: "Ricardo Moto", veiculo: "Moto", cor: "#3b82f6" },
  { id: "e2", nome: "Lucas Bike", veiculo: "Bicicleta", cor: "#10b981" },
  { id: "e3", nome: "André Carro", veiculo: "Carro", cor: "#f59e0b" },
  { id: "e4", nome: "Felipe Souza", veiculo: "Moto", cor: "#8b5cf6" },
  { id: "e5", nome: "Marcos Silva", veiculo: "Carro", cor: "#ec4899" },
  { id: "e6", nome: "Diego Costa", veiculo: "Bicicleta", cor: "#ef4444" },
];

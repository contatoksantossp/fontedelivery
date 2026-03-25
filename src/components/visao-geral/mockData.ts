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
  tipo: "entrega" | "retirada";
  status: "pendente" | "pronto";
  criadoEm: Date;
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
    tipo: "entrega",
    status: "pronto",
    criadoEm: new Date(Date.now() - 35 * 60000),
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
    tipo: "retirada",
    status: "pronto",
    criadoEm: new Date(Date.now() - 40 * 60000),
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
];

export interface Entregador {
  id: string;
  nome: string;
  veiculo: string;
}

export const entregadoresMock: Entregador[] = [
  { id: "e1", nome: "Ricardo Moto", veiculo: "Moto" },
  { id: "e2", nome: "Lucas Bike", veiculo: "Bicicleta" },
  { id: "e3", nome: "André Carro", veiculo: "Carro" },
];

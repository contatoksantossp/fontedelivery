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
      { nome: "X-Burger Duplo", qtd: 2, preco: 28.9 },
      { nome: "Batata Frita G", qtd: 1, preco: 18.0 },
      { nome: "Coca-Cola 600ml", qtd: 2, preco: 8.0 },
    ],
    subtotal: 83.8,
    taxaEntrega: 7.0,
    desconto: 5.0,
    total: 85.8,
    formaPagamento: "PIX",
    observacoes: "Sem cebola no burger",
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
      { nome: "Pizza Margherita", qtd: 1, preco: 45.0 },
      { nome: "Guaraná 2L", qtd: 1, preco: 12.0 },
    ],
    subtotal: 57.0,
    taxaEntrega: 5.0,
    desconto: 0,
    total: 62.0,
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
      { nome: "Açaí 500ml", qtd: 1, preco: 22.0, obs: "Com granola e banana" },
      { nome: "Açaí 300ml", qtd: 1, preco: 16.0 },
    ],
    subtotal: 38.0,
    taxaEntrega: 0,
    desconto: 0,
    total: 38.0,
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
      { nome: "Combo Família", qtd: 1, preco: 89.9 },
      { nome: "Suco Natural 1L", qtd: 2, preco: 14.0 },
    ],
    subtotal: 117.9,
    taxaEntrega: 8.0,
    desconto: 10.0,
    total: 115.9,
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
      { nome: "Salada Caesar", qtd: 1, preco: 32.0 },
      { nome: "Água Mineral", qtd: 1, preco: 5.0 },
    ],
    subtotal: 37.0,
    taxaEntrega: 0,
    desconto: 0,
    total: 37.0,
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
      { nome: "Hambúrguer Artesanal", qtd: 1, preco: 35.0 },
      { nome: "Onion Rings", qtd: 1, preco: 15.0 },
      { nome: "Milkshake Ovomaltine", qtd: 1, preco: 19.0 },
    ],
    subtotal: 69.0,
    taxaEntrega: 6.0,
    desconto: 0,
    total: 75.0,
    formaPagamento: "Cartão Crédito",
    observacoes: "Ponto da carne: mal passado",
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

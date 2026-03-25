import { ItemPedido } from "@/components/visao-geral/mockData";

export type RotaStatus = "pendente" | "em_rota" | "finalizada" | "concluida";
export type ParadaStatus = "pendente" | "entregue";

export interface Parada {
  id: string;
  pedidoCodigo: string;
  cliente: string;
  telefone: string;
  endereco: string;
  bairro: string;
  km: number;
  taxaEntrega: number;
  totalPedido: number;
  itens: ItemPedido[];
  formaPagamento: string;
  observacoes?: string;
  paradaStatus: ParadaStatus;
  baixaRealizada?: boolean;
}

export interface Rota {
  id: string;
  entregadorNome: string;
  entregadorVeiculo: string;
  paradas: Parada[];
  status: RotaStatus;
  acaoAnterior: string;
  proximaAcao: string;
  tempoEstimado: number; // minutos
  kmTotal: number;
  bonificacao: number;
}

export const rotasMock: Rota[] = [
  {
    id: "r1",
    entregadorNome: "Ricardo Moto",
    entregadorVeiculo: "Moto",
    status: "em_rota",
    acaoAnterior: "Saiu da loja",
    proximaAcao: "Rua das Flores, 123 — Maria Silva",
    tempoEstimado: 35,
    kmTotal: 12.4,
    bonificacao: 5.0,
    paradas: [
      {
        id: "p1",
        pedidoCodigo: "#1042",
        cliente: "Maria Silva",
        telefone: "(11) 98765-4321",
        endereco: "Rua das Flores, 123",
        bairro: "Centro",
        km: 3.2,
        taxaEntrega: 7.0,
        totalPedido: 85.8,
        itens: [
          { nome: "X-Burger Duplo", qtd: 2, preco: 28.9 },
          { nome: "Batata Frita G", qtd: 1, preco: 18.0 },
          { nome: "Coca-Cola 600ml", qtd: 2, preco: 8.0 },
        ],
        formaPagamento: "PIX",
        observacoes: "Sem cebola no burger",
        paradaStatus: "pendente",
      },
      {
        id: "p2",
        pedidoCodigo: "#1043",
        cliente: "João Oliveira",
        telefone: "(11) 91234-5678",
        endereco: "Av. Brasil, 456",
        bairro: "Jardim Paulista",
        km: 5.1,
        taxaEntrega: 5.0,
        totalPedido: 62.0,
        itens: [
          { nome: "Pizza Margherita", qtd: 1, preco: 45.0 },
          { nome: "Guaraná 2L", qtd: 1, preco: 12.0 },
        ],
        formaPagamento: "Cartão Crédito",
        paradaStatus: "pendente",
      },
      {
        id: "p3",
        pedidoCodigo: "#1045",
        cliente: "Pedro Santos",
        telefone: "(11) 92345-6789",
        endereco: "Rua Harmonia, 55",
        bairro: "Pinheiros",
        km: 4.1,
        taxaEntrega: 8.0,
        totalPedido: 115.9,
        itens: [
          { nome: "Combo Família", qtd: 1, preco: 89.9 },
          { nome: "Suco Natural 1L", qtd: 2, preco: 14.0 },
        ],
        formaPagamento: "Cartão Débito",
        paradaStatus: "entregue",
      },
    ],
  },
  {
    id: "r2",
    entregadorNome: "Lucas Bike",
    entregadorVeiculo: "Bicicleta",
    status: "pendente",
    acaoAnterior: "Aguardando na loja",
    proximaAcao: "Montando rota",
    tempoEstimado: 25,
    kmTotal: 6.8,
    bonificacao: 3.0,
    paradas: [
      {
        id: "p4",
        pedidoCodigo: "#1047",
        cliente: "Carlos Mendes",
        telefone: "(11) 94567-8901",
        endereco: "Rua Augusta, 200",
        bairro: "Consolação",
        km: 2.8,
        taxaEntrega: 6.0,
        totalPedido: 75.0,
        itens: [
          { nome: "Hambúrguer Artesanal", qtd: 1, preco: 35.0 },
          { nome: "Onion Rings", qtd: 1, preco: 15.0 },
          { nome: "Milkshake Ovomaltine", qtd: 1, preco: 19.0 },
        ],
        formaPagamento: "Cartão Crédito",
        observacoes: "Ponto da carne: mal passado",
        paradaStatus: "pendente",
      },
      {
        id: "p5",
        pedidoCodigo: "#1048",
        cliente: "Lucia Ferreira",
        telefone: "(11) 95678-9012",
        endereco: "Rua Oscar Freire, 340",
        bairro: "Jardins",
        km: 4.0,
        taxaEntrega: 5.0,
        totalPedido: 48.0,
        itens: [
          { nome: "Wrap de Frango", qtd: 2, preco: 19.0 },
          { nome: "Suco Detox", qtd: 1, preco: 10.0 },
        ],
        formaPagamento: "PIX",
        paradaStatus: "pendente",
      },
    ],
  },
  {
    id: "r3",
    entregadorNome: "André Carro",
    entregadorVeiculo: "Carro",
    status: "finalizada",
    acaoAnterior: "Retornou à loja",
    proximaAcao: "Aguardando acerto",
    tempoEstimado: 45,
    kmTotal: 18.5,
    bonificacao: 8.0,
    paradas: [
      {
        id: "p6",
        pedidoCodigo: "#1038",
        cliente: "Roberta Alves",
        telefone: "(11) 96789-0123",
        endereco: "Av. Rebouças, 1200",
        bairro: "Pinheiros",
        km: 6.2,
        taxaEntrega: 9.0,
        totalPedido: 92.0,
        itens: [
          { nome: "Pizza Calabresa G", qtd: 1, preco: 55.0 },
          { nome: "Pizza Mussarela M", qtd: 1, preco: 35.0 },
        ],
        formaPagamento: "Dinheiro",
        paradaStatus: "entregue",
      },
      {
        id: "p7",
        pedidoCodigo: "#1039",
        cliente: "Marcos Vinícius",
        telefone: "(11) 97890-1234",
        endereco: "Rua Teodoro Sampaio, 800",
        bairro: "Pinheiros",
        km: 3.8,
        taxaEntrega: 7.0,
        totalPedido: 58.5,
        itens: [
          { nome: "X-Salada", qtd: 1, preco: 22.0 },
          { nome: "X-Bacon", qtd: 1, preco: 26.5 },
          { nome: "Refrigerante Lata", qtd: 2, preco: 5.0 },
        ],
        formaPagamento: "PIX",
        paradaStatus: "entregue",
      },
      {
        id: "p8",
        pedidoCodigo: "#1040",
        cliente: "Juliana Costa",
        telefone: "(11) 98901-2345",
        endereco: "Rua Henrique Schaumann, 150",
        bairro: "Cerqueira César",
        km: 8.5,
        taxaEntrega: 10.0,
        totalPedido: 134.0,
        itens: [
          { nome: "Combo Premium", qtd: 1, preco: 99.0 },
          { nome: "Sobremesa Brownie", qtd: 2, preco: 15.0 },
          { nome: "Água Mineral", qtd: 1, preco: 5.0 },
        ],
        formaPagamento: "Cartão Crédito",
        observacoes: "Entregar no portão lateral",
        paradaStatus: "entregue",
      },
    ],
  },
  {
    id: "r4",
    entregadorNome: "Ricardo Moto",
    entregadorVeiculo: "Moto",
    status: "concluida",
    acaoAnterior: "Acerto realizado",
    proximaAcao: "—",
    tempoEstimado: 30,
    kmTotal: 9.2,
    bonificacao: 4.0,
    paradas: [
      {
        id: "p9",
        pedidoCodigo: "#1030",
        cliente: "Felipe Souza",
        telefone: "(11) 99012-3456",
        endereco: "Rua Fradique Coutinho, 500",
        bairro: "Vila Madalena",
        km: 4.5,
        taxaEntrega: 6.0,
        totalPedido: 45.0,
        itens: [
          { nome: "Açaí 500ml", qtd: 1, preco: 22.0 },
          { nome: "Açaí 300ml", qtd: 1, preco: 16.0 },
        ],
        formaPagamento: "PIX",
        paradaStatus: "entregue",
        baixaRealizada: true,
      },
      {
        id: "p10",
        pedidoCodigo: "#1031",
        cliente: "Camila Ramos",
        telefone: "(11) 90123-4567",
        endereco: "Rua Mourato Coelho, 250",
        bairro: "Vila Madalena",
        km: 4.7,
        taxaEntrega: 6.0,
        totalPedido: 67.0,
        itens: [
          { nome: "Hambúrguer Duplo", qtd: 1, preco: 38.0 },
          { nome: "Batata Rústica", qtd: 1, preco: 16.0 },
          { nome: "Refrigerante 600ml", qtd: 1, preco: 7.0 },
        ],
        formaPagamento: "Dinheiro",
        paradaStatus: "entregue",
        baixaRealizada: true,
      },
    ],
  },
];

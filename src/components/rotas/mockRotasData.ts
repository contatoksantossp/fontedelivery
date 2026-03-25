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
  tempoEstimado: number;
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
        totalPedido: 84.80,
        itens: [
          { nome: "Skol Lata 350ml", qtd: 12, preco: 4.50 },
          { nome: "Carvão Vegetal 4kg", qtd: 1, preco: 19.90 },
          { nome: "Gelo 5kg", qtd: 1, preco: 8.90 },
        ],
        formaPagamento: "PIX",
        observacoes: "Ligar ao chegar",
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
        totalPedido: 79.90,
        itens: [
          { nome: "Heineken Long Neck", qtd: 6, preco: 8.50 },
          { nome: "Doritos 96g", qtd: 2, preco: 7.50 },
          { nome: "Gelo 5kg", qtd: 1, preco: 8.90 },
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
        totalPedido: 137.80,
        itens: [
          { nome: "Absolut Vodka 750ml", qtd: 1, preco: 89.90 },
          { nome: "Red Bull 473ml", qtd: 2, preco: 17.00 },
          { nome: "Gelo 10kg", qtd: 1, preco: 15.90 },
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
        totalPedido: 116.90,
        itens: [
          { nome: "Brahma Litrão 1L", qtd: 6, preco: 9.00 },
          { nome: "Carvão Vegetal 8kg", qtd: 1, preco: 34.90 },
          { nome: "Coca-Cola 2L", qtd: 2, preco: 11.00 },
        ],
        formaPagamento: "Cartão Crédito",
        observacoes: "Deixar na portaria",
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
        totalPedido: 62.50,
        itens: [
          { nome: "Heineken Lata 350ml", qtd: 6, preco: 7.50 },
          { nome: "Doritos 167g", qtd: 1, preco: 12.00 },
          { nome: "Trident", qtd: 2, preco: 3.50 },
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
        totalPedido: 134.80,
        itens: [
          { nome: "Absolut Vodka 1L", qtd: 1, preco: 109.90 },
          { nome: "Red Bull 250ml", qtd: 2, preco: 12.00 },
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
        totalPedido: 68.90,
        itens: [
          { nome: "Skol Lata 350ml", qtd: 12, preco: 4.50 },
          { nome: "Essência Narguile Menta", qtd: 1, preco: 18.00 },
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
        totalPedido: 149.70,
        itens: [
          { nome: "Vinho Casillero del Diablo 750ml", qtd: 2, preco: 49.90 },
          { nome: "Água Mineral 1.5L", qtd: 2, preco: 4.00 },
          { nome: "Carvão Vegetal 4kg", qtd: 1, preco: 19.90 },
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
        totalPedido: 53.50,
        itens: [
          { nome: "Coca-Cola Lata 350ml", qtd: 6, preco: 5.00 },
          { nome: "Marlboro Box", qtd: 1, preco: 12.00 },
          { nome: "Isqueiro BIC", qtd: 1, preco: 5.00 },
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
        totalPedido: 78.40,
        itens: [
          { nome: "Brahma Litrão 1L", qtd: 6, preco: 9.00 },
          { nome: "Gelo 5kg", qtd: 1, preco: 8.90 },
          { nome: "Doritos 167g", qtd: 1, preco: 12.00 },
        ],
        formaPagamento: "Dinheiro",
        paradaStatus: "entregue",
        baixaRealizada: true,
      },
    ],
  },
];

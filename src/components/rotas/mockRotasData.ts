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
  lat: number;
  lng: number;
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
  entregadorId: string;
  entregadorNome: string;
  entregadorVeiculo: string;
  entregadorLat: number;
  entregadorLng: number;
  paradas: Parada[];
  status: RotaStatus;
  acaoAnterior: string;
  proximaAcao: string;
  tempoEstimado: number;
  kmTotal: number;
  bonificacao: number;
  inicioRota?: string;
  fimRota?: string;
}

export const rotasMock: Rota[] = [
  {
    id: "r1",
    entregadorId: "e1",
    entregadorNome: "Ricardo Moto",
    entregadorVeiculo: "Moto",
    entregadorLat: -23.556,
    entregadorLng: -46.64,
    status: "em_rota",
    acaoAnterior: "Saiu da loja",
    proximaAcao: "Rua das Flores, 123 — Maria Silva",
    tempoEstimado: 35,
    kmTotal: 12.4,
    bonificacao: 5.0,
    inicioRota: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
    paradas: [
      {
        id: "p1",
        pedidoCodigo: "#1042",
        cliente: "Maria Silva",
        telefone: "(11) 98765-4321",
        endereco: "Rua das Flores, 123",
        bairro: "Centro",
        lat: -23.5505,
        lng: -46.634,
        km: 3.2,
        taxaEntrega: 7.0,
        totalPedido: 84.8,
        itens: [
          { nome: "Skol Lata 350ml", qtd: 12, preco: 4.5 },
          { nome: "Carvão Vegetal 4kg", qtd: 1, preco: 19.9 },
          { nome: "Gelo 5kg", qtd: 1, preco: 8.9 },
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
        lat: -23.564,
        lng: -46.652,
        km: 5.1,
        taxaEntrega: 5.0,
        totalPedido: 79.9,
        itens: [
          { nome: "Heineken Long Neck", qtd: 6, preco: 8.5 },
          { nome: "Doritos 96g", qtd: 2, preco: 7.5 },
          { nome: "Gelo 5kg", qtd: 1, preco: 8.9 },
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
        lat: -23.562,
        lng: -46.688,
        km: 4.1,
        taxaEntrega: 8.0,
        totalPedido: 137.8,
        itens: [
          { nome: "Absolut Vodka 750ml", qtd: 1, preco: 89.9 },
          { nome: "Red Bull 473ml", qtd: 2, preco: 17.0 },
          { nome: "Gelo 10kg", qtd: 1, preco: 15.9 },
        ],
        formaPagamento: "Cartão Débito",
        paradaStatus: "entregue",
      },
    ],
  },
  {
    id: "r2",
    entregadorId: "e2",
    entregadorNome: "Lucas Bike",
    entregadorVeiculo: "Bicicleta",
    entregadorLat: -23.558,
    entregadorLng: -46.66,
    status: "pendente",
    acaoAnterior: "Aguardando na loja",
    proximaAcao: "Montando rota",
    tempoEstimado: 25,
    kmTotal: 6.8,
    bonificacao: 3.0,
    inicioRota: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    paradas: [
      {
        id: "p4",
        pedidoCodigo: "#1047",
        cliente: "Carlos Mendes",
        telefone: "(11) 94567-8901",
        endereco: "Rua Augusta, 200",
        bairro: "Consolação",
        lat: -23.553,
        lng: -46.656,
        km: 2.8,
        taxaEntrega: 6.0,
        totalPedido: 116.9,
        itens: [
          { nome: "Brahma Litrão 1L", qtd: 6, preco: 9.0 },
          { nome: "Carvão Vegetal 8kg", qtd: 1, preco: 34.9 },
          { nome: "Coca-Cola 2L", qtd: 2, preco: 11.0 },
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
        lat: -23.566,
        lng: -46.672,
        km: 4.0,
        taxaEntrega: 5.0,
        totalPedido: 62.5,
        itens: [
          { nome: "Heineken Lata 350ml", qtd: 6, preco: 7.5 },
          { nome: "Doritos 167g", qtd: 1, preco: 12.0 },
          { nome: "Trident", qtd: 2, preco: 3.5 },
        ],
        formaPagamento: "PIX",
        paradaStatus: "pendente",
      },
    ],
  },
  {
    id: "r3",
    entregadorId: "e3",
    entregadorNome: "André Carro",
    entregadorVeiculo: "Carro",
    entregadorLat: -23.565,
    entregadorLng: -46.675,
    status: "finalizada",
    acaoAnterior: "Retornou à loja",
    proximaAcao: "Aguardando acerto",
    tempoEstimado: 45,
    kmTotal: 18.5,
    bonificacao: 8.0,
    inicioRota: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
    fimRota: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    paradas: [
      {
        id: "p6",
        pedidoCodigo: "#1038",
        cliente: "Roberta Alves",
        telefone: "(11) 96789-0123",
        endereco: "Av. Rebouças, 1200",
        bairro: "Pinheiros",
        lat: -23.57,
        lng: -46.678,
        km: 6.2,
        taxaEntrega: 9.0,
        totalPedido: 134.8,
        itens: [
          { nome: "Absolut Vodka 1L", qtd: 1, preco: 109.9 },
          { nome: "Red Bull 250ml", qtd: 2, preco: 12.0 },
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
        lat: -23.563,
        lng: -46.68,
        km: 3.8,
        taxaEntrega: 7.0,
        totalPedido: 68.9,
        itens: [
          { nome: "Skol Lata 350ml", qtd: 12, preco: 4.5 },
          { nome: "Essência Narguile Menta", qtd: 1, preco: 18.0 },
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
        lat: -23.561,
        lng: -46.671,
        km: 8.5,
        taxaEntrega: 10.0,
        totalPedido: 149.7,
        itens: [
          { nome: "Vinho Casillero del Diablo 750ml", qtd: 2, preco: 49.9 },
          { nome: "Água Mineral 1.5L", qtd: 2, preco: 4.0 },
          { nome: "Carvão Vegetal 4kg", qtd: 1, preco: 19.9 },
        ],
        formaPagamento: "Cartão Crédito",
        observacoes: "Entregar no portão lateral",
        paradaStatus: "entregue",
      },
    ],
  },
  {
    id: "r4",
    entregadorId: "e1",
    entregadorNome: "Ricardo Moto",
    entregadorVeiculo: "Moto",
    entregadorLat: -23.558,
    entregadorLng: -46.66,
    status: "concluida",
    acaoAnterior: "Acerto realizado",
    proximaAcao: "—",
    tempoEstimado: 30,
    kmTotal: 9.2,
    bonificacao: 4.0,
    inicioRota: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    fimRota: new Date(Date.now() - 80 * 60 * 1000).toISOString(),
    paradas: [
      {
        id: "p9",
        pedidoCodigo: "#1030",
        cliente: "Felipe Souza",
        telefone: "(11) 99012-3456",
        endereco: "Rua Fradique Coutinho, 500",
        bairro: "Vila Madalena",
        lat: -23.555,
        lng: -46.691,
        km: 4.5,
        taxaEntrega: 6.0,
        totalPedido: 53.5,
        itens: [
          { nome: "Coca-Cola Lata 350ml", qtd: 6, preco: 5.0 },
          { nome: "Marlboro Box", qtd: 1, preco: 12.0 },
          { nome: "Isqueiro BIC", qtd: 1, preco: 5.0 },
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
        lat: -23.557,
        lng: -46.689,
        km: 4.7,
        taxaEntrega: 6.0,
        totalPedido: 78.4,
        itens: [
          { nome: "Brahma Litrão 1L", qtd: 6, preco: 9.0 },
          { nome: "Gelo 5kg", qtd: 1, preco: 8.9 },
          { nome: "Doritos 167g", qtd: 1, preco: 12.0 },
        ],
        formaPagamento: "Dinheiro",
        paradaStatus: "entregue",
        baixaRealizada: true,
      },
    ],
  },
];

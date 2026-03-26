export interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  complemento?: string;
  principal: boolean;
}

export interface Cliente {
  id: string;
  nome: string;
  apelido?: string;
  telefone: string;
  enderecos: Endereco[];
  dataCadastro: string;
}

export interface Colaborador {
  id: string;
  clienteId: string;
  cargo: string;
  dataInicio: string;
  ativo: boolean;
}

export interface Entregador {
  id: string;
  clienteId: string;
  veiculo: string;
  online: boolean;
  totalMes: number;
  cor: string;
}

export interface ItemCompra {
  nome: string;
  qtd: number;
  valorUnit: number;
}

export interface HistoricoCompra {
  data: string;
  descricao: string;
  valor: number;
  itens: ItemCompra[];
}

export interface Fornecedor {
  id: string;
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  contatoNome: string;
  telefone: string;
  endereco: string;
  historico: HistoricoCompra[];
}

export const clientesMock: Cliente[] = [
  {
    id: "cl1",
    nome: "Maria Silva",
    apelido: "Mari",
    telefone: "(11) 98765-4321",
    enderecos: [
      { rua: "Rua das Flores", numero: "123", bairro: "Centro", principal: true },
      { rua: "Av. Paulista", numero: "900", bairro: "Bela Vista", complemento: "Apto 42", principal: false },
    ],
    dataCadastro: "2024-01-15",
  },
  {
    id: "cl2",
    nome: "João Oliveira",
    apelido: "Jão",
    telefone: "(11) 91234-5678",
    enderecos: [
      { rua: "Av. Brasil", numero: "456", bairro: "Jardim Paulista", principal: true },
    ],
    dataCadastro: "2024-02-10",
  },
  {
    id: "cl3",
    nome: "Pedro Santos",
    telefone: "(11) 92345-6789",
    enderecos: [
      { rua: "Rua Harmonia", numero: "55", bairro: "Pinheiros", principal: true },
    ],
    dataCadastro: "2024-03-05",
  },
  {
    id: "cl4",
    nome: "Ricardo Moto",
    apelido: "Rico",
    telefone: "(11) 93456-7890",
    enderecos: [
      { rua: "Rua Augusta", numero: "1200", bairro: "Consolação", principal: true },
    ],
    dataCadastro: "2023-11-20",
  },
  {
    id: "cl5",
    nome: "Lucas Bike",
    telefone: "(11) 94567-8901",
    enderecos: [
      { rua: "Rua Oscar Freire", numero: "340", bairro: "Jardins", principal: true },
    ],
    dataCadastro: "2024-01-08",
  },
  {
    id: "cl6",
    nome: "André Carro",
    apelido: "Dedé",
    telefone: "(11) 95678-9012",
    enderecos: [
      { rua: "Av. Rebouças", numero: "1200", bairro: "Pinheiros", principal: true },
    ],
    dataCadastro: "2023-12-01",
  },
  {
    id: "cl7",
    nome: "Roberta Alves",
    apelido: "Berta",
    telefone: "(11) 96789-0123",
    enderecos: [
      { rua: "Av. Rebouças", numero: "800", bairro: "Pinheiros", principal: true },
    ],
    dataCadastro: "2024-04-12",
  },
  {
    id: "cl8",
    nome: "Carlos Mendes",
    telefone: "(11) 97890-1234",
    enderecos: [
      { rua: "Rua Augusta", numero: "200", bairro: "Consolação", principal: true },
    ],
    dataCadastro: "2024-05-20",
  },
  {
    id: "cl9",
    nome: "Felipe Souza",
    apelido: "Lipe",
    telefone: "(11) 99012-3456",
    enderecos: [
      { rua: "Rua Fradique Coutinho", numero: "500", bairro: "Vila Madalena", principal: true },
    ],
    dataCadastro: "2024-06-01",
  },
  {
    id: "cl10",
    nome: "Camila Ramos",
    apelido: "Cami",
    telefone: "(11) 90123-4567",
    enderecos: [
      { rua: "Rua Mourato Coelho", numero: "250", bairro: "Vila Madalena", principal: true },
      { rua: "Rua Girassol", numero: "80", bairro: "Vila Madalena", complemento: "Casa 2", principal: false },
    ],
    dataCadastro: "2024-02-28",
  },
];

export const colaboradoresMock: Colaborador[] = [
  { id: "co1", clienteId: "cl7", cargo: "Atendente", dataInicio: "2024-04-15", ativo: true },
  { id: "co2", clienteId: "cl8", cargo: "Estoquista", dataInicio: "2024-05-25", ativo: true },
  { id: "co3", clienteId: "cl9", cargo: "Caixa", dataInicio: "2024-06-10", ativo: true },
];

export const entregadoresMock: Entregador[] = [
  { id: "en1", clienteId: "cl4", veiculo: "Moto", online: true, totalMes: 1250.0, cor: "#3b82f6" },
  { id: "en2", clienteId: "cl5", veiculo: "Bicicleta", online: false, totalMes: 680.0, cor: "#10b981" },
  { id: "en3", clienteId: "cl6", veiculo: "Carro", online: false, totalMes: 1890.0, cor: "#f59e0b" },
];

export const fornecedoresMock: Fornecedor[] = [
  {
    id: "fo1",
    nomeFantasia: "Distribuidora Geladão",
    razaoSocial: "Geladão Distribuidora de Bebidas LTDA",
    cnpj: "12.345.678/0001-90",
    contatoNome: "Sérgio Lima",
    telefone: "(11) 3456-7890",
    endereco: "Av. Industrial, 3000 — Santo André/SP",
    historico: [
      { data: "2025-03-10", descricao: "Cervejas — lote mensal", valor: 12500.0, itens: [
        { nome: "Cerveja Pilsen 600ml", qtd: 200, valorUnit: 4.5 },
        { nome: "Cerveja IPA 355ml", qtd: 100, valorUnit: 8.5 },
        { nome: "Cerveja Weiss 500ml", qtd: 80, valorUnit: 7.0 },
      ]},
      { data: "2025-02-08", descricao: "Cervejas + destilados", valor: 18200.0, itens: [
        { nome: "Cerveja Pilsen 600ml", qtd: 300, valorUnit: 4.5 },
        { nome: "Vodka 1L", qtd: 50, valorUnit: 35.0 },
        { nome: "Whisky 750ml", qtd: 30, valorUnit: 89.0 },
      ]},
      { data: "2025-01-12", descricao: "Cervejas — lote mensal", valor: 11800.0, itens: [
        { nome: "Cerveja Pilsen 600ml", qtd: 250, valorUnit: 4.5 },
        { nome: "Cerveja Lager 350ml", qtd: 150, valorUnit: 3.8 },
      ]},
    ],
  },
  {
    id: "fo2",
    nomeFantasia: "Gelo Polar",
    razaoSocial: "Polar Indústria de Gelo EIRELI",
    cnpj: "23.456.789/0001-01",
    contatoNome: "Daniela Torres",
    telefone: "(11) 2345-6789",
    endereco: "Rua do Gelo, 55 — Osasco/SP",
    historico: [
      { data: "2025-03-15", descricao: "Gelo em sacos 5kg e 10kg", valor: 3200.0, itens: [
        { nome: "Gelo saco 5kg", qtd: 200, valorUnit: 8.0 },
        { nome: "Gelo saco 10kg", qtd: 80, valorUnit: 20.0 },
      ]},
      { data: "2025-02-14", descricao: "Gelo em sacos 5kg", valor: 2100.0, itens: [
        { nome: "Gelo saco 5kg", qtd: 260, valorUnit: 8.0 },
      ]},
    ],
  },
  {
    id: "fo3",
    nomeFantasia: "Carvão Mineiro",
    razaoSocial: "Carvão Mineiro Indústria e Comércio SA",
    cnpj: "34.567.890/0001-12",
    contatoNome: "Roberto Faria",
    telefone: "(31) 3456-1234",
    endereco: "Rod. BR-040, km 52 — Sete Lagoas/MG",
    historico: [
      { data: "2025-03-01", descricao: "Carvão vegetal 4kg e 8kg", valor: 5600.0, itens: [
        { nome: "Carvão vegetal 4kg", qtd: 300, valorUnit: 12.0 },
        { nome: "Carvão vegetal 8kg", qtd: 100, valorUnit: 20.0 },
      ]},
      { data: "2025-01-20", descricao: "Carvão vegetal 4kg", valor: 3400.0, itens: [
        { nome: "Carvão vegetal 4kg", qtd: 280, valorUnit: 12.0 },
      ]},
      { data: "2024-12-05", descricao: "Carvão vegetal — lote grande", valor: 8900.0, itens: [
        { nome: "Carvão vegetal 4kg", qtd: 400, valorUnit: 12.0 },
        { nome: "Carvão vegetal 8kg", qtd: 200, valorUnit: 20.0 },
        { nome: "Acendedor 500ml", qtd: 50, valorUnit: 6.0 },
      ]},
    ],
  },
  {
    id: "fo4",
    nomeFantasia: "Snacks & Cia",
    razaoSocial: "Snacks e Companhia Distribuidora LTDA",
    cnpj: "45.678.901/0001-23",
    contatoNome: "Patrícia Gomes",
    telefone: "(11) 4567-8901",
    endereco: "Rua dos Alimentos, 800 — Guarulhos/SP",
    historico: [
      { data: "2025-03-18", descricao: "Salgadinhos e petiscos diversos", valor: 4200.0, itens: [
        { nome: "Batata chips 100g", qtd: 200, valorUnit: 5.0 },
        { nome: "Amendoim 500g", qtd: 100, valorUnit: 8.0 },
        { nome: "Salaminho 250g", qtd: 80, valorUnit: 15.0 },
      ]},
    ],
  },
];

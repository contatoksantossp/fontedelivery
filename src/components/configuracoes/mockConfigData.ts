export interface PerfilLoja {
  nomeLoja: string;
  telefone: string;
  endereco: string;
  logoUrl: string;
  lojaAberta: boolean;
}

export interface HorarioFuncionamento {
  dia: string;
  abertura: string;
  fechamento: string;
  ativo: boolean;
}

export interface FaixaKm {
  id: string;
  kmInicial: number;
  kmFinal: number;
  preco: number;
}

export const mockPerfilLoja: PerfilLoja = {
  nomeLoja: "A Fonte Delivery",
  telefone: "(11) 99999-0000",
  endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
  logoUrl: "",
  lojaAberta: true,
};

export const mockHorarios: HorarioFuncionamento[] = [
  { dia: "Segunda-feira", abertura: "08:00", fechamento: "22:00", ativo: true },
  { dia: "Terça-feira", abertura: "08:00", fechamento: "22:00", ativo: true },
  { dia: "Quarta-feira", abertura: "08:00", fechamento: "22:00", ativo: true },
  { dia: "Quinta-feira", abertura: "08:00", fechamento: "22:00", ativo: true },
  { dia: "Sexta-feira", abertura: "08:00", fechamento: "23:00", ativo: true },
  { dia: "Sábado", abertura: "09:00", fechamento: "23:00", ativo: true },
  { dia: "Domingo", abertura: "10:00", fechamento: "20:00", ativo: false },
];

export const mockFaixasCliente: FaixaKm[] = [
  { id: "fc1", kmInicial: 0, kmFinal: 3, preco: 5.0 },
  { id: "fc2", kmInicial: 3, kmFinal: 6, preco: 8.0 },
  { id: "fc3", kmInicial: 6, kmFinal: 10, preco: 12.0 },
  { id: "fc4", kmInicial: 10, kmFinal: 15, preco: 18.0 },
];

export const mockFaixasEntregador: FaixaKm[] = [
  { id: "fe1", kmInicial: 0, kmFinal: 3, preco: 4.0 },
  { id: "fe2", kmInicial: 3, kmFinal: 6, preco: 6.5 },
  { id: "fe3", kmInicial: 6, kmFinal: 10, preco: 9.0 },
  { id: "fe4", kmInicial: 10, kmFinal: 15, preco: 13.0 },
];

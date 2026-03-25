export interface Cupom {
  id: string;
  codigo: string;
  tipo: "percentual" | "fixo";
  valor: number;
  pedidoMinimo: number;
  totalUsos: number;
  expiracao: string;
  ativo: boolean;
}

export interface PromocaoProduto {
  produtoNome: string;
  varianteNome: string;
  precoOriginal: number;
  precoFinal: number;
}

export interface PromocaoBanner {
  id: string;
  nome: string;
  descricao: string;
  gradiente: string;
  tipoDesconto: "percentual" | "fixo" | "nenhum";
  valorDesconto: number;
  ativo: boolean;
  produtos: PromocaoProduto[];
  ordem: number;
}

export const cuponsMock: Cupom[] = [
  { id: "c1", codigo: "PRIMEIRACOMPRA", tipo: "percentual", valor: 15, pedidoMinimo: 50, totalUsos: 234, expiracao: "2026-06-30", ativo: true },
  { id: "c2", codigo: "FRETE10", tipo: "fixo", valor: 10, pedidoMinimo: 30, totalUsos: 89, expiracao: "2026-04-15", ativo: true },
  { id: "c3", codigo: "VERAO25", tipo: "percentual", valor: 25, pedidoMinimo: 100, totalUsos: 412, expiracao: "2026-03-31", ativo: false },
  { id: "c4", codigo: "FIDELIDADE20", tipo: "percentual", valor: 20, pedidoMinimo: 80, totalUsos: 56, expiracao: "2026-12-31", ativo: true },
  { id: "c5", codigo: "DESCONTO5", tipo: "fixo", valor: 5, pedidoMinimo: 0, totalUsos: 1023, expiracao: "2026-05-01", ativo: true },
  { id: "c6", codigo: "ANIVERSARIO", tipo: "percentual", valor: 30, pedidoMinimo: 60, totalUsos: 17, expiracao: "2026-04-30", ativo: false },
];

export const promocoesMock: PromocaoBanner[] = [
  {
    id: "p1",
    nome: "Festival de Cervejas",
    descricao: "Descontos especiais em cervejas artesanais e importadas",
    gradiente: "from-amber-500 to-orange-600",
    tipoDesconto: "percentual",
    valorDesconto: 20,
    ativo: true,
    ordem: 1,
    produtos: [
      { produtoNome: "IPA Artesanal", varianteNome: "Lata 473ml", precoOriginal: 18.90, precoFinal: 15.12 },
      { produtoNome: "Pilsen Premium", varianteNome: "Long Neck 355ml", precoOriginal: 12.50, precoFinal: 10.00 },
      { produtoNome: "Stout Importada", varianteNome: "Garrafa 500ml", precoOriginal: 29.90, precoFinal: 23.92 },
    ],
  },
  {
    id: "p2",
    nome: "Noite do Whisky",
    descricao: "Seleção premium de whiskies com preços imperdíveis",
    gradiente: "from-yellow-700 to-amber-900",
    tipoDesconto: "fixo",
    valorDesconto: 15,
    ativo: true,
    ordem: 2,
    produtos: [
      { produtoNome: "Whisky 12 Anos", varianteNome: "750ml", precoOriginal: 189.90, precoFinal: 174.90 },
      { produtoNome: "Bourbon Select", varianteNome: "1L", precoOriginal: 149.90, precoFinal: 134.90 },
    ],
  },
  {
    id: "p3",
    nome: "Horário Especial",
    descricao: "Promoções válidas das 17h às 20h — Happy Hour!",
    gradiente: "from-violet-500 to-purple-700",
    tipoDesconto: "nenhum",
    valorDesconto: 0,
    ativo: true,
    ordem: 3,
    produtos: [],
  },
  {
    id: "p4",
    nome: "Combo Churrasco",
    descricao: "Monte seu combo perfeito para o churrasco do fim de semana",
    gradiente: "from-red-500 to-rose-700",
    tipoDesconto: "percentual",
    valorDesconto: 10,
    ativo: false,
    ordem: 4,
    produtos: [
      { produtoNome: "Carvão Premium", varianteNome: "Saco 5kg", precoOriginal: 34.90, precoFinal: 31.41 },
      { produtoNome: "Cerveja Pack", varianteNome: "12 unidades", precoOriginal: 59.90, precoFinal: 53.91 },
      { produtoNome: "Gelo", varianteNome: "Saco 3kg", precoOriginal: 8.90, precoFinal: 8.01 },
    ],
  },
];

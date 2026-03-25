export interface Variante {
  id: string;
  nome: string;
  preco: number;
}

export interface ComboConfig {
  slots: number;
  desconto: number;
}

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoriaId: string;
  subcategoriaId: string;
  codigoBarras?: string;
  variantes: Variante[];
  comboConfig?: ComboConfig;
}

export interface Subcategoria {
  id: string;
  nome: string;
}

export interface Categoria {
  id: string;
  nome: string;
  subcategorias: Subcategoria[];
}

export interface EnderecoCliente {
  id: string;
  rua: string;
  bairro: string;
  complemento?: string;
}

export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  apelido?: string;
  enderecos: EnderecoCliente[];
}

export interface ItemCarrinho {
  id: string;
  produtoId: string;
  varianteId?: string;
  nome: string;
  varianteNome?: string;
  preco: number;
  quantidade: number;
  comboGrupoId?: string;
}

export interface Pagamento {
  id: string;
  metodo: "dinheiro" | "pix" | "cartao_credito" | "cartao_debito" | "qr";
  valor: number;
  troco?: number;
}

export type CanalVenda = "balcao" | "whatsapp" | "99food" | "ifood" | "app";
export type Modalidade = "entrega" | "retirada";

export interface PedidoFila {
  id: string;
  codigo: string;
  cliente: string;
  total: number;
  modalidade: Modalidade;
  canal: CanalVenda;
  criadoEm: Date;
  itens: ItemCarrinho[];
}

export const categoriasMock: Categoria[] = [
  {
    id: "cat1",
    nome: "Lanches",
    subcategorias: [
      { id: "sub1a", nome: "Hambúrgueres" },
      { id: "sub1b", nome: "Hot Dogs" },
    ],
  },
  {
    id: "cat2",
    nome: "Bebidas",
    subcategorias: [
      { id: "sub2a", nome: "Refrigerantes" },
      { id: "sub2b", nome: "Sucos" },
    ],
  },
  {
    id: "cat3",
    nome: "Açaí",
    subcategorias: [
      { id: "sub3a", nome: "Copos" },
      { id: "sub3b", nome: "Tigelas" },
    ],
  },
  {
    id: "cat4",
    nome: "Pizzas",
    subcategorias: [
      { id: "sub4a", nome: "Tradicionais" },
      { id: "sub4b", nome: "Especiais" },
    ],
  },
  {
    id: "cat5",
    nome: "Combos",
    subcategorias: [
      { id: "sub5a", nome: "Kits Família" },
    ],
  },
];

export const produtosMock: Produto[] = [
  {
    id: "p1", nome: "X-Burger", preco: 22.9, categoriaId: "cat1", subcategoriaId: "sub1a",
    variantes: [{ id: "v1", nome: "Único", preco: 22.9 }],
  },
  {
    id: "p2", nome: "X-Burger Duplo", preco: 28.9, categoriaId: "cat1", subcategoriaId: "sub1a",
    variantes: [{ id: "v2", nome: "Único", preco: 28.9 }],
  },
  {
    id: "p3", nome: "X-Salada", preco: 25.9, categoriaId: "cat1", subcategoriaId: "sub1a",
    variantes: [
      { id: "v3a", nome: "Simples", preco: 25.9 },
      { id: "v3b", nome: "Duplo", preco: 33.9 },
    ],
  },
  {
    id: "p4", nome: "Hot Dog Tradicional", preco: 15.0, categoriaId: "cat1", subcategoriaId: "sub1b",
    variantes: [{ id: "v4", nome: "Único", preco: 15.0 }],
  },
  {
    id: "p5", nome: "Hot Dog Especial", preco: 20.0, categoriaId: "cat1", subcategoriaId: "sub1b",
    variantes: [{ id: "v5", nome: "Único", preco: 20.0 }],
  },
  {
    id: "p6", nome: "Coca-Cola", preco: 8.0, categoriaId: "cat2", subcategoriaId: "sub2a",
    variantes: [
      { id: "v6a", nome: "350ml", preco: 6.0 },
      { id: "v6b", nome: "600ml", preco: 8.0 },
      { id: "v6c", nome: "2L", preco: 14.0 },
    ],
  },
  {
    id: "p7", nome: "Guaraná", preco: 7.0, categoriaId: "cat2", subcategoriaId: "sub2a",
    variantes: [
      { id: "v7a", nome: "350ml", preco: 5.0 },
      { id: "v7b", nome: "2L", preco: 12.0 },
    ],
  },
  {
    id: "p8", nome: "Suco Natural", preco: 14.0, categoriaId: "cat2", subcategoriaId: "sub2b",
    variantes: [
      { id: "v8a", nome: "300ml", preco: 10.0 },
      { id: "v8b", nome: "500ml", preco: 14.0 },
    ],
  },
  {
    id: "p9", nome: "Açaí Copo", preco: 16.0, categoriaId: "cat3", subcategoriaId: "sub3a",
    variantes: [
      { id: "v9a", nome: "300ml", preco: 16.0 },
      { id: "v9b", nome: "500ml", preco: 22.0 },
    ],
  },
  {
    id: "p10", nome: "Açaí Tigela", preco: 28.0, categoriaId: "cat3", subcategoriaId: "sub3b",
    variantes: [{ id: "v10", nome: "Único", preco: 28.0 }],
  },
  {
    id: "p11", nome: "Pizza Margherita", preco: 45.0, categoriaId: "cat4", subcategoriaId: "sub4a",
    variantes: [{ id: "v11", nome: "Única", preco: 45.0 }],
  },
  {
    id: "p12", nome: "Pizza Calabresa", preco: 42.0, categoriaId: "cat4", subcategoriaId: "sub4a",
    variantes: [{ id: "v12", nome: "Única", preco: 42.0 }],
  },
  {
    id: "p13", nome: "Pizza 4 Queijos", preco: 52.0, categoriaId: "cat4", subcategoriaId: "sub4b",
    variantes: [{ id: "v13", nome: "Única", preco: 52.0 }],
  },
  {
    id: "p14", nome: "Combo Família", preco: 89.9, categoriaId: "cat5", subcategoriaId: "sub5a",
    variantes: [{ id: "v14", nome: "Único", preco: 89.9 }],
    comboConfig: { slots: 3, desconto: 15 },
  },
  {
    id: "p15", nome: "Combo Casal", preco: 59.9, categoriaId: "cat5", subcategoriaId: "sub5a",
    variantes: [{ id: "v15", nome: "Único", preco: 59.9 }],
    comboConfig: { slots: 2, desconto: 10 },
  },
];

export const clientesMock: Cliente[] = [
  {
    id: "c1", nome: "Maria Silva", telefone: "(11) 98765-4321", apelido: "Mari",
    enderecos: [
      { id: "end1", rua: "Rua das Flores, 123", bairro: "Centro" },
      { id: "end2", rua: "Av. Brasil, 500", bairro: "Jardim Paulista", complemento: "Apto 42" },
    ],
  },
  {
    id: "c2", nome: "João Oliveira", telefone: "(11) 91234-5678",
    enderecos: [{ id: "end3", rua: "Av. Brasil, 456", bairro: "Jardim Paulista" }],
  },
  {
    id: "c3", nome: "Ana Costa", telefone: "(11) 99876-1234", apelido: "Aninha",
    enderecos: [{ id: "end4", rua: "Rua Ipê, 789", bairro: "Vila Nova" }],
  },
  {
    id: "c4", nome: "Pedro Santos", telefone: "(11) 92345-6789",
    enderecos: [
      { id: "end5", rua: "Rua Harmonia, 55", bairro: "Pinheiros" },
      { id: "end6", rua: "Rua Augusta, 200", bairro: "Consolação" },
    ],
  },
];

export const pedidosFilaMock: PedidoFila[] = [
  {
    id: "pf1", codigo: "#1042", cliente: "Maria Silva", total: 85.8,
    modalidade: "entrega", canal: "whatsapp", criadoEm: new Date(Date.now() - 15 * 60000),
    itens: [
      { id: "i1", produtoId: "p2", nome: "X-Burger Duplo", preco: 28.9, quantidade: 2 },
      { id: "i2", produtoId: "p6", varianteId: "v6b", nome: "Coca-Cola", varianteNome: "600ml", preco: 8.0, quantidade: 2 },
    ],
  },
  {
    id: "pf2", codigo: "#1043", cliente: "João Oliveira", total: 62.0,
    modalidade: "entrega", canal: "ifood", criadoEm: new Date(Date.now() - 8 * 60000),
    itens: [
      { id: "i3", produtoId: "p11", nome: "Pizza Margherita", preco: 45.0, quantidade: 1 },
      { id: "i4", produtoId: "p7", varianteId: "v7b", nome: "Guaraná", varianteNome: "2L", preco: 12.0, quantidade: 1 },
    ],
  },
  {
    id: "pf3", codigo: "#1044", cliente: "Ana Costa", total: 38.0,
    modalidade: "retirada", canal: "balcao", criadoEm: new Date(Date.now() - 22 * 60000),
    itens: [
      { id: "i5", produtoId: "p9", varianteId: "v9b", nome: "Açaí Copo", varianteNome: "500ml", preco: 22.0, quantidade: 1 },
      { id: "i6", produtoId: "p9", varianteId: "v9a", nome: "Açaí Copo", varianteNome: "300ml", preco: 16.0, quantidade: 1 },
    ],
  },
];

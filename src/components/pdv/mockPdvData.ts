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

// ── Categorias ──────────────────────────────────────────────
export const categoriasMock: Categoria[] = [
  {
    id: "cat1", nome: "Bebidas",
    subcategorias: [
      { id: "sub1a", nome: "Refrigerantes" },
      { id: "sub1b", nome: "Sucos" },
      { id: "sub1c", nome: "Energéticos" },
      { id: "sub1d", nome: "Água" },
    ],
  },
  {
    id: "cat2", nome: "Adega",
    subcategorias: [
      { id: "sub2a", nome: "Cervejas" },
      { id: "sub2b", nome: "Vinhos" },
      { id: "sub2c", nome: "Destilados" },
      { id: "sub2d", nome: "Espumantes" },
    ],
  },
  {
    id: "cat3", nome: "Tabacaria",
    subcategorias: [
      { id: "sub3a", nome: "Cigarros" },
      { id: "sub3b", nome: "Seda / Papel" },
      { id: "sub3c", nome: "Essências" },
      { id: "sub3d", nome: "Acessórios" },
    ],
  },
  {
    id: "cat4", nome: "Conveniência",
    subcategorias: [
      { id: "sub4a", nome: "Snacks" },
      { id: "sub4b", nome: "Sorvetes" },
      { id: "sub4c", nome: "Doces" },
      { id: "sub4d", nome: "Descartáveis" },
    ],
  },
  {
    id: "cat5", nome: "Mercearia",
    subcategorias: [
      { id: "sub5a", nome: "Carvão / Gelo" },
      { id: "sub5b", nome: "Enlatados" },
      { id: "sub5c", nome: "Biscoitos" },
      { id: "sub5d", nome: "Higiene" },
    ],
  },
];

// ── Produtos ────────────────────────────────────────────────
export const produtosMock: Produto[] = [
  // Bebidas
  {
    id: "p1", nome: "Coca-Cola", preco: 5.00, categoriaId: "cat1", subcategoriaId: "sub1a",
    codigoBarras: "7894900010015",
    variantes: [
      { id: "v1a", nome: "Lata 350ml", preco: 5.00 },
      { id: "v1b", nome: "600ml", preco: 7.00 },
      { id: "v1c", nome: "2L", preco: 11.00 },
    ],
  },
  {
    id: "p2", nome: "Guaraná Antarctica", preco: 4.50, categoriaId: "cat1", subcategoriaId: "sub1a",
    variantes: [
      { id: "v2a", nome: "Lata 350ml", preco: 4.50 },
      { id: "v2b", nome: "2L", preco: 9.00 },
    ],
  },
  {
    id: "p3", nome: "Red Bull", preco: 12.00, categoriaId: "cat1", subcategoriaId: "sub1c",
    variantes: [
      { id: "v3a", nome: "250ml", preco: 12.00 },
      { id: "v3b", nome: "473ml", preco: 17.00 },
    ],
  },
  {
    id: "p4", nome: "Água Mineral Crystal", preco: 2.50, categoriaId: "cat1", subcategoriaId: "sub1d",
    variantes: [
      { id: "v4a", nome: "500ml", preco: 2.50 },
      { id: "v4b", nome: "1.5L", preco: 4.00 },
    ],
  },
  // Adega
  {
    id: "p5", nome: "Skol Lata", preco: 4.50, categoriaId: "cat2", subcategoriaId: "sub2a",
    codigoBarras: "7891149100101",
    variantes: [{ id: "v5", nome: "Lata 350ml", preco: 4.50 }],
  },
  {
    id: "p6", nome: "Heineken", preco: 8.50, categoriaId: "cat2", subcategoriaId: "sub2a",
    variantes: [
      { id: "v6a", nome: "Long Neck 330ml", preco: 8.50 },
      { id: "v6b", nome: "Lata 350ml", preco: 7.50 },
    ],
  },
  {
    id: "p7", nome: "Brahma Litrão", preco: 9.00, categoriaId: "cat2", subcategoriaId: "sub2a",
    variantes: [{ id: "v7", nome: "1L", preco: 9.00 }],
  },
  {
    id: "p8", nome: "Vinho Casillero del Diablo", preco: 49.90, categoriaId: "cat2", subcategoriaId: "sub2b",
    variantes: [{ id: "v8", nome: "750ml", preco: 49.90 }],
  },
  {
    id: "p9", nome: "Absolut Vodka", preco: 89.90, categoriaId: "cat2", subcategoriaId: "sub2c",
    variantes: [
      { id: "v9a", nome: "750ml", preco: 89.90 },
      { id: "v9b", nome: "1L", preco: 109.90 },
    ],
  },
  // Tabacaria
  {
    id: "p10", nome: "Marlboro Box", preco: 12.00, categoriaId: "cat3", subcategoriaId: "sub3a",
    variantes: [{ id: "v10", nome: "Maço", preco: 12.00 }],
  },
  {
    id: "p11", nome: "Seda Smoking", preco: 4.00, categoriaId: "cat3", subcategoriaId: "sub3b",
    variantes: [{ id: "v11", nome: "King Size", preco: 4.00 }],
  },
  {
    id: "p12", nome: "Essência Narguile", preco: 18.00, categoriaId: "cat3", subcategoriaId: "sub3c",
    variantes: [
      { id: "v12a", nome: "50g Menta", preco: 18.00 },
      { id: "v12b", nome: "50g Uva", preco: 18.00 },
    ],
  },
  {
    id: "p13", nome: "Isqueiro BIC", preco: 5.00, categoriaId: "cat3", subcategoriaId: "sub3d",
    variantes: [{ id: "v13", nome: "Único", preco: 5.00 }],
  },
  // Conveniência
  {
    id: "p14", nome: "Doritos", preco: 7.50, categoriaId: "cat4", subcategoriaId: "sub4a",
    variantes: [
      { id: "v14a", nome: "96g", preco: 7.50 },
      { id: "v14b", nome: "167g", preco: 12.00 },
    ],
  },
  {
    id: "p15", nome: "Trident", preco: 3.50, categoriaId: "cat4", subcategoriaId: "sub4c",
    variantes: [{ id: "v15", nome: "8 unidades", preco: 3.50 }],
  },
  {
    id: "p16", nome: "Picolé Kibon", preco: 5.00, categoriaId: "cat4", subcategoriaId: "sub4b",
    variantes: [
      { id: "v16a", nome: "Morango", preco: 5.00 },
      { id: "v16b", nome: "Chocolate", preco: 6.00 },
    ],
  },
  // Mercearia
  {
    id: "p17", nome: "Carvão Vegetal", preco: 19.90, categoriaId: "cat5", subcategoriaId: "sub5a",
    variantes: [
      { id: "v17a", nome: "Saco 4kg", preco: 19.90 },
      { id: "v17b", nome: "Saco 8kg", preco: 34.90 },
    ],
  },
  {
    id: "p18", nome: "Gelo", preco: 8.90, categoriaId: "cat5", subcategoriaId: "sub5a",
    variantes: [
      { id: "v18a", nome: "Saco 5kg", preco: 8.90 },
      { id: "v18b", nome: "Saco 10kg", preco: 15.90 },
    ],
  },
  // Kits
  {
    id: "p19", nome: "Kit Churrasco", preco: 39.90, categoriaId: "cat5", subcategoriaId: "sub5a",
    variantes: [{ id: "v19", nome: "Único", preco: 39.90 }],
    comboConfig: { slots: 3, desconto: 10 },
  },
  {
    id: "p20", nome: "Combo Happy Hour", preco: 99.90, categoriaId: "cat2", subcategoriaId: "sub2c",
    variantes: [{ id: "v20", nome: "Único", preco: 99.90 }],
    comboConfig: { slots: 3, desconto: 8 },
  },
];

// ── Clientes ────────────────────────────────────────────────
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

// ── Pedidos na Fila ─────────────────────────────────────────
export const pedidosFilaMock: PedidoFila[] = [
  {
    id: "pf1", codigo: "#1042", cliente: "Maria Silva", total: 67.50,
    modalidade: "entrega", canal: "whatsapp", criadoEm: new Date(Date.now() - 15 * 60000),
    itens: [
      { id: "i1", produtoId: "p5", nome: "Skol Lata", varianteNome: "Lata 350ml", preco: 4.50, quantidade: 12 },
      { id: "i2", produtoId: "p17", varianteId: "v17a", nome: "Carvão Vegetal", varianteNome: "Saco 4kg", preco: 19.90, quantidade: 1 },
    ],
  },
  {
    id: "pf2", codigo: "#1043", cliente: "João Oliveira", total: 108.40,
    modalidade: "entrega", canal: "ifood", criadoEm: new Date(Date.now() - 8 * 60000),
    itens: [
      { id: "i3", produtoId: "p6", varianteId: "v6a", nome: "Heineken", varianteNome: "Long Neck 330ml", preco: 8.50, quantidade: 6 },
      { id: "i4", produtoId: "p14", varianteId: "v14a", nome: "Doritos", varianteNome: "96g", preco: 7.50, quantidade: 2 },
      { id: "i5", produtoId: "p18", varianteId: "v18a", nome: "Gelo", varianteNome: "Saco 5kg", preco: 8.90, quantidade: 1 },
    ],
  },
  {
    id: "pf3", codigo: "#1044", cliente: "Ana Costa", total: 28.00,
    modalidade: "retirada", canal: "balcao", criadoEm: new Date(Date.now() - 22 * 60000),
    itens: [
      { id: "i6", produtoId: "p10", varianteId: "v10", nome: "Marlboro Box", varianteNome: "Maço", preco: 12.00, quantidade: 2 },
      { id: "i7", produtoId: "p11", varianteId: "v11", nome: "Seda Smoking", varianteNome: "King Size", preco: 4.00, quantidade: 1 },
    ],
  },
];

export interface Variante {
  id: string;
  nome: string;
  preco: number;
  foto?: string;
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
  foto?: string;
  variantes: Variante[];
  comboConfig?: ComboConfig;
}

export interface Subcategoria {
  id: string;
  nome: string;
  foto?: string;
}

export interface Categoria {
  id: string;
  nome: string;
  foto?: string;
  subcategorias: Subcategoria[];
}

export interface EnderecoCache {
  id: string;
  rua: string;
  numero?: string;
  bairro: string;
  cep: string;
  cidade: string;
}

export interface EnderecoCliente {
  id: string;
  rua: string;
  numero?: string;
  bairro: string;
  cep?: string;
  cidade?: string;
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
  clienteId: string;
  enderecoId?: string;
  endereco?: string;
  total: number;
  modalidade: Modalidade;
  canal: CanalVenda;
  criadoEm: Date;
  itens: ItemCarrinho[];
  pagamentos: Pagamento[];
}

// ── Categorias ──────────────────────────────────────────────
export const categoriasMock: Categoria[] = [
  {
    id: "cat1", nome: "Bebidas", foto: "/placeholder.svg",
    subcategorias: [
      { id: "sub1a", nome: "Refrigerantes", foto: "/placeholder.svg" },
      { id: "sub1b", nome: "Sucos", foto: "/placeholder.svg" },
      { id: "sub1c", nome: "Energéticos", foto: "/placeholder.svg" },
      { id: "sub1d", nome: "Água", foto: "/placeholder.svg" },
    ],
  },
  {
    id: "cat2", nome: "Adega", foto: "/placeholder.svg",
    subcategorias: [
      { id: "sub2a", nome: "Cervejas", foto: "/placeholder.svg" },
      { id: "sub2b", nome: "Vinhos", foto: "/placeholder.svg" },
      { id: "sub2c", nome: "Destilados", foto: "/placeholder.svg" },
      { id: "sub2d", nome: "Espumantes", foto: "/placeholder.svg" },
    ],
  },
  {
    id: "cat3", nome: "Tabacaria", foto: "/placeholder.svg",
    subcategorias: [
      { id: "sub3a", nome: "Cigarros", foto: "/placeholder.svg" },
      { id: "sub3b", nome: "Seda / Papel", foto: "/placeholder.svg" },
      { id: "sub3c", nome: "Essências", foto: "/placeholder.svg" },
      { id: "sub3d", nome: "Acessórios", foto: "/placeholder.svg" },
    ],
  },
  {
    id: "cat4", nome: "Conveniência", foto: "/placeholder.svg",
    subcategorias: [
      { id: "sub4a", nome: "Snacks", foto: "/placeholder.svg" },
      { id: "sub4b", nome: "Sorvetes", foto: "/placeholder.svg" },
      { id: "sub4c", nome: "Doces", foto: "/placeholder.svg" },
      { id: "sub4d", nome: "Descartáveis", foto: "/placeholder.svg" },
    ],
  },
  {
    id: "cat5", nome: "Mercearia", foto: "/placeholder.svg",
    subcategorias: [
      { id: "sub5a", nome: "Carvão / Gelo", foto: "/placeholder.svg" },
      { id: "sub5b", nome: "Enlatados", foto: "/placeholder.svg" },
      { id: "sub5c", nome: "Biscoitos", foto: "/placeholder.svg" },
      { id: "sub5d", nome: "Higiene", foto: "/placeholder.svg" },
    ],
  },
];

// ── Produtos ────────────────────────────────────────────────
export const produtosMock: Produto[] = [
  // Bebidas
  {
    id: "p1", nome: "Coca-Cola", preco: 5.00, categoriaId: "cat1", subcategoriaId: "sub1a",
    codigoBarras: "7894900010015", foto: "/placeholder.svg",
    variantes: [
      { id: "v1a", nome: "Lata 350ml", preco: 5.00, foto: "/placeholder.svg" },
      { id: "v1b", nome: "600ml", preco: 7.00, foto: "/placeholder.svg" },
      { id: "v1c", nome: "2L", preco: 11.00, foto: "/placeholder.svg" },
    ],
  },
  {
    id: "p2", nome: "Guaraná Antarctica", preco: 4.50, categoriaId: "cat1", subcategoriaId: "sub1a",
    foto: "/placeholder.svg",
    variantes: [
      { id: "v2a", nome: "Lata 350ml", preco: 4.50, foto: "/placeholder.svg" },
      { id: "v2b", nome: "2L", preco: 9.00, foto: "/placeholder.svg" },
    ],
  },
  {
    id: "p3", nome: "Red Bull", preco: 12.00, categoriaId: "cat1", subcategoriaId: "sub1c",
    foto: "/placeholder.svg",
    variantes: [
      { id: "v3a", nome: "250ml", preco: 12.00, foto: "/placeholder.svg" },
      { id: "v3b", nome: "473ml", preco: 17.00, foto: "/placeholder.svg" },
    ],
  },
  {
    id: "p4", nome: "Água Mineral Crystal", preco: 2.50, categoriaId: "cat1", subcategoriaId: "sub1d",
    foto: "/placeholder.svg",
    variantes: [
      { id: "v4a", nome: "500ml", preco: 2.50, foto: "/placeholder.svg" },
      { id: "v4b", nome: "1.5L", preco: 4.00, foto: "/placeholder.svg" },
    ],
  },
  // Adega
  {
    id: "p5", nome: "Skol Lata", preco: 4.50, categoriaId: "cat2", subcategoriaId: "sub2a",
    codigoBarras: "7891149100101", foto: "/placeholder.svg",
    variantes: [{ id: "v5", nome: "Lata 350ml", preco: 4.50, foto: "/placeholder.svg" }],
  },
  {
    id: "p6", nome: "Heineken", preco: 8.50, categoriaId: "cat2", subcategoriaId: "sub2a",
    foto: "/placeholder.svg",
    variantes: [
      { id: "v6a", nome: "Long Neck 330ml", preco: 8.50, foto: "/placeholder.svg" },
      { id: "v6b", nome: "Lata 350ml", preco: 7.50, foto: "/placeholder.svg" },
    ],
  },
  {
    id: "p7", nome: "Brahma Litrão", preco: 9.00, categoriaId: "cat2", subcategoriaId: "sub2a",
    foto: "/placeholder.svg",
    variantes: [{ id: "v7", nome: "1L", preco: 9.00, foto: "/placeholder.svg" }],
  },
  {
    id: "p8", nome: "Vinho Casillero del Diablo", preco: 49.90, categoriaId: "cat2", subcategoriaId: "sub2b",
    foto: "/placeholder.svg",
    variantes: [{ id: "v8", nome: "750ml", preco: 49.90, foto: "/placeholder.svg" }],
  },
  {
    id: "p9", nome: "Absolut Vodka", preco: 89.90, categoriaId: "cat2", subcategoriaId: "sub2c",
    foto: "/placeholder.svg",
    variantes: [
      { id: "v9a", nome: "750ml", preco: 89.90, foto: "/placeholder.svg" },
      { id: "v9b", nome: "1L", preco: 109.90, foto: "/placeholder.svg" },
    ],
  },
  // Tabacaria
  {
    id: "p10", nome: "Marlboro Box", preco: 12.00, categoriaId: "cat3", subcategoriaId: "sub3a",
    foto: "/placeholder.svg",
    variantes: [{ id: "v10", nome: "Maço", preco: 12.00, foto: "/placeholder.svg" }],
  },
  {
    id: "p11", nome: "Seda Smoking", preco: 4.00, categoriaId: "cat3", subcategoriaId: "sub3b",
    foto: "/placeholder.svg",
    variantes: [{ id: "v11", nome: "King Size", preco: 4.00, foto: "/placeholder.svg" }],
  },
  {
    id: "p12", nome: "Essência Narguile", preco: 18.00, categoriaId: "cat3", subcategoriaId: "sub3c",
    foto: "/placeholder.svg",
    variantes: [
      { id: "v12a", nome: "50g Menta", preco: 18.00, foto: "/placeholder.svg" },
      { id: "v12b", nome: "50g Uva", preco: 18.00, foto: "/placeholder.svg" },
    ],
  },
  {
    id: "p13", nome: "Isqueiro BIC", preco: 5.00, categoriaId: "cat3", subcategoriaId: "sub3d",
    foto: "/placeholder.svg",
    variantes: [{ id: "v13", nome: "Único", preco: 5.00, foto: "/placeholder.svg" }],
  },
  // Conveniência
  {
    id: "p14", nome: "Doritos", preco: 7.50, categoriaId: "cat4", subcategoriaId: "sub4a",
    foto: "/placeholder.svg",
    variantes: [
      { id: "v14a", nome: "96g", preco: 7.50, foto: "/placeholder.svg" },
      { id: "v14b", nome: "167g", preco: 12.00, foto: "/placeholder.svg" },
    ],
  },
  {
    id: "p15", nome: "Trident", preco: 3.50, categoriaId: "cat4", subcategoriaId: "sub4c",
    foto: "/placeholder.svg",
    variantes: [{ id: "v15", nome: "8 unidades", preco: 3.50, foto: "/placeholder.svg" }],
  },
  {
    id: "p16", nome: "Picolé Kibon", preco: 5.00, categoriaId: "cat4", subcategoriaId: "sub4b",
    foto: "/placeholder.svg",
    variantes: [
      { id: "v16a", nome: "Morango", preco: 5.00, foto: "/placeholder.svg" },
      { id: "v16b", nome: "Chocolate", preco: 6.00, foto: "/placeholder.svg" },
    ],
  },
  // Mercearia
  {
    id: "p17", nome: "Carvão Vegetal", preco: 19.90, categoriaId: "cat5", subcategoriaId: "sub5a",
    foto: "/placeholder.svg",
    variantes: [
      { id: "v17a", nome: "Saco 4kg", preco: 19.90, foto: "/placeholder.svg" },
      { id: "v17b", nome: "Saco 8kg", preco: 34.90, foto: "/placeholder.svg" },
    ],
  },
  {
    id: "p18", nome: "Gelo", preco: 8.90, categoriaId: "cat5", subcategoriaId: "sub5a",
    foto: "/placeholder.svg",
    variantes: [
      { id: "v18a", nome: "Saco 5kg", preco: 8.90, foto: "/placeholder.svg" },
      { id: "v18b", nome: "Saco 10kg", preco: 15.90, foto: "/placeholder.svg" },
    ],
  },
  // Kits
  {
    id: "p19", nome: "Kit Churrasco", preco: 39.90, categoriaId: "cat5", subcategoriaId: "sub5a",
    foto: "/placeholder.svg",
    variantes: [{ id: "v19", nome: "Único", preco: 39.90, foto: "/placeholder.svg" }],
    comboConfig: { slots: 3, desconto: 10 },
  },
  {
    id: "p20", nome: "Combo Happy Hour", preco: 99.90, categoriaId: "cat2", subcategoriaId: "sub2c",
    foto: "/placeholder.svg",
    variantes: [{ id: "v20", nome: "Único", preco: 99.90, foto: "/placeholder.svg" }],
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
    id: "pf1", codigo: "#1042", cliente: "Maria Silva", clienteId: "c1", enderecoId: "end1",
    endereco: "Rua das Flores, 123 - Centro",
    total: 67.50, modalidade: "entrega", canal: "whatsapp", criadoEm: new Date(Date.now() - 15 * 60000),
    itens: [
      { id: "i1", produtoId: "p5", nome: "Skol Lata", varianteNome: "Lata 350ml", preco: 4.50, quantidade: 12 },
      { id: "i2", produtoId: "p17", varianteId: "v17a", nome: "Carvão Vegetal", varianteNome: "Saco 4kg", preco: 19.90, quantidade: 1 },
    ],
    pagamentos: [{ id: "pg1", metodo: "pix", valor: 67.50 }],
  },
  {
    id: "pf2", codigo: "#1043", cliente: "João Oliveira", clienteId: "c2", enderecoId: "end3",
    endereco: "Av. Brasil, 456 - Jardim Paulista",
    total: 108.40, modalidade: "entrega", canal: "ifood", criadoEm: new Date(Date.now() - 8 * 60000),
    itens: [
      { id: "i3", produtoId: "p6", varianteId: "v6a", nome: "Heineken", varianteNome: "Long Neck 330ml", preco: 8.50, quantidade: 6 },
      { id: "i4", produtoId: "p14", varianteId: "v14a", nome: "Doritos", varianteNome: "96g", preco: 7.50, quantidade: 2 },
      { id: "i5", produtoId: "p18", varianteId: "v18a", nome: "Gelo", varianteNome: "Saco 5kg", preco: 8.90, quantidade: 1 },
    ],
    pagamentos: [{ id: "pg2", metodo: "cartao_credito", valor: 108.40 }],
  },
  {
    id: "pf3", codigo: "#1044", cliente: "Ana Costa", clienteId: "c3",
    total: 28.00, modalidade: "retirada", canal: "balcao", criadoEm: new Date(Date.now() - 22 * 60000),
    itens: [
      { id: "i6", produtoId: "p10", varianteId: "v10", nome: "Marlboro Box", varianteNome: "Maço", preco: 12.00, quantidade: 2 },
      { id: "i7", produtoId: "p11", varianteId: "v11", nome: "Seda Smoking", varianteNome: "King Size", preco: 4.00, quantidade: 1 },
    ],
    pagamentos: [{ id: "pg3", metodo: "dinheiro", valor: 30.00, troco: 2.00 }],
  },
  {
    id: "pf4", codigo: "#1045", cliente: "Pedro Santos", clienteId: "c4", enderecoId: "end5",
    endereco: "Rua Harmonia, 55 - Pinheiros",
    total: 89.90, modalidade: "entrega", canal: "app", criadoEm: new Date(Date.now() - 5 * 60000),
    itens: [
      { id: "i8", produtoId: "p9", varianteId: "v9a", nome: "Absolut Vodka", varianteNome: "750ml", preco: 89.90, quantidade: 1 },
    ],
    pagamentos: [{ id: "pg4", metodo: "cartao_debito", valor: 89.90 }],
  },
  {
    id: "pf5", codigo: "#1046", cliente: "Maria Silva", clienteId: "c1", enderecoId: "end2",
    endereco: "Av. Brasil, 500 - Jardim Paulista",
    total: 35.50, modalidade: "entrega", canal: "whatsapp", criadoEm: new Date(Date.now() - 3 * 60000),
    itens: [
      { id: "i9", produtoId: "p1", varianteId: "v1b", nome: "Coca-Cola", varianteNome: "600ml", preco: 7.00, quantidade: 2 },
      { id: "i10", produtoId: "p14", varianteId: "v14b", nome: "Doritos", varianteNome: "167g", preco: 12.00, quantidade: 1 },
      { id: "i11", produtoId: "p15", varianteId: "v15", nome: "Trident", varianteNome: "8 unidades", preco: 3.50, quantidade: 1 },
    ],
    pagamentos: [
      { id: "pg5a", metodo: "pix", valor: 20.00 },
      { id: "pg5b", metodo: "dinheiro", valor: 15.50 },
    ],
  },
  {
    id: "pf6", codigo: "#1047", cliente: "João Oliveira", clienteId: "c2",
    total: 24.00, modalidade: "retirada", canal: "99food", criadoEm: new Date(Date.now() - 12 * 60000),
    itens: [
      { id: "i12", produtoId: "p10", varianteId: "v10", nome: "Marlboro Box", varianteNome: "Maço", preco: 12.00, quantidade: 1 },
      { id: "i13", produtoId: "p3", varianteId: "v3a", nome: "Red Bull", varianteNome: "250ml", preco: 12.00, quantidade: 1 },
    ],
    pagamentos: [{ id: "pg6", metodo: "cartao_credito", valor: 24.00 }],
  },
  {
    id: "pf7", codigo: "#1048", cliente: "Ana Costa", clienteId: "c3", enderecoId: "end4",
    endereco: "Rua Ipê, 789 - Vila Nova",
    total: 54.80, modalidade: "entrega", canal: "whatsapp", criadoEm: new Date(Date.now() - 30 * 60000),
    itens: [
      { id: "i14", produtoId: "p6", varianteId: "v6b", nome: "Heineken", varianteNome: "Lata 350ml", preco: 7.50, quantidade: 4 },
      { id: "i15", produtoId: "p18", varianteId: "v18b", nome: "Gelo", varianteNome: "Saco 10kg", preco: 15.90, quantidade: 1 },
      { id: "i16", produtoId: "p4", varianteId: "v4a", nome: "Água Mineral Crystal", varianteNome: "500ml", preco: 2.50, quantidade: 3 },
    ],
    pagamentos: [
      { id: "pg7a", metodo: "pix", valor: 30.00 },
      { id: "pg7b", metodo: "cartao_debito", valor: 24.80 },
    ],
  },
  {
    id: "pf8", codigo: "#1049", cliente: "Pedro Santos", clienteId: "c4",
    total: 19.90, modalidade: "retirada", canal: "balcao", criadoEm: new Date(Date.now() - 45 * 60000),
    itens: [
      { id: "i17", produtoId: "p17", varianteId: "v17a", nome: "Carvão Vegetal", varianteNome: "Saco 4kg", preco: 19.90, quantidade: 1 },
    ],
    pagamentos: [{ id: "pg8", metodo: "qr", valor: 19.90 }],
  },
];

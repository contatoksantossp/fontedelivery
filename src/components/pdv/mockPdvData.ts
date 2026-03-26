import { productImages, variantImages } from "@/assets/products";
import { categoryImages, subcategoryImages } from "@/assets/categories";

export interface Variante {
  id: string;
  nome: string;
  preco: number;
  foto?: string;
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
}

export interface KitComboSlot {
  id: string;
  subcategoriaId: string;
  nome: string;
}

export interface KitCombo {
  id: string;
  nome: string;
  tipo: "kit" | "combo";
  tipoDesconto: "%" | "R$";
  valorDesconto: number;
  subcategoriaVinculo: string;
  slots: KitComboSlot[];
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
  principal?: boolean;
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
    id: "cat1", nome: "Bebidas", foto: categoryImages.cat1,
    subcategorias: [
      { id: "sub1a", nome: "Refrigerantes", foto: subcategoryImages.sub1a },
      { id: "sub1b", nome: "Sucos", foto: subcategoryImages.sub1b },
      { id: "sub1c", nome: "Energéticos", foto: subcategoryImages.sub1c },
      { id: "sub1d", nome: "Água", foto: subcategoryImages.sub1d },
    ],
  },
  {
    id: "cat2", nome: "Adega", foto: categoryImages.cat2,
    subcategorias: [
      { id: "sub2a", nome: "Cervejas", foto: subcategoryImages.sub2a },
      { id: "sub2b", nome: "Vinhos", foto: subcategoryImages.sub2b },
      { id: "sub2c", nome: "Destilados", foto: subcategoryImages.sub2c },
      { id: "sub2d", nome: "Espumantes", foto: subcategoryImages.sub2d },
    ],
  },
  {
    id: "cat3", nome: "Tabacaria", foto: categoryImages.cat3,
    subcategorias: [
      { id: "sub3a", nome: "Cigarros", foto: subcategoryImages.sub3a },
      { id: "sub3b", nome: "Seda / Papel", foto: subcategoryImages.sub3b },
      { id: "sub3c", nome: "Essências", foto: subcategoryImages.sub3c },
      { id: "sub3d", nome: "Acessórios", foto: subcategoryImages.sub3d },
    ],
  },
  {
    id: "cat4", nome: "Conveniência", foto: categoryImages.cat4,
    subcategorias: [
      { id: "sub4a", nome: "Snacks", foto: subcategoryImages.sub4a },
      { id: "sub4b", nome: "Sorvetes", foto: subcategoryImages.sub4b },
      { id: "sub4c", nome: "Doces", foto: subcategoryImages.sub4c },
      { id: "sub4d", nome: "Descartáveis", foto: subcategoryImages.sub4d },
    ],
  },
  {
    id: "cat5", nome: "Mercearia", foto: categoryImages.cat5,
    subcategorias: [
      { id: "sub5a", nome: "Carvão / Gelo", foto: subcategoryImages.sub5a },
      { id: "sub5b", nome: "Enlatados", foto: subcategoryImages.sub5b },
      { id: "sub5c", nome: "Biscoitos", foto: subcategoryImages.sub5c },
      { id: "sub5d", nome: "Higiene", foto: subcategoryImages.sub5d },
    ],
  },
];

// ── Produtos ────────────────────────────────────────────────
export const produtosMock: Produto[] = [
  // Bebidas
  {
    id: "p1", nome: "Coca-Cola", preco: 5.00, categoriaId: "cat1", subcategoriaId: "sub1a",
    codigoBarras: "7894900010015", foto: productImages.p1,
    variantes: [
      { id: "v1a", nome: "Lata 350ml", preco: 5.00, foto: variantImages.v1a },
      { id: "v1b", nome: "600ml", preco: 7.00, foto: variantImages.v1b },
      { id: "v1c", nome: "2L", preco: 11.00, foto: variantImages.v1c },
    ],
  },
  {
    id: "p2", nome: "Guaraná Antarctica", preco: 4.50, categoriaId: "cat1", subcategoriaId: "sub1a",
    foto: productImages.p2,
    variantes: [
      { id: "v2a", nome: "Lata 350ml", preco: 4.50, foto: variantImages.v2a },
      { id: "v2b", nome: "2L", preco: 9.00, foto: variantImages.v2b },
    ],
  },
  {
    id: "p3", nome: "Red Bull", preco: 12.00, categoriaId: "cat1", subcategoriaId: "sub1c",
    foto: productImages.p3,
    variantes: [
      { id: "v3a", nome: "250ml", preco: 12.00, foto: variantImages.v3a },
      { id: "v3b", nome: "473ml", preco: 17.00, foto: variantImages.v3b },
    ],
  },
  {
    id: "p4", nome: "Água Mineral Crystal", preco: 2.50, categoriaId: "cat1", subcategoriaId: "sub1d",
    foto: productImages.p4,
    variantes: [
      { id: "v4a", nome: "500ml", preco: 2.50, foto: variantImages.v4a },
      { id: "v4b", nome: "1.5L", preco: 4.00, foto: variantImages.v4b },
    ],
  },
  // Adega
  {
    id: "p5", nome: "Skol Lata", preco: 4.50, categoriaId: "cat2", subcategoriaId: "sub2a",
    codigoBarras: "7891149100101", foto: productImages.p5,
    variantes: [{ id: "v5", nome: "Lata 350ml", preco: 4.50, foto: variantImages.v5 }],
  },
  {
    id: "p6", nome: "Heineken", preco: 8.50, categoriaId: "cat2", subcategoriaId: "sub2a",
    foto: productImages.p6,
    variantes: [
      { id: "v6a", nome: "Long Neck 330ml", preco: 8.50, foto: variantImages.v6a },
      { id: "v6b", nome: "Lata 350ml", preco: 7.50, foto: variantImages.v6b },
    ],
  },
  {
    id: "p7", nome: "Brahma Litrão", preco: 9.00, categoriaId: "cat2", subcategoriaId: "sub2a",
    foto: productImages.p7,
    variantes: [{ id: "v7", nome: "1L", preco: 9.00, foto: variantImages.v7 }],
  },
  {
    id: "p8", nome: "Vinho Casillero del Diablo", preco: 49.90, categoriaId: "cat2", subcategoriaId: "sub2b",
    foto: productImages.p8,
    variantes: [{ id: "v8", nome: "750ml", preco: 49.90, foto: variantImages.v8 }],
  },
  {
    id: "p9", nome: "Absolut Vodka", preco: 89.90, categoriaId: "cat2", subcategoriaId: "sub2c",
    foto: productImages.p9,
    variantes: [
      { id: "v9a", nome: "750ml", preco: 89.90, foto: variantImages.v9a },
      { id: "v9b", nome: "1L", preco: 109.90, foto: variantImages.v9b },
    ],
  },
  // Tabacaria
  {
    id: "p10", nome: "Marlboro Box", preco: 12.00, categoriaId: "cat3", subcategoriaId: "sub3a",
    foto: productImages.p10,
    variantes: [{ id: "v10", nome: "Maço", preco: 12.00, foto: variantImages.v10 }],
  },
  {
    id: "p11", nome: "Seda Smoking", preco: 4.00, categoriaId: "cat3", subcategoriaId: "sub3b",
    foto: productImages.p11,
    variantes: [{ id: "v11", nome: "King Size", preco: 4.00, foto: variantImages.v11 }],
  },
  {
    id: "p12", nome: "Essência Narguile", preco: 18.00, categoriaId: "cat3", subcategoriaId: "sub3c",
    foto: productImages.p12,
    variantes: [
      { id: "v12a", nome: "50g Menta", preco: 18.00, foto: variantImages.v12a },
      { id: "v12b", nome: "50g Uva", preco: 18.00, foto: variantImages.v12b },
    ],
  },
  {
    id: "p13", nome: "Isqueiro BIC", preco: 5.00, categoriaId: "cat3", subcategoriaId: "sub3d",
    foto: productImages.p13,
    variantes: [{ id: "v13", nome: "Único", preco: 5.00, foto: variantImages.v13 }],
  },
  // Conveniência
  {
    id: "p14", nome: "Doritos", preco: 7.50, categoriaId: "cat4", subcategoriaId: "sub4a",
    foto: productImages.p14,
    variantes: [
      { id: "v14a", nome: "96g", preco: 7.50, foto: variantImages.v14a },
      { id: "v14b", nome: "167g", preco: 12.00, foto: variantImages.v14b },
    ],
  },
  {
    id: "p15", nome: "Trident", preco: 3.50, categoriaId: "cat4", subcategoriaId: "sub4c",
    foto: productImages.p15,
    variantes: [{ id: "v15", nome: "8 unidades", preco: 3.50, foto: variantImages.v15 }],
  },
  {
    id: "p16", nome: "Picolé Kibon", preco: 5.00, categoriaId: "cat4", subcategoriaId: "sub4b",
    foto: productImages.p16,
    variantes: [
      { id: "v16a", nome: "Morango", preco: 5.00, foto: variantImages.v16a },
      { id: "v16b", nome: "Chocolate", preco: 6.00, foto: variantImages.v16b },
    ],
  },
  // Mercearia
  {
    id: "p17", nome: "Carvão Vegetal", preco: 19.90, categoriaId: "cat5", subcategoriaId: "sub5a",
    foto: productImages.p17,
    variantes: [
      { id: "v17a", nome: "Saco 4kg", preco: 19.90, foto: variantImages.v17a },
      { id: "v17b", nome: "Saco 8kg", preco: 34.90, foto: variantImages.v17b },
    ],
  },
  {
    id: "p18", nome: "Gelo", preco: 8.90, categoriaId: "cat5", subcategoriaId: "sub5a",
    foto: productImages.p18,
    variantes: [
      { id: "v18a", nome: "Saco 5kg", preco: 8.90, foto: variantImages.v18a },
      { id: "v18b", nome: "Saco 10kg", preco: 15.90, foto: variantImages.v18b },
    ],
  },
];

// ── Kits / Combos PDV ──────────────────────────────────────
export const kitCombosPdv: KitCombo[] = [
  {
    id: "kc1", nome: "Kit Churrasco", tipo: "kit",
    tipoDesconto: "%", valorDesconto: 10, subcategoriaVinculo: "sub5a",
    slots: [
      { id: "s1", subcategoriaId: "sub5a", nome: "Carvão/Gelo" },
      { id: "s2", subcategoriaId: "sub2a", nome: "Cerveja" },
      { id: "s3", subcategoriaId: "sub1a", nome: "Refrigerante" },
    ],
  },
  {
    id: "kc2", nome: "Combo Happy Hour", tipo: "combo",
    tipoDesconto: "R$", valorDesconto: 8, subcategoriaVinculo: "sub2c",
    slots: [
      { id: "s4", subcategoriaId: "sub2c", nome: "Destilado" },
      { id: "s5", subcategoriaId: "sub1c", nome: "Energético" },
      { id: "s6", subcategoriaId: "sub5a", nome: "Gelo" },
    ],
  },
];

// ── Clientes ────────────────────────────────────────────────
export const clientesMock: Cliente[] = [
  {
    id: "c1", nome: "Maria Silva", telefone: "(11) 98765-4321", apelido: "Mari",
    enderecos: [
      { id: "end1", rua: "Rua das Flores, 123", bairro: "Centro", principal: true },
      { id: "end2", rua: "Av. Brasil, 500", bairro: "Jardim Paulista", complemento: "Apto 42" },
    ],
  },
  {
    id: "c2", nome: "João Oliveira", telefone: "(11) 91234-5678",
    enderecos: [{ id: "end3", rua: "Av. Brasil, 456", bairro: "Jardim Paulista", principal: true }],
  },
  {
    id: "c3", nome: "Ana Costa", telefone: "(11) 99876-1234", apelido: "Aninha",
    enderecos: [{ id: "end4", rua: "Rua Ipê, 789", bairro: "Vila Nova", principal: true }],
  },
  {
    id: "c4", nome: "Pedro Santos", telefone: "(11) 92345-6789",
    enderecos: [
      { id: "end5", rua: "Rua Harmonia, 55", bairro: "Pinheiros", principal: true },
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

// ── Cache de Endereços ──────────────────────────────────────
export const enderecoCacheMock: EnderecoCache[] = [
  { id: "ec1", rua: "Rua das Flores", numero: "123", bairro: "Centro", cep: "01010-000", cidade: "São Paulo" },
  { id: "ec2", rua: "Av. Brasil", numero: "500", bairro: "Jardim Paulista", cep: "04510-000", cidade: "São Paulo" },
  { id: "ec3", rua: "Av. Brasil", numero: "456", bairro: "Jardim Paulista", cep: "04510-010", cidade: "São Paulo" },
  { id: "ec4", rua: "Rua Ipê", numero: "789", bairro: "Vila Nova", cep: "02020-100", cidade: "São Paulo" },
  { id: "ec5", rua: "Rua Harmonia", numero: "55", bairro: "Pinheiros", cep: "05435-000", cidade: "São Paulo" },
  { id: "ec6", rua: "Rua Augusta", numero: "200", bairro: "Consolação", cep: "01304-000", cidade: "São Paulo" },
  { id: "ec7", rua: "Rua Oscar Freire", numero: "900", bairro: "Jardins", cep: "01426-001", cidade: "São Paulo" },
  { id: "ec8", rua: "Av. Paulista", numero: "1578", bairro: "Bela Vista", cep: "01310-200", cidade: "São Paulo" },
  { id: "ec9", rua: "Rua da Consolação", numero: "3000", bairro: "Cerqueira César", cep: "01416-000", cidade: "São Paulo" },
  { id: "ec10", rua: "Av. Rebouças", numero: "1200", bairro: "Pinheiros", cep: "05402-100", cidade: "São Paulo" },
  { id: "ec11", rua: "Rua Vergueiro", numero: "2500", bairro: "Vila Mariana", cep: "04101-300", cidade: "São Paulo" },
  { id: "ec12", rua: "Av. Interlagos", bairro: "Interlagos", cep: "04661-100", cidade: "São Paulo" },
  { id: "ec13", rua: "Rua Cardeal Arcoverde", numero: "1800", bairro: "Pinheiros", cep: "05407-002", cidade: "São Paulo" },
  { id: "ec14", rua: "Rua Tabapuã", numero: "422", bairro: "Itaim Bibi", cep: "04533-001", cidade: "São Paulo" },
  { id: "ec15", rua: "Av. Faria Lima", numero: "3477", bairro: "Itaim Bibi", cep: "04538-133", cidade: "São Paulo" },
];

export function simularBuscaAPI(texto: string): Promise<EnderecoCache> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `ec_api_${Date.now()}`,
        rua: texto.trim(),
        bairro: "Bairro Encontrado",
        cep: "00000-000",
        cidade: "São Paulo",
      });
    }, 500);
  });
}

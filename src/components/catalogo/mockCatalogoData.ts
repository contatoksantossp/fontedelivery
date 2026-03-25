export interface CatalogCategoria {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  ativo: boolean;
}

export interface CatalogSubcategoria {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  ativo: boolean;
  categoriaId: string;
}

export interface CatalogProduto {
  id: string;
  nome: string;
  descricao: string;
  foto: string;
  destaque: boolean;
  subcategoriaId: string;
  categoriaId: string;
}

export interface CatalogVariante {
  id: string;
  nome: string;
  descricao: string;
  foto: string;
  tags: string[];
  sku: string;
  custo: number;
  valorVenda: number;
  estoqueMinimo: number;
  produtoId: string;
}

export interface KitComboSlot {
  id: string;
  subcategoriaId: string;
  nome: string;
}

export interface KitCombo {
  id: string;
  nome: string;
  imagem: string;
  ativo: boolean;
  tipo: "kit" | "combo";
  tipoDesconto: "%" | "R$";
  valorDesconto: number;
  subcategoriaVinculo: string;
  slots: KitComboSlot[];
}

export const categoriasMock: CatalogCategoria[] = [
  { id: "cat1", nome: "Lanches", descricao: "Hambúrgueres, hot dogs e sanduíches", imagem: "/placeholder.svg", ativo: true },
  { id: "cat2", nome: "Bebidas", descricao: "Refrigerantes, sucos e água", imagem: "/placeholder.svg", ativo: true },
  { id: "cat3", nome: "Açaí", descricao: "Copos e tigelas de açaí", imagem: "/placeholder.svg", ativo: true },
  { id: "cat4", nome: "Pizzas", descricao: "Pizzas tradicionais e especiais", imagem: "/placeholder.svg", ativo: true },
  { id: "cat5", nome: "Sobremesas", descricao: "Doces e sobremesas diversas", imagem: "/placeholder.svg", ativo: false },
];

export const subcategoriasMock: CatalogSubcategoria[] = [
  { id: "sub1a", nome: "Hambúrgueres", descricao: "Hambúrgueres artesanais", imagem: "/placeholder.svg", ativo: true, categoriaId: "cat1" },
  { id: "sub1b", nome: "Hot Dogs", descricao: "Hot dogs tradicionais e especiais", imagem: "/placeholder.svg", ativo: true, categoriaId: "cat1" },
  { id: "sub2a", nome: "Refrigerantes", descricao: "Refrigerantes gelados", imagem: "/placeholder.svg", ativo: true, categoriaId: "cat2" },
  { id: "sub2b", nome: "Sucos", descricao: "Sucos naturais", imagem: "/placeholder.svg", ativo: true, categoriaId: "cat2" },
  { id: "sub3a", nome: "Copos", descricao: "Açaí em copo", imagem: "/placeholder.svg", ativo: true, categoriaId: "cat3" },
  { id: "sub3b", nome: "Tigelas", descricao: "Açaí em tigela", imagem: "/placeholder.svg", ativo: true, categoriaId: "cat3" },
  { id: "sub4a", nome: "Tradicionais", descricao: "Pizzas clássicas", imagem: "/placeholder.svg", ativo: true, categoriaId: "cat4" },
  { id: "sub4b", nome: "Especiais", descricao: "Pizzas gourmet", imagem: "/placeholder.svg", ativo: true, categoriaId: "cat4" },
];

export const produtosMock: CatalogProduto[] = [
  { id: "p1", nome: "X-Burger", descricao: "Hambúrguer clássico com queijo", foto: "/placeholder.svg", destaque: true, subcategoriaId: "sub1a", categoriaId: "cat1" },
  { id: "p2", nome: "X-Burger Duplo", descricao: "Hambúrguer duplo especial", foto: "/placeholder.svg", destaque: false, subcategoriaId: "sub1a", categoriaId: "cat1" },
  { id: "p3", nome: "X-Salada", descricao: "Hambúrguer com salada fresca", foto: "/placeholder.svg", destaque: true, subcategoriaId: "sub1a", categoriaId: "cat1" },
  { id: "p4", nome: "Hot Dog Tradicional", descricao: "Hot dog clássico", foto: "/placeholder.svg", destaque: false, subcategoriaId: "sub1b", categoriaId: "cat1" },
  { id: "p5", nome: "Coca-Cola", descricao: "Refrigerante Coca-Cola", foto: "/placeholder.svg", destaque: true, subcategoriaId: "sub2a", categoriaId: "cat2" },
  { id: "p6", nome: "Suco Natural", descricao: "Suco de frutas naturais", foto: "/placeholder.svg", destaque: false, subcategoriaId: "sub2b", categoriaId: "cat2" },
  { id: "p7", nome: "Açaí Copo", descricao: "Açaí cremoso em copo", foto: "/placeholder.svg", destaque: true, subcategoriaId: "sub3a", categoriaId: "cat3" },
  { id: "p8", nome: "Pizza Margherita", descricao: "Pizza margherita tradicional", foto: "/placeholder.svg", destaque: false, subcategoriaId: "sub4a", categoriaId: "cat4" },
];

export const variantesMock: CatalogVariante[] = [
  { id: "v1", nome: "Único", descricao: "Tamanho padrão", foto: "/placeholder.svg", tags: ["popular"], sku: "XBG-001", custo: 10.0, valorVenda: 22.9, estoqueMinimo: 5, produtoId: "p1" },
  { id: "v2", nome: "Único", descricao: "Tamanho padrão", foto: "/placeholder.svg", tags: [], sku: "XBD-001", custo: 14.0, valorVenda: 28.9, estoqueMinimo: 5, produtoId: "p2" },
  { id: "v3a", nome: "Simples", descricao: "Um hambúrguer", foto: "/placeholder.svg", tags: ["leve"], sku: "XSA-001", custo: 12.0, valorVenda: 25.9, estoqueMinimo: 5, produtoId: "p3" },
  { id: "v3b", nome: "Duplo", descricao: "Dois hambúrgueres", foto: "/placeholder.svg", tags: ["reforçado"], sku: "XSA-002", custo: 16.0, valorVenda: 33.9, estoqueMinimo: 3, produtoId: "p3" },
  { id: "v4", nome: "Único", descricao: "Tamanho padrão", foto: "/placeholder.svg", tags: [], sku: "HDT-001", custo: 7.0, valorVenda: 15.0, estoqueMinimo: 10, produtoId: "p4" },
  { id: "v5a", nome: "350ml", descricao: "Lata", foto: "/placeholder.svg", tags: ["gelada"], sku: "CC-350", custo: 3.0, valorVenda: 6.0, estoqueMinimo: 20, produtoId: "p5" },
  { id: "v5b", nome: "600ml", descricao: "Garrafa", foto: "/placeholder.svg", tags: [], sku: "CC-600", custo: 4.0, valorVenda: 8.0, estoqueMinimo: 15, produtoId: "p5" },
  { id: "v5c", nome: "2L", descricao: "Garrafa família", foto: "/placeholder.svg", tags: ["família"], sku: "CC-2L", custo: 7.0, valorVenda: 14.0, estoqueMinimo: 10, produtoId: "p5" },
  { id: "v6a", nome: "300ml", descricao: "Copo pequeno", foto: "/placeholder.svg", tags: [], sku: "SN-300", custo: 5.0, valorVenda: 10.0, estoqueMinimo: 8, produtoId: "p6" },
  { id: "v6b", nome: "500ml", descricao: "Copo grande", foto: "/placeholder.svg", tags: ["natural"], sku: "SN-500", custo: 7.0, valorVenda: 14.0, estoqueMinimo: 8, produtoId: "p6" },
  { id: "v7a", nome: "300ml", descricao: "Copo pequeno", foto: "/placeholder.svg", tags: [], sku: "AC-300", custo: 8.0, valorVenda: 16.0, estoqueMinimo: 10, produtoId: "p7" },
  { id: "v7b", nome: "500ml", descricao: "Copo grande", foto: "/placeholder.svg", tags: ["mais vendido"], sku: "AC-500", custo: 11.0, valorVenda: 22.0, estoqueMinimo: 10, produtoId: "p7" },
  { id: "v8", nome: "Única", descricao: "Pizza inteira", foto: "/placeholder.svg", tags: ["clássica"], sku: "PM-001", custo: 20.0, valorVenda: 45.0, estoqueMinimo: 3, produtoId: "p8" },
];

export const kitCombosMock: KitCombo[] = [
  {
    id: "kc1", nome: "Combo Família", imagem: "/placeholder.svg", ativo: true, tipo: "combo",
    tipoDesconto: "%", valorDesconto: 15, subcategoriaVinculo: "sub1a",
    slots: [
      { id: "s1", subcategoriaId: "sub1a", nome: "Lanche" },
      { id: "s2", subcategoriaId: "sub2a", nome: "Bebida" },
      { id: "s3", subcategoriaId: "sub1a", nome: "Lanche 2" },
    ],
  },
  {
    id: "kc2", nome: "Kit Casal", imagem: "/placeholder.svg", ativo: true, tipo: "kit",
    tipoDesconto: "R$", valorDesconto: 10, subcategoriaVinculo: "sub1a",
    slots: [
      { id: "s4", subcategoriaId: "sub1a", nome: "Lanche" },
      { id: "s5", subcategoriaId: "sub2a", nome: "Bebida" },
    ],
  },
];

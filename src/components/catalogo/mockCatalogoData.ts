import { productImages, variantImages } from "@/assets/products";
import { categoryImages, subcategoryImages } from "@/assets/categories";

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
  ativo: boolean;
  subcategoriaId: string;
  categoriaId: string;
}

export type UnidadeMedida = "un" | "kg" | "L" | "ml" | "g" | "pct";

export interface CatalogVariante {
  id: string;
  nome: string;
  descricao: string;
  foto: string;
  tags: string[];
  ean: string;
  custo: number;
  valorVenda: number;
  estoqueMinimo: number;
  unidade: UnidadeMedida;
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

// ── Categorias ──────────────────────────────────────────────
export const categoriasMock: CatalogCategoria[] = [
  { id: "cat1", nome: "Bebidas", descricao: "Refrigerantes, sucos, energéticos e água", imagem: categoryImages.cat1, ativo: true },
  { id: "cat2", nome: "Adega", descricao: "Cervejas, vinhos, destilados e espumantes", imagem: categoryImages.cat2, ativo: true },
  { id: "cat3", nome: "Tabacaria", descricao: "Cigarros, sedas, essências e acessórios", imagem: categoryImages.cat3, ativo: true },
  { id: "cat4", nome: "Conveniência", descricao: "Snacks, sorvetes, doces e descartáveis", imagem: categoryImages.cat4, ativo: true },
  { id: "cat5", nome: "Mercearia", descricao: "Carvão, gelo, enlatados e itens básicos", imagem: categoryImages.cat5, ativo: true },
];

// ── Subcategorias ───────────────────────────────────────────
export const subcategoriasMock: CatalogSubcategoria[] = [
  { id: "sub1a", nome: "Refrigerantes", descricao: "Refrigerantes gelados", imagem: subcategoryImages.sub1a, ativo: true, categoriaId: "cat1" },
  { id: "sub1b", nome: "Sucos", descricao: "Sucos naturais e industrializados", imagem: subcategoryImages.sub1b, ativo: true, categoriaId: "cat1" },
  { id: "sub1c", nome: "Energéticos", descricao: "Bebidas energéticas", imagem: subcategoryImages.sub1c, ativo: true, categoriaId: "cat1" },
  { id: "sub1d", nome: "Água", descricao: "Água mineral e com gás", imagem: subcategoryImages.sub1d, ativo: true, categoriaId: "cat1" },
  { id: "sub2a", nome: "Cervejas", descricao: "Cervejas nacionais e importadas", imagem: subcategoryImages.sub2a, ativo: true, categoriaId: "cat2" },
  { id: "sub2b", nome: "Vinhos", descricao: "Vinhos tintos, brancos e rosés", imagem: subcategoryImages.sub2b, ativo: true, categoriaId: "cat2" },
  { id: "sub2c", nome: "Destilados", descricao: "Vodka, whisky, gin e cachaça", imagem: subcategoryImages.sub2c, ativo: true, categoriaId: "cat2" },
  { id: "sub2d", nome: "Espumantes", descricao: "Espumantes e champagnes", imagem: subcategoryImages.sub2d, ativo: true, categoriaId: "cat2" },
  { id: "sub3a", nome: "Cigarros", descricao: "Cigarros nacionais e importados", imagem: subcategoryImages.sub3a, ativo: true, categoriaId: "cat3" },
  { id: "sub3b", nome: "Seda / Papel", descricao: "Sedas e papéis para enrolar", imagem: subcategoryImages.sub3b, ativo: true, categoriaId: "cat3" },
  { id: "sub3c", nome: "Essências", descricao: "Essências para narguile", imagem: subcategoryImages.sub3c, ativo: true, categoriaId: "cat3" },
  { id: "sub3d", nome: "Acessórios", descricao: "Isqueiros, piteiras e acessórios", imagem: subcategoryImages.sub3d, ativo: true, categoriaId: "cat3" },
  { id: "sub4a", nome: "Snacks", descricao: "Salgadinhos e petiscos", imagem: subcategoryImages.sub4a, ativo: true, categoriaId: "cat4" },
  { id: "sub4b", nome: "Sorvetes", descricao: "Picolés e potes", imagem: subcategoryImages.sub4b, ativo: true, categoriaId: "cat4" },
  { id: "sub4c", nome: "Doces", descricao: "Chocolates, balas e chicletes", imagem: subcategoryImages.sub4c, ativo: true, categoriaId: "cat4" },
  { id: "sub4d", nome: "Descartáveis", descricao: "Copos, pratos e talheres", imagem: subcategoryImages.sub4d, ativo: true, categoriaId: "cat4" },
  { id: "sub5a", nome: "Carvão / Gelo", descricao: "Carvão vegetal e gelo", imagem: subcategoryImages.sub5a, ativo: true, categoriaId: "cat5" },
  { id: "sub5b", nome: "Enlatados", descricao: "Conservas e enlatados", imagem: subcategoryImages.sub5b, ativo: true, categoriaId: "cat5" },
  { id: "sub5c", nome: "Biscoitos", descricao: "Biscoitos e bolachas", imagem: subcategoryImages.sub5c, ativo: true, categoriaId: "cat5" },
  { id: "sub5d", nome: "Higiene", descricao: "Itens de higiene pessoal", imagem: subcategoryImages.sub5d, ativo: true, categoriaId: "cat5" },
];

// ── Produtos ────────────────────────────────────────────────
export const produtosMock: CatalogProduto[] = [
  // Bebidas
  { id: "p1", nome: "Coca-Cola", descricao: "Refrigerante Coca-Cola original", foto: productImages.p1, destaque: true, ativo: true, ean: "7894900011517", subcategoriaId: "sub1a", categoriaId: "cat1" },
  { id: "p2", nome: "Guaraná Antarctica", descricao: "Guaraná Antarctica original", foto: productImages.p2, destaque: false, ativo: true, ean: "", subcategoriaId: "sub1a", categoriaId: "cat1" },
  { id: "p3", nome: "Red Bull", descricao: "Bebida energética Red Bull", foto: productImages.p3, destaque: true, ativo: true, ean: "", subcategoriaId: "sub1c", categoriaId: "cat1" },
  { id: "p4", nome: "Água Mineral Crystal", descricao: "Água mineral sem gás", foto: productImages.p4, destaque: false, ativo: true, ean: "", subcategoriaId: "sub1d", categoriaId: "cat1" },
  // Adega
  { id: "p5", nome: "Skol Lata", descricao: "Cerveja Skol lata 350ml", foto: productImages.p5, destaque: true, ativo: true, ean: "", subcategoriaId: "sub2a", categoriaId: "cat2" },
  { id: "p6", nome: "Heineken", descricao: "Cerveja Heineken premium", foto: productImages.p6, destaque: true, ativo: true, ean: "", subcategoriaId: "sub2a", categoriaId: "cat2" },
  { id: "p7", nome: "Brahma Litrão", descricao: "Cerveja Brahma garrafa 1L", foto: productImages.p7, destaque: false, ativo: true, ean: "", subcategoriaId: "sub2a", categoriaId: "cat2" },
  { id: "p8", nome: "Vinho Casillero del Diablo", descricao: "Vinho tinto chileno reservado", foto: productImages.p8, destaque: true, ativo: true, ean: "", subcategoriaId: "sub2b", categoriaId: "cat2" },
  { id: "p9", nome: "Absolut Vodka", descricao: "Vodka sueca premium", foto: productImages.p9, destaque: false, ativo: true, ean: "", subcategoriaId: "sub2c", categoriaId: "cat2" },
  // Tabacaria
  { id: "p10", nome: "Marlboro Box", descricao: "Cigarro Marlboro Box vermelho", foto: productImages.p10, destaque: true, ativo: true, ean: "", subcategoriaId: "sub3a", categoriaId: "cat3" },
  { id: "p11", nome: "Seda Smoking", descricao: "Seda Smoking tamanho king size", foto: productImages.p11, destaque: false, ativo: true, ean: "", subcategoriaId: "sub3b", categoriaId: "cat3" },
  { id: "p12", nome: "Essência Narguile", descricao: "Essência para narguile sabores variados", foto: productImages.p12, destaque: false, ativo: true, ean: "", subcategoriaId: "sub3c", categoriaId: "cat3" },
  { id: "p13", nome: "Isqueiro BIC", descricao: "Isqueiro BIC clássico", foto: productImages.p13, destaque: false, ativo: true, ean: "", subcategoriaId: "sub3d", categoriaId: "cat3" },
  // Conveniência
  { id: "p14", nome: "Doritos", descricao: "Salgadinho Doritos sabor queijo nacho", foto: productImages.p14, destaque: true, ativo: true, ean: "", subcategoriaId: "sub4a", categoriaId: "cat4" },
  { id: "p15", nome: "Trident", descricao: "Chiclete Trident sabores", foto: productImages.p15, destaque: false, ativo: true, ean: "", subcategoriaId: "sub4c", categoriaId: "cat4" },
  { id: "p16", nome: "Picolé Kibon", descricao: "Picolé Kibon sabores variados", foto: productImages.p16, destaque: false, ativo: true, ean: "", subcategoriaId: "sub4b", categoriaId: "cat4" },
  // Mercearia
  { id: "p17", nome: "Carvão Vegetal", descricao: "Carvão vegetal para churrasco", foto: productImages.p17, destaque: true, ativo: true, ean: "", subcategoriaId: "sub5a", categoriaId: "cat5" },
  { id: "p18", nome: "Gelo", descricao: "Saco de gelo em cubo", foto: productImages.p18, destaque: true, ativo: true, ean: "", subcategoriaId: "sub5a", categoriaId: "cat5" },
];

// ── Variantes ───────────────────────────────────────────────
export const variantesMock: CatalogVariante[] = [
  // Coca-Cola
  { id: "v1a", nome: "Lata 350ml", descricao: "Lata", foto: variantImages.v1a, tags: ["gelada"], sku: "CC-350", custo: 2.50, valorVenda: 5.00, estoqueMinimo: 48, unidade: "un", produtoId: "p1" },
  { id: "v1b", nome: "600ml", descricao: "Garrafa", foto: variantImages.v1b, tags: [], sku: "CC-600", custo: 3.50, valorVenda: 7.00, estoqueMinimo: 24, unidade: "un", produtoId: "p1" },
  { id: "v1c", nome: "2L", descricao: "Garrafa família", foto: variantImages.v1c, tags: ["família"], sku: "CC-2L", custo: 5.50, valorVenda: 11.00, estoqueMinimo: 12, unidade: "un", produtoId: "p1" },
  // Guaraná
  { id: "v2a", nome: "Lata 350ml", descricao: "Lata", foto: variantImages.v2a, tags: [], sku: "GA-350", custo: 2.20, valorVenda: 4.50, estoqueMinimo: 48, unidade: "un", produtoId: "p2" },
  { id: "v2b", nome: "2L", descricao: "Garrafa", foto: variantImages.v2b, tags: ["família"], sku: "GA-2L", custo: 4.80, valorVenda: 9.00, estoqueMinimo: 12, unidade: "un", produtoId: "p2" },
  // Red Bull
  { id: "v3a", nome: "250ml", descricao: "Lata regular", foto: variantImages.v3a, tags: ["energia"], sku: "RB-250", custo: 5.50, valorVenda: 12.00, estoqueMinimo: 24, unidade: "un", produtoId: "p3" },
  { id: "v3b", nome: "473ml", descricao: "Latão", foto: variantImages.v3b, tags: ["energia"], sku: "RB-473", custo: 8.00, valorVenda: 17.00, estoqueMinimo: 12, unidade: "un", produtoId: "p3" },
  // Água
  { id: "v4a", nome: "500ml", descricao: "Garrafa pequena", foto: variantImages.v4a, tags: [], sku: "AM-500", custo: 0.80, valorVenda: 2.50, estoqueMinimo: 48, unidade: "un", produtoId: "p4" },
  { id: "v4b", nome: "1.5L", descricao: "Garrafa grande", foto: variantImages.v4b, tags: [], sku: "AM-1.5", custo: 1.50, valorVenda: 4.00, estoqueMinimo: 24, unidade: "un", produtoId: "p4" },
  // Skol
  { id: "v5", nome: "Lata 350ml", descricao: "Lata", foto: variantImages.v5, tags: ["popular"], sku: "SKL-350", custo: 2.00, valorVenda: 4.50, estoqueMinimo: 96, unidade: "un", produtoId: "p5" },
  // Heineken
  { id: "v6a", nome: "Long Neck 330ml", descricao: "Long Neck", foto: variantImages.v6a, tags: ["premium"], sku: "HNK-LN", custo: 4.00, valorVenda: 8.50, estoqueMinimo: 48, unidade: "un", produtoId: "p6" },
  { id: "v6b", nome: "Lata 350ml", descricao: "Lata", foto: variantImages.v6b, tags: ["premium"], sku: "HNK-350", custo: 3.80, valorVenda: 7.50, estoqueMinimo: 48, unidade: "un", produtoId: "p6" },
  // Brahma Litrão
  { id: "v7", nome: "1L", descricao: "Garrafa retornável", foto: variantImages.v7, tags: ["retornável"], sku: "BRM-1L", custo: 4.50, valorVenda: 9.00, estoqueMinimo: 24, unidade: "un", produtoId: "p7" },
  // Vinho
  { id: "v8", nome: "750ml", descricao: "Garrafa padrão", foto: variantImages.v8, tags: ["reservado"], sku: "VCD-750", custo: 25.00, valorVenda: 49.90, estoqueMinimo: 6, unidade: "un", produtoId: "p8" },
  // Absolut
  { id: "v9a", nome: "750ml", descricao: "Garrafa padrão", foto: variantImages.v9a, tags: ["premium"], sku: "ABS-750", custo: 45.00, valorVenda: 89.90, estoqueMinimo: 4, unidade: "un", produtoId: "p9" },
  { id: "v9b", nome: "1L", descricao: "Garrafa grande", foto: variantImages.v9b, tags: ["premium"], sku: "ABS-1L", custo: 55.00, valorVenda: 109.90, estoqueMinimo: 3, unidade: "un", produtoId: "p9" },
  // Marlboro
  { id: "v10", nome: "Maço", descricao: "Maço com 20 unidades", foto: variantImages.v10, tags: [], sku: "MRL-BOX", custo: 6.00, valorVenda: 12.00, estoqueMinimo: 20, unidade: "un", produtoId: "p10" },
  // Seda
  { id: "v11", nome: "King Size", descricao: "Pacote com 33 folhas", foto: variantImages.v11, tags: [], sku: "SED-KS", custo: 1.50, valorVenda: 4.00, estoqueMinimo: 30, unidade: "pct", produtoId: "p11" },
  // Essência
  { id: "v12a", nome: "50g Menta", descricao: "Sabor menta", foto: variantImages.v12a, tags: ["menta"], sku: "ESS-MNT", custo: 8.00, valorVenda: 18.00, estoqueMinimo: 10, unidade: "g", produtoId: "p12" },
  { id: "v12b", nome: "50g Uva", descricao: "Sabor uva", foto: variantImages.v12b, tags: ["uva"], sku: "ESS-UVA", custo: 8.00, valorVenda: 18.00, estoqueMinimo: 10, unidade: "g", produtoId: "p12" },
  // Isqueiro
  { id: "v13", nome: "Único", descricao: "Isqueiro clássico", foto: variantImages.v13, tags: [], sku: "BIC-ISQ", custo: 2.00, valorVenda: 5.00, estoqueMinimo: 30, unidade: "un", produtoId: "p13" },
  // Doritos
  { id: "v14a", nome: "96g", descricao: "Pacote pequeno", foto: variantImages.v14a, tags: ["popular"], sku: "DRT-96", custo: 3.50, valorVenda: 7.50, estoqueMinimo: 20, unidade: "g", produtoId: "p14" },
  { id: "v14b", nome: "167g", descricao: "Pacote grande", foto: variantImages.v14b, tags: [], sku: "DRT-167", custo: 5.50, valorVenda: 12.00, estoqueMinimo: 12, unidade: "g", produtoId: "p14" },
  // Trident
  { id: "v15", nome: "8 unidades", descricao: "Envelope", foto: variantImages.v15, tags: [], sku: "TRD-8", custo: 1.80, valorVenda: 3.50, estoqueMinimo: 40, unidade: "un", produtoId: "p15" },
  // Picolé
  { id: "v16a", nome: "Morango", descricao: "Picolé de morango", foto: variantImages.v16a, tags: [], sku: "PKB-MOR", custo: 2.00, valorVenda: 5.00, estoqueMinimo: 20, unidade: "un", produtoId: "p16" },
  { id: "v16b", nome: "Chocolate", descricao: "Picolé de chocolate", foto: variantImages.v16b, tags: ["popular"], sku: "PKB-CHO", custo: 2.50, valorVenda: 6.00, estoqueMinimo: 20, unidade: "un", produtoId: "p16" },
  // Carvão
  { id: "v17a", nome: "4kg", descricao: "Saco 4kg", foto: variantImages.v17a, tags: ["churrasco"], sku: "CRV-4", custo: 10.00, valorVenda: 19.90, estoqueMinimo: 15, unidade: "kg", produtoId: "p17" },
  { id: "v17b", nome: "8kg", descricao: "Saco 8kg", foto: variantImages.v17b, tags: ["churrasco"], sku: "CRV-8", custo: 18.00, valorVenda: 34.90, estoqueMinimo: 8, unidade: "kg", produtoId: "p17" },
  // Gelo
  { id: "v18a", nome: "5kg", descricao: "Saco 5kg", foto: variantImages.v18a, tags: ["festa"], sku: "GLO-5", custo: 4.00, valorVenda: 8.90, estoqueMinimo: 30, unidade: "kg", produtoId: "p18" },
  { id: "v18b", nome: "10kg", descricao: "Saco 10kg", foto: variantImages.v18b, tags: ["festa"], sku: "GLO-10", custo: 7.00, valorVenda: 15.90, estoqueMinimo: 15, unidade: "kg", produtoId: "p18" },
];

// ── Kits / Combos ───────────────────────────────────────────
export const kitCombosMock: KitCombo[] = [
  {
    id: "kc1", nome: "Kit Churrasco", imagem: subcategoryImages.sub5a, ativo: true, tipo: "kit",
    tipoDesconto: "%", valorDesconto: 10, subcategoriaVinculo: "sub5a",
    slots: [
      { id: "s1", subcategoriaId: "sub5a", nome: "Carvão/Gelo" },
      { id: "s2", subcategoriaId: "sub2a", nome: "Cerveja" },
      { id: "s3", subcategoriaId: "sub1a", nome: "Refrigerante" },
    ],
  },
  {
    id: "kc2", nome: "Combo Happy Hour", imagem: subcategoryImages.sub2c, ativo: true, tipo: "combo",
    tipoDesconto: "R$", valorDesconto: 8, subcategoriaVinculo: "sub2c",
    slots: [
      { id: "s4", subcategoriaId: "sub2c", nome: "Destilado" },
      { id: "s5", subcategoriaId: "sub1c", nome: "Energético" },
      { id: "s6", subcategoriaId: "sub5a", nome: "Gelo" },
    ],
  },
];

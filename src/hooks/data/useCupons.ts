import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  imagem: string;
  tipoDesconto: "percentual" | "fixo" | "nenhum";
  valorDesconto: number;
  ativo: boolean;
  produtos: PromocaoProduto[];
  ordem: number;
}

// ── Cupons ────────────────────────────────────────────────
export function useCupons() {
  return useQuery({
    queryKey: ["cupons"],
    queryFn: async (): Promise<Cupom[]> => {
      const { data, error } = await supabase.from("cupons").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((c) => ({
        id: c.id,
        codigo: c.codigo,
        tipo: c.tipo as "percentual" | "fixo",
        valor: Number(c.valor),
        pedidoMinimo: Number(c.pedido_minimo),
        totalUsos: c.total_usos,
        expiracao: c.expiracao ?? "",
        ativo: c.ativo,
      }));
    },
  });
}

export function useUpsertCupom() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (c: Partial<Cupom> & { id?: string }) => {
      const id = c.id ?? `c-${Date.now()}`;
      const { error } = await supabase.from("cupons").upsert({
        id,
        codigo: c.codigo!,
        tipo: c.tipo!,
        valor: c.valor!,
        pedido_minimo: c.pedidoMinimo ?? 0,
        expiracao: c.expiracao || null,
        ativo: c.ativo ?? true,
        total_usos: c.totalUsos ?? 0,
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cupons"] }),
  });
}

export function useToggleCupom() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ativo }: { id: string; ativo: boolean }) => {
      const { error } = await supabase.from("cupons").update({ ativo }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cupons"] }),
  });
}

// ── Promoções ─────────────────────────────────────────────
export function usePromocoes() {
  return useQuery({
    queryKey: ["promocoes"],
    queryFn: async (): Promise<PromocaoBanner[]> => {
      const { data: promos, error } = await supabase
        .from("promocoes_banner")
        .select("*")
        .order("ordem");
      if (error) throw error;
      const ids = (promos ?? []).map((p) => p.id);
      const { data: prods } = ids.length
        ? await supabase.from("promocao_produtos").select("*").in("promocao_id", ids)
        : { data: [] as any[] };
      return (promos ?? []).map((p) => ({
        id: p.id,
        nome: p.nome,
        descricao: p.descricao ?? "",
        imagem: p.imagem_url ?? "/placeholder.svg",
        tipoDesconto: p.tipo_desconto as "percentual" | "fixo" | "nenhum",
        valorDesconto: Number(p.valor_desconto),
        ativo: p.ativo,
        ordem: p.ordem,
        produtos: (prods ?? [])
          .filter((pp) => pp.promocao_id === p.id)
          .map((pp) => ({
            produtoNome: pp.produto_nome,
            varianteNome: pp.variante_nome ?? "",
            precoOriginal: Number(pp.preco_original),
            precoFinal: Number(pp.preco_final),
          })),
      }));
    },
  });
}

export function useUpsertPromocao() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: Partial<PromocaoBanner> & { id?: string }) => {
      const id = p.id ?? `p-${Date.now()}`;
      const { error } = await supabase.from("promocoes_banner").upsert({
        id,
        nome: p.nome!,
        descricao: p.descricao ?? "",
        imagem_url: p.imagem ?? "/placeholder.svg",
        tipo_desconto: p.tipoDesconto ?? "nenhum",
        valor_desconto: p.valorDesconto ?? 0,
        ativo: p.ativo ?? true,
        ordem: p.ordem ?? 0,
      });
      if (error) throw error;
      // Replace produtos
      await supabase.from("promocao_produtos").delete().eq("promocao_id", id);
      if (p.produtos && p.produtos.length > 0) {
        const rows = p.produtos.map((pp) => ({
          promocao_id: id,
          produto_nome: pp.produtoNome,
          variante_nome: pp.varianteNome,
          preco_original: pp.precoOriginal,
          preco_final: pp.precoFinal,
        }));
        const { error: e2 } = await supabase.from("promocao_produtos").insert(rows);
        if (e2) throw e2;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["promocoes"] }),
  });
}

export function useTogglePromocao() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ativo }: { id: string; ativo: boolean }) => {
      const { error } = await supabase.from("promocoes_banner").update({ ativo }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["promocoes"] }),
  });
}

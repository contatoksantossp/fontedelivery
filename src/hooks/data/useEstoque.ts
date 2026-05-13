import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface EstoqueItem {
  varianteId: string;
  produtoNome: string;
  varianteNome: string;
  sku: string;
  estoqueMinimo: number;
  estoqueAtual: number;
  categoriaId: string;
  subcategoriaId: string;
}

export type MovimentacaoTipo = "entrada" | "saida" | "perda" | "correcao";

export interface Movimentacao {
  id: string;
  dataHora: string;
  produtoNome: string;
  varianteNome: string;
  tipo: MovimentacaoTipo;
  quantidade: number;
  saldoFinal: number;
}

export interface FilaEsperaItem {
  id: string;
  clienteNome: string;
  varianteNome: string;
  dataSolicitacao: string;
  contato: string;
}

export function useEstoqueItems() {
  return useQuery({
    queryKey: ["estoque_items"],
    queryFn: async (): Promise<EstoqueItem[]> => {
      const { data, error } = await supabase
        .from("variantes")
        .select("id, nome, ean, estoque_minimo, estoque_atual, produto_id, produtos(nome, categoria_id, subcategoria_id)")
        .order("nome");
      if (error) throw error;
      return (data ?? []).map((v: any) => ({
        varianteId: v.id,
        produtoNome: v.produtos?.nome ?? "",
        varianteNome: v.nome,
        sku: v.ean ?? v.id,
        estoqueMinimo: v.estoque_minimo ?? 0,
        estoqueAtual: v.estoque_atual ?? 0,
        categoriaId: v.produtos?.categoria_id ?? "",
        subcategoriaId: v.produtos?.subcategoria_id ?? "",
      }));
    },
  });
}

export function useAjustarSaldo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ varianteId, delta, produtoNome, varianteNome }: { varianteId: string; delta: number; produtoNome: string; varianteNome: string }) => {
      const { data: cur } = await supabase.from("variantes").select("estoque_atual").eq("id", varianteId).maybeSingle();
      const novoSaldo = Math.max(0, (cur?.estoque_atual ?? 0) + delta);
      const { error } = await supabase.from("variantes").update({ estoque_atual: novoSaldo }).eq("id", varianteId);
      if (error) throw error;
      const { error: e2 } = await supabase.from("estoque_movimentos").insert({
        variante_id: varianteId,
        tipo: "correcao",
        quantidade: delta,
        saldo_final: novoSaldo,
      });
      if (e2) throw e2;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["estoque_items"] });
      qc.invalidateQueries({ queryKey: ["estoque_movimentos"] });
    },
  });
}

export function useEditarMinimo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ varianteId, novoMin }: { varianteId: string; novoMin: number }) => {
      const { error } = await supabase.from("variantes").update({ estoque_minimo: Math.max(0, novoMin) }).eq("id", varianteId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["estoque_items"] }),
  });
}

export function useMovimentacoes() {
  return useQuery({
    queryKey: ["estoque_movimentos"],
    queryFn: async (): Promise<Movimentacao[]> => {
      const { data, error } = await supabase
        .from("estoque_movimentos")
        .select("id, data_hora, tipo, quantidade, saldo_final, variante_id, variantes(nome, produtos(nome))")
        .order("data_hora", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((m: any) => ({
        id: m.id,
        dataHora: m.data_hora,
        produtoNome: m.variantes?.produtos?.nome ?? "",
        varianteNome: m.variantes?.nome ?? "",
        tipo: m.tipo,
        quantidade: m.quantidade,
        saldoFinal: m.saldo_final,
      }));
    },
  });
}

export function useFilaEspera() {
  return useQuery({
    queryKey: ["fila_espera"],
    queryFn: async (): Promise<FilaEsperaItem[]> => {
      const { data, error } = await supabase
        .from("estoque_fila_espera")
        .select("*")
        .order("data_solicitacao", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((f) => ({
        id: f.id,
        clienteNome: f.cliente_nome,
        varianteNome: f.variante_nome ?? "",
        dataSolicitacao: f.data_solicitacao,
        contato: f.contato ?? "",
      }));
    },
  });
}

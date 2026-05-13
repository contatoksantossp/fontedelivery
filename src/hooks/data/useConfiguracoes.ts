import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PerfilLoja {
  nomeLoja: string;
  telefone: string;
  endereco: string;
  logoUrl: string;
  lojaAberta: boolean;
}

export interface HorarioFuncionamento {
  id: string;
  dia: string;
  ordem: number;
  abertura: string;
  fechamento: string;
  ativo: boolean;
}

export interface FaixaKm {
  id: string;
  tipo: "cliente" | "entregador";
  kmInicial: number;
  kmFinal: number;
  preco: number;
}

export interface EnderecoCache {
  id: string;
  rua: string;
  numero?: string;
  bairro: string;
  cep: string;
  cidade: string;
}

// ── Perfil ────────────────────────────────────────────────
export function usePerfilLoja() {
  return useQuery({
    queryKey: ["perfil_loja"],
    queryFn: async (): Promise<PerfilLoja> => {
      const { data, error } = await supabase.from("perfil_loja").select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      return {
        nomeLoja: data?.nome_loja ?? "",
        telefone: data?.telefone ?? "",
        endereco: data?.endereco ?? "",
        logoUrl: data?.logo_url ?? "",
        lojaAberta: data?.loja_aberta ?? true,
      };
    },
  });
}

export function useUpdatePerfilLoja() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: Partial<PerfilLoja>) => {
      const payload: Record<string, unknown> = { id: 1 };
      if (p.nomeLoja !== undefined) payload.nome_loja = p.nomeLoja;
      if (p.telefone !== undefined) payload.telefone = p.telefone;
      if (p.endereco !== undefined) payload.endereco = p.endereco;
      if (p.logoUrl !== undefined) payload.logo_url = p.logoUrl;
      if (p.lojaAberta !== undefined) payload.loja_aberta = p.lojaAberta;
      const { error } = await supabase.from("perfil_loja").upsert(payload);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["perfil_loja"] }),
  });
}

// ── Horários ──────────────────────────────────────────────
export function useHorarios() {
  return useQuery({
    queryKey: ["horarios"],
    queryFn: async (): Promise<HorarioFuncionamento[]> => {
      const { data, error } = await supabase.from("horarios_funcionamento").select("*").order("ordem");
      if (error) throw error;
      return (data ?? []).map((h) => ({
        id: h.id,
        dia: h.dia,
        ordem: h.ordem,
        abertura: h.abertura,
        fechamento: h.fechamento,
        ativo: h.ativo,
      }));
    },
  });
}

export function useUpdateHorario() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (h: Partial<HorarioFuncionamento> & { id: string }) => {
      const { error } = await supabase
        .from("horarios_funcionamento")
        .update({ abertura: h.abertura, fechamento: h.fechamento, ativo: h.ativo })
        .eq("id", h.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["horarios"] }),
  });
}

// ── Faixas de Taxa ────────────────────────────────────────
export function useFaixas(tipo: "cliente" | "entregador") {
  return useQuery({
    queryKey: ["faixas_taxa", tipo],
    queryFn: async (): Promise<FaixaKm[]> => {
      const { data, error } = await supabase.from("faixas_taxa").select("*").eq("tipo", tipo).order("km_inicial");
      if (error) throw error;
      return (data ?? []).map((f) => ({
        id: f.id,
        tipo: f.tipo as "cliente" | "entregador",
        kmInicial: Number(f.km_inicial),
        kmFinal: Number(f.km_final),
        preco: Number(f.preco),
      }));
    },
  });
}

export function useUpsertFaixa() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (f: FaixaKm) => {
      const { error } = await supabase.from("faixas_taxa").upsert({
        id: f.id,
        tipo: f.tipo,
        km_inicial: f.kmInicial,
        km_final: f.kmFinal,
        preco: f.preco,
      });
      if (error) throw error;
    },
    onSuccess: (_d, vars) => qc.invalidateQueries({ queryKey: ["faixas_taxa", vars.tipo] }),
  });
}

export function useDeleteFaixa() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string; tipo: "cliente" | "entregador" }) => {
      const { error } = await supabase.from("faixas_taxa").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_d, vars) => qc.invalidateQueries({ queryKey: ["faixas_taxa", vars.tipo] }),
  });
}

// ── Endereços Cache ───────────────────────────────────────
export function useEnderecosCache() {
  return useQuery({
    queryKey: ["enderecos_cache"],
    queryFn: async (): Promise<EnderecoCache[]> => {
      const { data, error } = await supabase.from("enderecos_cache").select("*").order("rua");
      if (error) throw error;
      return (data ?? []).map((e) => ({
        id: e.id,
        rua: e.rua,
        numero: e.numero ?? undefined,
        bairro: e.bairro,
        cep: e.cep ?? "",
        cidade: e.cidade ?? "São Paulo",
      }));
    },
  });
}

export function useUpsertEnderecoCache() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (e: EnderecoCache) => {
      const { error } = await supabase.from("enderecos_cache").upsert({
        id: e.id,
        rua: e.rua,
        numero: e.numero,
        bairro: e.bairro,
        cep: e.cep,
        cidade: e.cidade,
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["enderecos_cache"] }),
  });
}

export function useDeleteEnderecoCache() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("enderecos_cache").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["enderecos_cache"] }),
  });
}

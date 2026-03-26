import { useState, useEffect, useMemo } from "react";
import { rotasMock, Rota, PagamentoParada } from "@/components/rotas/mockRotasData";
import { RotaCard } from "@/components/rotas/RotaCard";
import { RotaDetalhes } from "@/components/rotas/RotaDetalhes";
import { RotaAcerto } from "@/components/rotas/RotaAcerto";
import { RotaMapaLeaflet } from "@/components/rotas/RotaMapaLeaflet";
import { KanbanColumn } from "@/components/visao-geral/KanbanColumn";
import { useSidebar } from "@/components/ui/sidebar";
import { entregadoresMock } from "@/components/visao-geral/mockData";

export default function Rotas() {
  const [rotas, setRotas] = useState<Rota[]>(rotasMock);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
    return () => setOpen(true);
  }, [setOpen]);

  const selectedRota = rotas.find((r) => r.id === selectedId) || null;

  // Map rotaId -> driver color
  const corMap = useMemo(() => {
    const map: Record<string, string> = {};
    rotas.forEach((r) => {
      const ent = entregadoresMock.find((e) => e.id === r.entregadorId);
      map[r.id] = ent?.cor || "#9ca3af";
    });
    return map;
  }, [rotas]);

  const selectedCor = selectedId ? (corMap[selectedId] || "#9ca3af") : "#9ca3af";

  // Sort: active first, concluida last
  const sortedRotas = [...rotas].sort((a, b) => {
    const order = { pendente: 0, em_rota: 1, finalizada: 2, concluida: 3 };
    return order[a.status] - order[b.status];
  });

  const activeCount = rotas.filter((r) => r.status !== "concluida").length;

  const handleDarBaixa = (paradaId: string) => {
    setRotas((prev) =>
      prev.map((r) => ({
        ...r,
        paradas: r.paradas.map((p) =>
          p.id === paradaId ? { ...p, baixaRealizada: true } : p
        ),
      }))
    );
  };

  const handleConcluirRota = (rotaId: string) => {
    setRotas((prev) =>
      prev.map((r) =>
        r.id === rotaId ? { ...r, status: "concluida" as const } : r
      )
    );
  };

  const handleAlterarPagamento = (paradaId: string, forma: string) => {
    setRotas((prev) =>
      prev.map((r) => ({
        ...r,
        paradas: r.paradas.map((p) =>
          p.id === paradaId ? { ...p, formaPagamento: forma } : p
        ),
      }))
    );
  };

  const handleAlterarPagamentos = (paradaId: string, pagamentos: PagamentoParada[]) => {
    setRotas((prev) =>
      prev.map((r) => ({
        ...r,
        paradas: r.paradas.map((p) =>
          p.id === paradaId ? { ...p, pagamentos } : p
        ),
      }))
    );
  };

  const handleBonificacaoChange = (rotaId: string, valor: number) => {
    setRotas((prev) =>
      prev.map((r) =>
        r.id === rotaId ? { ...r, bonificacao: valor } : r
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-auto lg:overflow-hidden">
      {/* Coluna Esquerda — Kanban de Rotas */}
      <div className="lg:w-[35%] min-h-[300px] lg:min-h-0 flex flex-col p-3 border-b lg:border-b-0 lg:border-r border-border overflow-hidden">
        <KanbanColumn id="rotas" title="Rotas" count={activeCount} className="flex-1 min-h-0">
          {sortedRotas.map((rota) => (
            <RotaCard
              key={rota.id}
              rota={rota}
              cor={corMap[rota.id]}
              selected={selectedId === rota.id}
              onSelect={(r) => setSelectedId(r.id)}
            />
          ))}
        </KanbanColumn>
      </div>

      {/* Coluna Central — Detalhes */}
      <div className="lg:w-[25%] min-h-[250px] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-border flex flex-col overflow-hidden">
        <RotaDetalhes
          rota={selectedRota}
          cor={selectedCor}
          onBonificacaoChange={handleBonificacaoChange}
        />
      </div>

      {/* Coluna Direita — Mapa ou Acerto */}
      <div className="lg:w-[40%] min-h-[350px] lg:min-h-0 flex flex-col overflow-hidden">
        {selectedRota?.status === "finalizada" ? (
          <RotaAcerto
            rota={selectedRota}
            onDarBaixa={handleDarBaixa}
            onConcluirRota={handleConcluirRota}
            onAlterarPagamento={handleAlterarPagamento}
            onAlterarPagamentos={handleAlterarPagamentos}
          />
        ) : (
          <RotaMapaLeaflet
            rota={selectedRota}
            cor={selectedCor}
            allRotas={rotas}
            corMap={corMap}
          />
        )}
      </div>
    </div>
  );
}

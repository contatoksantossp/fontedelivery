import { useState, useEffect } from "react";
import { rotasMock, Rota } from "@/components/rotas/mockRotasData";
import { RotaCard } from "@/components/rotas/RotaCard";
import { RotaDetalhes } from "@/components/rotas/RotaDetalhes";
import { RotaAcerto } from "@/components/rotas/RotaAcerto";
import { KanbanColumn } from "@/components/visao-geral/KanbanColumn";
import { useSidebar } from "@/components/ui/sidebar";
import { Map } from "lucide-react";

export default function Rotas() {
  const [rotas, setRotas] = useState<Rota[]>(rotasMock);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
    return () => setOpen(true);
  }, [setOpen]);

  const selectedRota = rotas.find((r) => r.id === selectedId) || null;

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

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Coluna Esquerda — Kanban de Rotas */}
      <div className="w-[40%] flex flex-col p-3 border-r border-border overflow-hidden">
        <KanbanColumn title="Rotas" count={activeCount} className="flex-1 min-h-0">
          {sortedRotas.map((rota) => (
            <RotaCard
              key={rota.id}
              rota={rota}
              selected={selectedId === rota.id}
              onSelect={(r) => setSelectedId(r.id)}
            />
          ))}
        </KanbanColumn>
      </div>

      {/* Coluna Central — Detalhes */}
      <div className="w-[20%] border-r border-border flex flex-col overflow-hidden">
        <RotaDetalhes rota={selectedRota} />
      </div>

      {/* Coluna Direita — Mapa ou Acerto */}
      <div className="w-[40%] flex flex-col overflow-hidden">
        {selectedRota?.status === "finalizada" ? (
          <RotaAcerto
            rota={selectedRota}
            onDarBaixa={handleDarBaixa}
            onConcluirRota={handleConcluirRota}
            onAlterarPagamento={handleAlterarPagamento}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-3">
            <div className="rounded-xl bg-primary/10 p-4 mb-2">
              <Map className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs">
              {selectedRota
                ? "Mapa focado na rota selecionada"
                : "Mapa global — todos os entregadores"}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">Integração em breve</p>
          </div>
        )}
      </div>
    </div>
  );
}

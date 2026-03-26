import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bike, Car, CircleDot, Pencil, Power, PowerOff, Trash2 } from "lucide-react";
import { Cliente, Entregador } from "./mockParceirosData";
import { EntregadorEditDialog } from "./EntregadorEditDialog";

interface AbaEntregadoresProps {
  entregadores: Entregador[];
  clientes: Cliente[];
  onToggleOnline: (id: string) => void;
  onExcluir: (id: string) => void;
  onEdit: (id: string, dados: { veiculo: string; cor: string; clienteNome: string }) => void;
}

const veiculoIcon = (v: string) => {
  if (v.toLowerCase().includes("moto")) return <Bike className="h-4 w-4" />;
  if (v.toLowerCase().includes("carro")) return <Car className="h-4 w-4" />;
  return <Bike className="h-4 w-4" />;
};

export function AbaEntregadores({ entregadores, clientes, onToggleOnline, onExcluir, onEdit }: AbaEntregadoresProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [editEnt, setEditEnt] = useState<Entregador | null>(null);

  const getNome = (clienteId: string) => clientes.find((c) => c.id === clienteId)?.nome || "—";

  const offline = entregadores.filter((e) => !e.online);
  const online = entregadores.filter((e) => e.online);

  const openEdit = (ent: Entregador) => {
    setEditEnt(ent);
    setEditOpen(true);
  };

  const renderCard = (ent: Entregador, isOnline: boolean) => (
    <Card key={ent.id} className="relative" style={{ borderLeftWidth: 3, borderLeftColor: ent.cor }}>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ent.cor }} />
          {isOnline && <CircleDot className="h-3 w-3 text-emerald-500 animate-pulse" />}
          <span className="font-semibold">{getNome(ent.clienteId)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {veiculoIcon(ent.veiculo)}
          <span>{ent.veiculo}</span>
        </div>
        <div className="text-sm">
          Total mês: <span className="font-medium">R$ {ent.totalMes.toFixed(2)}</span>
        </div>
        <div className="flex gap-2 pt-1">
          <Button
            size="sm"
            variant={isOnline ? "outline" : "default"}
            className="flex-1"
            onClick={() => onToggleOnline(ent.id)}
          >
            {isOnline ? (
              <><PowerOff className="h-3 w-3 mr-1" /> Ficar Offline</>
            ) : (
              <><Power className="h-3 w-3 mr-1" /> Ficar Online</>
            )}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => openEdit(ent)}>
            <Pencil className="h-3 w-3" />
          </Button>
          {!isOnline && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => { if (confirm(`Remover ${getNome(ent.clienteId)} dos entregadores?`)) onExcluir(ent.id); }}
            >
              <Trash2 className="h-3 w-3 text-destructive" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            Todos os Entregadores
            <Badge variant="secondary">{entregadores.length}</Badge>
          </h3>
          {offline.length === 0 && (
            <p className="text-sm text-muted-foreground">Todos estão online</p>
          )}
          {offline.map((e) => renderCard(e, false))}
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <CircleDot className="h-4 w-4 text-emerald-500" />
            Online (Em Turno)
            <Badge className="bg-emerald-600 text-white">{online.length}</Badge>
          </h3>
          {online.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhum entregador online</p>
          )}
          {online.map((e) => renderCard(e, true))}
        </div>
      </div>

      <EntregadorEditDialog
        entregador={editEnt}
        clienteNome={editEnt ? getNome(editEnt.clienteId) : ""}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSave={onEdit}
      />
    </>
  );
}

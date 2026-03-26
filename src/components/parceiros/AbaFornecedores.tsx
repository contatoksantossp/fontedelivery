import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Pencil, ChevronDown, ChevronRight, Building2, Phone, User, CalendarIcon } from "lucide-react";
import { Fornecedor, HistoricoCompra } from "./mockParceirosData";
import { FornecedorDialog } from "./FornecedorDialog";
import { format, subDays, subMonths, isAfter, isBefore, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

type FiltroTipo = "7d" | "30d" | "12m" | "intervalo";

interface AbaFornecedoresProps {
  fornecedores: Fornecedor[];
  onAdd: (data: Omit<Fornecedor, "id" | "historico">) => void;
  onEdit: (id: string, data: Omit<Fornecedor, "id" | "historico">) => void;
}

function filtrarHistorico(
  historico: HistoricoCompra[],
  filtro: FiltroTipo,
  dataInicio?: Date,
  dataFim?: Date
): HistoricoCompra[] {
  const hoje = new Date();
  return historico.filter((h) => {
    const d = new Date(h.data);
    switch (filtro) {
      case "7d":
        return isAfter(d, subDays(hoje, 7));
      case "30d":
        return isAfter(d, subDays(hoje, 30));
      case "12m":
        return isAfter(d, subMonths(hoje, 12));
      case "intervalo":
        if (dataInicio && isBefore(d, startOfDay(dataInicio))) return false;
        if (dataFim && isAfter(d, startOfDay(subDays(dataFim, -1)))) return false;
        return true;
      default:
        return true;
    }
  });
}

function PedidoRow({ compra }: { compra: HistoricoCompra }) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center gap-2 px-2 py-2 text-sm hover:bg-muted/50 rounded transition-colors">
          <ChevronRight className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", open && "rotate-90")} />
          <span className="min-w-[70px] text-muted-foreground">{new Date(compra.data).toLocaleDateString("pt-BR")}</span>
          <span className="flex-1 text-left truncate">{compra.descricao}</span>
          <span className="font-medium whitespace-nowrap">R$ {compra.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-7 mb-2 border-l-2 border-muted pl-3 space-y-1">
          {compra.itens.map((item, i) => (
            <div key={i} className="flex justify-between text-xs text-muted-foreground py-0.5">
              <span>{item.qtd}x {item.nome}</span>
              <span>R$ {(item.qtd * item.valorUnit).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function AbaFornecedores({ fornecedores, onAdd, onEdit }: AbaFornecedoresProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editForn, setEditForn] = useState<Fornecedor | undefined>();
  const [filtros, setFiltros] = useState<Record<string, FiltroTipo>>({});
  const [datasInicio, setDatasInicio] = useState<Record<string, Date | undefined>>({});
  const [datasFim, setDatasFim] = useState<Record<string, Date | undefined>>({});

  const getFiltro = (id: string): FiltroTipo => filtros[id] || "12m";

  const setFiltro = (id: string, f: FiltroTipo) => setFiltros((prev) => ({ ...prev, [id]: f }));

  const filtroOpcoes: { label: string; value: FiltroTipo }[] = [
    { label: "7 dias", value: "7d" },
    { label: "30 dias", value: "30d" },
    { label: "12 meses", value: "12m" },
    { label: "Intervalo", value: "intervalo" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => { setEditForn(undefined); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Novo Fornecedor
        </Button>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-2">
        {fornecedores.map((f) => {
          const filtroAtual = getFiltro(f.id);
          const historicoFiltrado = filtrarHistorico(f.historico, filtroAtual, datasInicio[f.id], datasFim[f.id]);

          return (
            <Card key={f.id} className="w-[340px] flex-shrink-0">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">{f.nomeFantasia}</h4>
                    <p className="text-xs text-muted-foreground">{f.razaoSocial}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditForn(f); setDialogOpen(true); }}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Building2 className="h-3 w-3" /> {f.cnpj}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Phone className="h-3 w-3" /> {f.telefone}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
                    <User className="h-3 w-3" /> {f.contatoNome}
                  </div>
                </div>

                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      <span>Histórico de Compras <Badge variant="secondary" className="ml-1">{f.historico.length}</Badge></span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 pt-2">
                    {/* Filtros */}
                    <div className="flex flex-wrap gap-1">
                      {filtroOpcoes.map((opt) => (
                        <Button
                          key={opt.value}
                          variant={filtroAtual === opt.value ? "default" : "outline"}
                          size="sm"
                          className="h-7 text-xs px-2"
                          onClick={() => setFiltro(f.id, opt.value)}
                        >
                          {opt.label}
                        </Button>
                      ))}
                    </div>

                    {filtroAtual === "intervalo" && (
                      <div className="flex gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              {datasInicio[f.id] ? format(datasInicio[f.id]!, "dd/MM/yy") : "De"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={datasInicio[f.id]}
                              onSelect={(d) => setDatasInicio((prev) => ({ ...prev, [f.id]: d }))}
                              locale={ptBR}
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              {datasFim[f.id] ? format(datasFim[f.id]!, "dd/MM/yy") : "Até"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={datasFim[f.id]}
                              onSelect={(d) => setDatasFim((prev) => ({ ...prev, [f.id]: d }))}
                              locale={ptBR}
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}

                    {/* Lista de pedidos */}
                    <div className="space-y-0.5">
                      {historicoFiltrado.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-3">Nenhuma compra neste período</p>
                      ) : (
                        historicoFiltrado.map((h, i) => <PedidoRow key={i} compra={h} />)
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <FornecedorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        fornecedor={editForn}
        onSave={(data) => {
          if (editForn) onEdit(editForn.id, data);
          else onAdd(data);
        }}
      />
    </div>
  );
}

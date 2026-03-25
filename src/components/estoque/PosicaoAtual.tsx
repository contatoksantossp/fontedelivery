import { useState, useMemo } from "react";
import { Package, AlertTriangle, XCircle, Plus, Minus, Check, X } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { categoriasMock, subcategoriasMock } from "@/components/catalogo/mockCatalogoData";
import type { EstoqueItem } from "./mockEstoqueData";

interface PosicaoAtualProps {
  items: EstoqueItem[];
  onAjustarSaldo: (varianteId: string, delta: number) => void;
  onEditarMinimo: (varianteId: string, novoMin: number) => void;
}

export function PosicaoAtual({ items, onAjustarSaldo, onEditarMinimo }: PosicaoAtualProps) {
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");
  const [subcategoriaFiltro, setSubcategoriaFiltro] = useState("todas");
  const [editingMinId, setEditingMinId] = useState<string | null>(null);
  const [editingMinValue, setEditingMinValue] = useState(0);

  const totalProdutos = items.length;
  const estoqueBaixo = items.filter(i => i.estoqueAtual > 0 && i.estoqueAtual < i.estoqueMinimo).length;
  const esgotados = items.filter(i => i.estoqueAtual === 0).length;

  const subcategoriasDisponiveis = useMemo(() => {
    if (categoriaFiltro === "todas") return subcategoriasMock;
    return subcategoriasMock.filter(s => s.categoriaId === categoriaFiltro);
  }, [categoriaFiltro]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchBusca = busca === "" || item.produtoNome.toLowerCase().includes(busca.toLowerCase()) || item.sku.toLowerCase().includes(busca.toLowerCase());
      const matchCat = categoriaFiltro === "todas" || item.categoriaId === categoriaFiltro;
      const matchSub = subcategoriaFiltro === "todas" || item.subcategoriaId === subcategoriaFiltro;
      return matchBusca && matchCat && matchSub;
    });
  }, [items, busca, categoriaFiltro, subcategoriaFiltro]);

  const getStatus = (item: EstoqueItem) => {
    if (item.estoqueAtual === 0) return { label: "Esgotado", variant: "destructive" as const };
    if (item.estoqueAtual < item.estoqueMinimo) return { label: "Baixo", variant: "secondary" as const };
    return { label: "Normal", variant: "default" as const };
  };

  const handleStartEdit = (item: EstoqueItem) => {
    setEditingMinId(item.varianteId);
    setEditingMinValue(item.estoqueMinimo);
  };

  const handleConfirmEdit = () => {
    if (editingMinId) {
      onEditarMinimo(editingMinId, editingMinValue);
      setEditingMinId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingMinId(null);
  };

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard icon={Package} label="Total Variantes" value={String(totalProdutos)} />
        <MetricCard icon={AlertTriangle} label="Estoque Baixo" value={String(estoqueBaixo)} trend={estoqueBaixo > 0 ? "down" : "neutral"} subtitle={estoqueBaixo > 0 ? "Reposição necessária" : "Tudo OK"} />
        <MetricCard icon={XCircle} label="Esgotados" value={String(esgotados)} trend={esgotados > 0 ? "down" : "neutral"} subtitle={esgotados > 0 ? "Itens sem estoque" : "Nenhum"} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input placeholder="Buscar por produto ou SKU..." value={busca} onChange={e => setBusca(e.target.value)} className="sm:max-w-xs" />
        <Select value={categoriaFiltro} onValueChange={v => { setCategoriaFiltro(v); setSubcategoriaFiltro("todas"); }}>
          <SelectTrigger className="sm:w-[180px]"><SelectValue placeholder="Categoria" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas Categorias</SelectItem>
            {categoriasMock.map(c => <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={subcategoriaFiltro} onValueChange={setSubcategoriaFiltro}>
          <SelectTrigger className="sm:w-[180px]"><SelectValue placeholder="Subcategoria" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas Subcategorias</SelectItem>
            {subcategoriasDisponiveis.map(s => <SelectItem key={s.id} value={s.id}>{s.nome}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Variante</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="text-center">Est. Mínimo</TableHead>
              <TableHead className="text-center">Est. Atual</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map(item => {
              const status = getStatus(item);
              return (
                <TableRow key={item.varianteId}>
                  <TableCell className="font-medium">{item.produtoNome}</TableCell>
                  <TableCell>{item.varianteNome}</TableCell>
                  <TableCell className="text-muted-foreground text-xs font-mono">{item.sku}</TableCell>
                  <TableCell className="text-center">
                    {editingMinId === item.varianteId ? (
                      <div className="flex items-center justify-center gap-1">
                        <Input type="number" value={editingMinValue} onChange={e => setEditingMinValue(Number(e.target.value))} className="w-16 h-7 text-center text-xs" />
                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={handleConfirmEdit}><Check className="h-3 w-3" /></Button>
                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={handleCancelEdit}><X className="h-3 w-3" /></Button>
                      </div>
                    ) : (
                      <button onClick={() => handleStartEdit(item)} className="cursor-pointer hover:underline text-muted-foreground">{item.estoqueMinimo}</button>
                    )}
                  </TableCell>
                  <TableCell className="text-center font-semibold">{item.estoqueAtual}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={status.variant} className={
                      status.label === "Baixo" ? "bg-yellow-500/15 text-yellow-700 border-yellow-500/30" :
                      status.label === "Normal" ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30" : ""
                    }>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => onAjustarSaldo(item.varianteId, -1)}><Minus className="h-3 w-3" /></Button>
                      <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => onAjustarSaldo(item.varianteId, 1)}><Plus className="h-3 w-3" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredItems.length === 0 && (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Nenhum item encontrado</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

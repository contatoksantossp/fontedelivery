import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, ChevronDown, Building2, Phone, User } from "lucide-react";
import { Fornecedor } from "./mockParceirosData";
import { FornecedorDialog } from "./FornecedorDialog";

interface AbaFornecedoresProps {
  fornecedores: Fornecedor[];
  onAdd: (data: Omit<Fornecedor, "id" | "historico">) => void;
  onEdit: (id: string, data: Omit<Fornecedor, "id" | "historico">) => void;
}

export function AbaFornecedores({ fornecedores, onAdd, onEdit }: AbaFornecedoresProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editForn, setEditForn] = useState<Fornecedor | undefined>();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => { setEditForn(undefined); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Novo Fornecedor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fornecedores.map((f) => (
          <Card key={f.id}>
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
                <CollapsibleContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {f.historico.map((h, i) => (
                        <TableRow key={i}>
                          <TableCell className="text-sm">{new Date(h.data).toLocaleDateString("pt-BR")}</TableCell>
                          <TableCell className="text-sm">{h.descricao}</TableCell>
                          <TableCell className="text-sm text-right font-medium">R$ {h.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        ))}
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

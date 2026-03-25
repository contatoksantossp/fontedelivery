import { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Briefcase, Bike, Building2 } from "lucide-react";
import {
  clientesMock,
  colaboradoresMock,
  entregadoresMock,
  fornecedoresMock,
  Cliente,
  Colaborador,
  Entregador,
  Fornecedor,
} from "@/components/parceiros/mockParceirosData";
import { AbaClientes } from "@/components/parceiros/AbaClientes";
import { AbaColaboradores } from "@/components/parceiros/AbaColaboradores";
import { AbaEntregadores } from "@/components/parceiros/AbaEntregadores";
import { AbaFornecedores } from "@/components/parceiros/AbaFornecedores";

export default function Parceiros() {
  const [clientes, setClientes] = useState<Cliente[]>(clientesMock);
  const [colaboradores, setColaboradores] = useState<Colaborador[]>(colaboradoresMock);
  const [entregadores, setEntregadores] = useState<Entregador[]>(entregadoresMock);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>(fornecedoresMock);

  // Clientes
  const addCliente = (data: Omit<Cliente, "id" | "dataCadastro">) => {
    const novo: Cliente = {
      ...data,
      id: `cl${Date.now()}`,
      dataCadastro: new Date().toISOString().split("T")[0],
    };
    setClientes((prev) => [...prev, novo]);
  };

  const editCliente = (id: string, data: Omit<Cliente, "id" | "dataCadastro">) => {
    setClientes((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
  };

  // Promover
  const promover = (clienteId: string, tipo: "colaborador" | "entregador", dados: { cargo?: string; veiculo?: string }) => {
    if (tipo === "colaborador") {
      const novo: Colaborador = {
        id: `co${Date.now()}`,
        clienteId,
        cargo: dados.cargo || "",
        dataInicio: new Date().toISOString().split("T")[0],
        ativo: true,
      };
      setColaboradores((prev) => [...prev, novo]);
    } else {
      const novo: Entregador = {
        id: `en${Date.now()}`,
        clienteId,
        veiculo: dados.veiculo || "",
        online: false,
        totalMes: 0,
      };
      setEntregadores((prev) => [...prev, novo]);
    }
  };

  // Colaboradores
  const editColaborador = (id: string, cargo: string, dataInicio: string) => {
    setColaboradores((prev) => prev.map((c) => (c.id === id ? { ...c, cargo, dataInicio } : c)));
  };

  const demitir = (id: string) => {
    setColaboradores((prev) => prev.map((c) => (c.id === id ? { ...c, ativo: false } : c)));
  };

  // Entregadores
  const toggleOnline = (id: string) => {
    setEntregadores((prev) => prev.map((e) => (e.id === id ? { ...e, online: !e.online } : e)));
  };

  const excluirEntregador = (id: string) => {
    setEntregadores((prev) => prev.filter((e) => e.id !== id));
  };

  // Fornecedores
  const addFornecedor = (data: Omit<Fornecedor, "id" | "historico">) => {
    setFornecedores((prev) => [...prev, { ...data, id: `fo${Date.now()}`, historico: [] }]);
  };

  const editFornecedor = (id: string, data: Omit<Fornecedor, "id" | "historico">) => {
    setFornecedores((prev) => prev.map((f) => (f.id === id ? { ...f, ...data } : f)));
  };

  return (
    <PageContainer title="Parceiros" subtitle="Clientes, colaboradores, entregadores e fornecedores">
      <Tabs defaultValue="clientes">
        <TabsList className="grid w-full grid-cols-4 max-w-xl">
          <TabsTrigger value="clientes" className="gap-1.5">
            <Users className="h-4 w-4" /> Clientes
          </TabsTrigger>
          <TabsTrigger value="colaboradores" className="gap-1.5">
            <Briefcase className="h-4 w-4" /> Colaboradores
          </TabsTrigger>
          <TabsTrigger value="entregadores" className="gap-1.5">
            <Bike className="h-4 w-4" /> Entregadores
          </TabsTrigger>
          <TabsTrigger value="fornecedores" className="gap-1.5">
            <Building2 className="h-4 w-4" /> Fornecedores
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clientes">
          <AbaClientes
            clientes={clientes}
            onAddCliente={addCliente}
            onEditCliente={editCliente}
            onPromover={promover}
          />
        </TabsContent>

        <TabsContent value="colaboradores">
          <AbaColaboradores
            colaboradores={colaboradores}
            clientes={clientes}
            onEdit={editColaborador}
            onDemitir={demitir}
          />
        </TabsContent>

        <TabsContent value="entregadores">
          <AbaEntregadores
            entregadores={entregadores}
            clientes={clientes}
            onToggleOnline={toggleOnline}
            onExcluir={excluirEntregador}
          />
        </TabsContent>

        <TabsContent value="fornecedores">
          <AbaFornecedores
            fornecedores={fornecedores}
            onAdd={addFornecedor}
            onEdit={editFornecedor}
          />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}

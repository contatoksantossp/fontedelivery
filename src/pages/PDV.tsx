import { useState, useEffect, useCallback } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { FilaPedidos } from "@/components/pdv/FilaPedidos";
import { Vitrine } from "@/components/pdv/Vitrine";
import { Carrinho } from "@/components/pdv/Carrinho";
import {
  pedidosFilaMock,
  clientesMock,
  PedidoFila,
  ItemCarrinho,
  Pagamento,
  Produto,
  Variante,
  CanalVenda,
  Modalidade,
  Cliente,
} from "@/components/pdv/mockPdvData";
import { toast } from "sonner";

export default function PDV() {
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
    return () => setOpen(true);
  }, [setOpen]);

  // Fila
  const [filaPedidos, setFilaPedidos] = useState<PedidoFila[]>(pedidosFilaMock);
  const [selectedPedidoId, setSelectedPedidoId] = useState<string | null>(null);

  // Carrinho
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [activeTab, setActiveTab] = useState<"identificacao" | "carrinho" | "pagamentos">("identificacao");

  // Identificacao
  const [canal, setCanalVenda] = useState<CanalVenda>("balcao");
  const [modalidade, setModalidadeState] = useState<Modalidade>("retirada");

  const setModalidade = useCallback((m: Modalidade) => {
    setModalidadeState(m);
    if (m === "entrega" && cliente) {
      const principal = cliente.enderecos.find(e => e.principal);
      if (principal) setEnderecoId(principal.id);
    }
  }, [cliente]);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [enderecoId, setEnderecoId] = useState<string | null>(null);

  // Pagamentos
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);

  const subtotal = itens.reduce((a, i) => a + i.preco * i.quantidade, 0);
  const desconto = 0;
  const taxaEntrega = modalidade === "entrega" ? 7.0 : 0;

  // Load pedido from fila
  const handleSelectFila = useCallback((pedido: PedidoFila) => {
    setSelectedPedidoId(pedido.id);
    setItens([...pedido.itens]);
    setCanalVenda(pedido.canal);
    setModalidade(pedido.modalidade);
    setPagamentos([...pedido.pagamentos]);
    // Load cliente
    const foundCliente = clientesMock.find((c) => c.id === pedido.clienteId) || null;
    setCliente(foundCliente);
    setEnderecoId(pedido.enderecoId || null);
    setActiveTab("carrinho");
  }, []);

  // Add item from vitrine
  const handleAddItem = useCallback((produto: Produto, variante: Variante, qty: number) => {
    setItens((prev) => {
      const existing = prev.find(
        (i) => i.produtoId === produto.id && i.varianteId === (variante.id || undefined)
      );
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantidade: i.quantidade + qty } : i
        );
      }
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          produtoId: produto.id,
          varianteId: variante.id,
          nome: produto.nome,
          varianteNome: variante.nome !== "Único" && variante.nome !== "Única" ? variante.nome : undefined,
          preco: variante.preco,
          quantidade: qty,
        },
      ];
    });
    setActiveTab("carrinho");
  }, []);

  const handleUpdateQty = useCallback((itemId: string, delta: number) => {
    setItens((prev) =>
      prev
        .map((i) => (i.id === itemId ? { ...i, quantidade: i.quantidade + delta } : i))
        .filter((i) => i.quantidade > 0)
    );
  }, []);

  const handleRemove = useCallback((itemId: string) => {
    setItens((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const handleAddPagamento = useCallback((p: Pagamento) => {
    setPagamentos((prev) => [...prev, p]);
  }, []);

  const handleRemovePagamento = useCallback((id: string) => {
    setPagamentos((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleFinalizar = useCallback(() => {
    // Remove from fila if was a fila pedido
    if (selectedPedidoId) {
      setFilaPedidos((prev) => prev.filter((p) => p.id !== selectedPedidoId));
    }
    // Reset
    setItens([]);
    setPagamentos([]);
    setCliente(null);
    setEnderecoId(null);
    setCanalVenda("balcao");
    setModalidade("retirada");
    setActiveTab("identificacao");
    setSelectedPedidoId(null);
    toast.success("Pedido finalizado com sucesso!");
  }, [selectedPedidoId]);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Col 1 — Fila (20%) */}
      <div className="w-[20%] border-r border-border flex flex-col overflow-hidden">
        <FilaPedidos
          pedidos={filaPedidos}
          selectedId={selectedPedidoId}
          onSelect={handleSelectFila}
        />
      </div>

      {/* Col 2 — Vitrine (50%) */}
      <div className="w-[50%] border-r border-border flex flex-col overflow-hidden">
        <Vitrine onAddItem={handleAddItem} />
      </div>

      {/* Col 3 — Carrinho (30%) */}
      <div className="w-[30%] flex flex-col overflow-hidden">
        <Carrinho
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          canal={canal}
          setCanalVenda={setCanalVenda}
          modalidade={modalidade}
          setModalidade={setModalidade}
          cliente={cliente}
          setCliente={setCliente}
          enderecoId={enderecoId}
          setEnderecoId={setEnderecoId}
          itens={itens}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemove}
          subtotal={subtotal}
          desconto={desconto}
          taxaEntrega={taxaEntrega}
          pagamentos={pagamentos}
          onAddPagamento={handleAddPagamento}
          onRemovePagamento={handleRemovePagamento}
          onFinalizar={handleFinalizar}
        />
      </div>
    </div>
  );
}

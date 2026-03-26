import { useState, useEffect, useRef } from "react";
import { Pedido } from "./mockData";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PedidoDetalhesProps {
  pedido: Pedido | null;
}

export function PedidoDetalhes({ pedido }: PedidoDetalhesProps) {
  const [printed, setPrinted] = useState(false);
  const cupomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPrinted(false);
  }, [pedido?.id]);

  const handlePrint = () => {
    window.print();
    setPrinted(true);
  };

  if (!pedido) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        Selecione um pedido para ver os detalhes
      </div>
    );
  }

  const separator = "- - - - - - - - - - - - - - - - - -";

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      {/* Botão Imprimir */}
      <div className="p-2 border-b border-gray-200">
        <Button
          onClick={handlePrint}
          className={`w-full text-xs font-bold transition-all ${
            printed
              ? "bg-gray-300 text-gray-500 hover:bg-gray-400"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
          size="sm"
        >
          <Printer className="h-3.5 w-3.5 mr-1.5" />
          {printed ? "Impresso ✓" : "Imprimir Cupom"}
        </Button>
      </div>

      {/* Cupom */}
      <div
        id="cupom-print"
        ref={cupomRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-xs text-black bg-white"
      >
        {/* Header */}
        <div className="text-center space-y-0.5 mb-1">
          <p className="font-bold text-sm">PEDIDO</p>
          <p className="font-bold text-lg">{pedido.codigo}</p>
          <p className="text-[10px] text-gray-500 uppercase">{pedido.tipo === "entrega" ? "Entrega" : "Retirada"}</p>
        </div>

        <p className="text-center text-gray-400 text-[10px]">{separator}</p>

        {/* Cliente */}
        <div className="my-2 space-y-0.5">
          <p className="font-bold">{pedido.cliente}</p>
          <p className="text-gray-600">{pedido.telefone}</p>
          {pedido.tipo === "entrega" && (
            <p className="text-gray-600">{pedido.endereco}, {pedido.bairro}</p>
          )}
        </div>

        <p className="text-center text-gray-400 text-[10px]">{separator}</p>

        {/* Itens */}
        <div className="my-2">
          <p className="font-bold mb-1">ITENS</p>
          {pedido.itens.map((item, i) => (
            <div key={i} className="mb-1">
              <div className="flex justify-between">
                <span>{item.qtd}x {item.nome}</span>
                <span className="font-medium">
                  {(item.qtd * item.preco).toFixed(2)}
                </span>
              </div>
              {item.obs && (
                <p className="text-gray-500 text-[10px] ml-3">↳ {item.obs}</p>
              )}
            </div>
          ))}
        </div>

        {pedido.observacoes && (
          <>
            <p className="text-center text-gray-400 text-[10px]">{separator}</p>
            <div className="my-2">
              <p className="font-bold mb-0.5">OBS:</p>
              <p className="text-gray-600">{pedido.observacoes}</p>
            </div>
          </>
        )}

        <p className="text-center text-gray-400 text-[10px]">{separator}</p>

        {/* Totais */}
        <div className="my-2 space-y-0.5">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{pedido.subtotal.toFixed(2)}</span>
          </div>
          {pedido.taxaEntrega > 0 && (
            <div className="flex justify-between">
              <span>Taxa Entrega</span>
              <span>{pedido.taxaEntrega.toFixed(2)}</span>
            </div>
          )}
          {pedido.desconto > 0 && (
            <div className="flex justify-between text-orange-600">
              <span>Desconto</span>
              <span>-{pedido.desconto.toFixed(2)}</span>
            </div>
          )}
        </div>

        <p className="text-center text-gray-400 text-[10px]">{separator}</p>

        <div className="my-2">
          <div className="flex justify-between font-bold text-sm">
            <span>TOTAL</span>
            <span>R$ {pedido.total.toFixed(2)}</span>
          </div>
          <p className="text-gray-500 mt-0.5">Pagamento: {pedido.formaPagamento}</p>
        </div>

        <p className="text-center text-gray-400 text-[10px]">{separator}</p>

        <p className="text-center text-[10px] text-gray-400 mt-2">
          ** Documento sem valor fiscal **
        </p>
      </div>
    </div>
  );
}

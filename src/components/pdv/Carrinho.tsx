import { ItemCarrinho, Pagamento, CanalVenda, Modalidade, Cliente } from "./mockPdvData";
import { AbaIdentificacao } from "./AbaIdentificacao";
import { AbaCarrinho } from "./AbaCarrinho";
import { AbaPagamentos } from "./AbaPagamentos";
import { cn } from "@/lib/utils";
import { User, ShoppingCart, CreditCard } from "lucide-react";

type TabId = "identificacao" | "carrinho" | "pagamentos";

interface CarrinhoProps {
  activeTab: TabId;
  setActiveTab: (t: TabId) => void;
  // Identificacao
  canal: CanalVenda;
  setCanalVenda: (c: CanalVenda) => void;
  modalidade: Modalidade;
  setModalidade: (m: Modalidade) => void;
  cliente: Cliente | null;
  setCliente: (c: Cliente | null) => void;
  enderecoId: string | null;
  setEnderecoId: (id: string | null) => void;
  // Carrinho
  itens: ItemCarrinho[];
  onUpdateQty: (itemId: string, delta: number) => void;
  onRemove: (itemId: string) => void;
  // Pagamentos
  subtotal: number;
  desconto: number;
  taxaEntrega: number;
  pagamentos: Pagamento[];
  onAddPagamento: (p: Pagamento) => void;
  onRemovePagamento: (id: string) => void;
  onFinalizar: () => void;
}

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "identificacao", label: "1. Dados", icon: <User className="h-3 w-3" /> },
  { id: "carrinho", label: "2. Itens", icon: <ShoppingCart className="h-3 w-3" /> },
  { id: "pagamentos", label: "3. Pagar", icon: <CreditCard className="h-3 w-3" /> },
];

export function Carrinho(props: CarrinhoProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Tab header */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => props.setActiveTab(tab.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors border-b-2",
              props.activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {props.activeTab === "identificacao" && (
          <AbaIdentificacao
            canal={props.canal}
            setCanalVenda={props.setCanalVenda}
            modalidade={props.modalidade}
            setModalidade={props.setModalidade}
            cliente={props.cliente}
            setCliente={props.setCliente}
            enderecoId={props.enderecoId}
            setEnderecoId={props.setEnderecoId}
            onProximo={() => props.setActiveTab("carrinho")}
          />
        )}
        {props.activeTab === "carrinho" && (
          <AbaCarrinho
            itens={props.itens}
            onUpdateQty={props.onUpdateQty}
            onRemove={props.onRemove}
            onProximo={() => props.setActiveTab("pagamentos")}
          />
        )}
        {props.activeTab === "pagamentos" && (
          <AbaPagamentos
            subtotal={props.subtotal}
            desconto={props.desconto}
            taxaEntrega={props.taxaEntrega}
            pagamentos={props.pagamentos}
            onAddPagamento={props.onAddPagamento}
            onRemovePagamento={props.onRemovePagamento}
            onFinalizar={props.onFinalizar}
          />
        )}
      </div>
    </div>
  );
}

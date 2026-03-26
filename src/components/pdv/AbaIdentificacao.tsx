import { useState } from "react";
import { clientesMock, Cliente, CanalVenda, Modalidade, EnderecoCliente } from "./mockPdvData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Search, Truck, MapPin, Store, MessageCircle, Smartphone } from "lucide-react";

interface AbaIdentificacaoProps {
  canal: CanalVenda;
  setCanalVenda: (c: CanalVenda) => void;
  modalidade: Modalidade;
  setModalidade: (m: Modalidade) => void;
  cliente: Cliente | null;
  setCliente: (c: Cliente | null) => void;
  enderecoId: string | null;
  setEnderecoId: (id: string | null) => void;
  onProximo: () => void;
}

const canais: { id: CanalVenda; label: string; icon: React.ReactNode }[] = [
  { id: "balcao", label: "Balcão", icon: <Store className="h-4 w-4" /> },
  { id: "whatsapp", label: "WhatsApp", icon: <MessageCircle className="h-4 w-4" /> },
  { id: "99food", label: "99Food", icon: <Smartphone className="h-4 w-4" /> },
  { id: "ifood", label: "iFood", icon: <Smartphone className="h-4 w-4" /> },
  { id: "app", label: "App", icon: <Smartphone className="h-4 w-4" /> },
];

export function AbaIdentificacao({
  canal, setCanalVenda, modalidade, setModalidade,
  cliente, setCliente, enderecoId, setEnderecoId, onProximo,
}: AbaIdentificacaoProps) {
  const [buscaCliente, setBuscaCliente] = useState("");
  const showLocalizador = canal === "99food" || canal === "ifood";

  const clientesFiltrados = buscaCliente.trim()
    ? clientesMock.filter(
        (c) =>
          c.nome.toLowerCase().includes(buscaCliente.toLowerCase()) ||
          c.telefone.includes(buscaCliente)
      )
    : [];

  return (
    <ScrollArea className="flex-1">
      <div className="p-3 space-y-4">
        {/* Canal */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2">Canal de Venda</p>
          <div className="flex gap-1">
            {canais.map((c) => (
              <button
                key={c.id}
                onClick={() => setCanalVenda(c.id)}
                title={c.label}
                className={cn(
                  "flex items-center justify-center rounded-lg border h-8 w-8 transition-colors",
                  canal === c.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {c.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Localizador */}
        {showLocalizador && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">Nº do Pedido ({canal})</p>
            <Input placeholder="Ex: 12345" className="h-8 text-xs" />
          </div>
        )}

        {/* Cliente */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1">Cliente</p>
          {cliente ? (
            <div className="rounded-lg border border-primary bg-primary/5 p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{cliente.nome}</p>
                  <p className="text-[10px] text-muted-foreground">{cliente.telefone}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => { setCliente(null); setEnderecoId(null); }}>
                  Trocar
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="relative">
                <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Nome ou telefone..."
                  value={buscaCliente}
                  onChange={(e) => setBuscaCliente(e.target.value)}
                  className="pl-7 h-8 text-xs"
                />
              </div>
              {clientesFiltrados.length > 0 && (
                <div className="mt-1 border border-border rounded-lg overflow-hidden">
                  {clientesFiltrados.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setCliente(c); setBuscaCliente(""); }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-secondary border-b border-border last:border-b-0"
                    >
                      <span className="text-foreground">{c.nome}</span>
                      <span className="text-muted-foreground ml-2">{c.telefone}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Modalidade */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2">Modalidade</p>
          <div className="flex gap-2">
            <button
              onClick={() => setModalidade("entrega")}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 rounded-lg border p-2.5 text-xs transition-colors",
                modalidade === "entrega"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              <Truck className="h-4 w-4" /> Entrega
            </button>
            <button
              onClick={() => setModalidade("retirada")}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 rounded-lg border p-2.5 text-xs transition-colors",
                modalidade === "retirada"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              <MapPin className="h-4 w-4" /> Retirada
            </button>
          </div>
        </div>

        {/* Enderecos */}
        {modalidade === "entrega" && cliente && cliente.enderecos.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">Endereço</p>
            <div className="space-y-1.5">
              {cliente.enderecos.map((end) => (
                <button
                  key={end.id}
                  onClick={() => setEnderecoId(end.id)}
                  className={cn(
                    "w-full text-left rounded-lg border p-2 text-xs transition-colors",
                    enderecoId === end.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-secondary"
                  )}
                >
                  <p className="text-foreground">{end.rua}</p>
                  <p className="text-[10px] text-muted-foreground">{end.bairro}{end.complemento ? ` • ${end.complemento}` : ""}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <Button onClick={onProximo} className="w-full">Próximo</Button>
      </div>
    </ScrollArea>
  );
}

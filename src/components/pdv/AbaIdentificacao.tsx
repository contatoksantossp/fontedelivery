import { useState } from "react";
import { clientesMock, Cliente, CanalVenda, Modalidade, EnderecoCliente } from "./mockPdvData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Search, Truck, MapPin, Store, MessageCircle, Smartphone, UserPlus, Plus } from "lucide-react";

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
  const [novoEnderecoMode, setNovoEnderecoMode] = useState(false);
  const [novoEndereco, setNovoEndereco] = useState({ rua: "", bairro: "", complemento: "" });
  const showLocalizador = canal === "99food" || canal === "ifood";

  const clientesFiltrados = buscaCliente.trim()
    ? clientesMock
        .filter(
          (c) =>
            c.nome.toLowerCase().includes(buscaCliente.toLowerCase()) ||
            c.telefone.includes(buscaCliente)
        )
        .slice(0, 3)
    : [];

  const handleCriarNovoCliente = () => {
    const nome = buscaCliente.trim() || "Novo Cliente";
    const novoCliente: Cliente = {
      id: `c_new_${Date.now()}`,
      nome,
      telefone: "",
      enderecos: [],
    };
    clientesMock.push(novoCliente);
    setCliente(novoCliente);
    setBuscaCliente("");
    setNovoEnderecoMode(true);
  };

  const handleSalvarNovoEndereco = () => {
    if (!cliente || !novoEndereco.rua.trim()) return;
    const end: EnderecoCliente = {
      id: `end_new_${Date.now()}`,
      rua: novoEndereco.rua.trim(),
      bairro: novoEndereco.bairro.trim(),
      complemento: novoEndereco.complemento.trim() || undefined,
    };
    cliente.enderecos.push(end);
    setEnderecoId(end.id);
    setNovoEnderecoMode(false);
    setNovoEndereco({ rua: "", bairro: "", complemento: "" });
  };

  return (
    <ScrollArea className="flex-1">
      <div className="p-3 space-y-4">
        {/* Canal */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2">Canal de Venda</p>
          <div className="flex gap-1 w-full">
            {canais.map((c) => (
              <button
                key={c.id}
                onClick={() => setCanalVenda(c.id)}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-0.5 rounded-lg border py-1.5 transition-colors min-w-0",
                  canal === c.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {c.icon}
                <span className="text-[9px] font-medium truncate w-full text-center">{c.label}</span>
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
                  <p className="text-[10px] text-muted-foreground">{cliente.telefone || "Sem telefone"}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => { setCliente(null); setEnderecoId(null); setNovoEnderecoMode(false); }}>
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
              {buscaCliente.trim() && (
                <div className="mt-1 border border-border rounded-lg overflow-hidden">
                  {clientesFiltrados.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setCliente(c); setBuscaCliente(""); }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-secondary border-b border-border"
                    >
                      <span className="text-foreground">{c.nome}</span>
                      <span className="text-muted-foreground ml-2">{c.telefone}</span>
                    </button>
                  ))}
                  {/* Criar novo */}
                  <button
                    onClick={handleCriarNovoCliente}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-primary/5 flex items-center gap-1.5 text-primary font-medium"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Criar novo "{buscaCliente.trim()}"
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Novo endereço (após criar cliente sem endereços) */}
        {novoEnderecoMode && cliente && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">Cadastrar Endereço</p>
            <div className="space-y-1.5">
              <Input
                placeholder="Rua, número..."
                value={novoEndereco.rua}
                onChange={(e) => setNovoEndereco((p) => ({ ...p, rua: e.target.value }))}
                className="h-8 text-xs"
              />
              <Input
                placeholder="Bairro"
                value={novoEndereco.bairro}
                onChange={(e) => setNovoEndereco((p) => ({ ...p, bairro: e.target.value }))}
                className="h-8 text-xs"
              />
              <Input
                placeholder="Complemento (opcional)"
                value={novoEndereco.complemento}
                onChange={(e) => setNovoEndereco((p) => ({ ...p, complemento: e.target.value }))}
                className="h-8 text-xs"
              />
              <Button size="sm" className="w-full h-8 text-xs" onClick={handleSalvarNovoEndereco} disabled={!novoEndereco.rua.trim()}>
                Salvar Endereço
              </Button>
            </div>
          </div>
        )}

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
        {modalidade === "entrega" && cliente && !novoEnderecoMode && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">Endereço</p>
            <div className="space-y-1.5">
              {cliente.enderecos.length > 0 ? (
                <>
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
                  <button
                    onClick={() => setNovoEnderecoMode(true)}
                    className="w-full flex items-center justify-center gap-1 rounded-lg border border-dashed border-border p-2 text-xs text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                  >
                    <Plus className="h-3 w-3" /> Novo endereço
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setNovoEnderecoMode(true)}
                  className="w-full flex items-center justify-center gap-1 rounded-lg border border-dashed border-border p-2 text-xs text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                >
                  <Plus className="h-3 w-3" /> Cadastrar endereço
                </button>
              )}
            </div>
          </div>
        )}

        <Button onClick={onProximo} className="w-full">Próximo</Button>
      </div>
    </ScrollArea>
  );
}

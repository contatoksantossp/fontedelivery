import { useState } from "react";
import { clientesMock, Cliente, CanalVenda, Modalidade, EnderecoCliente, EnderecoCache, enderecoCacheMock, simularBuscaAPI } from "./mockPdvData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Search, Truck, MapPin, Store, MessageCircle, Smartphone, UserPlus, Plus, Loader2 } from "lucide-react";

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

  // Address search state
  const [buscaEndereco, setBuscaEndereco] = useState("");
  const [enderecoSelecionado, setEnderecoSelecionado] = useState<EnderecoCache | null>(null);
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [buscandoAPI, setBuscandoAPI] = useState(false);

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

  const enderecosFiltrados = buscaEndereco.trim() && !enderecoSelecionado
    ? enderecoCacheMock
        .filter(
          (e) =>
            e.rua.toLowerCase().includes(buscaEndereco.toLowerCase()) ||
            e.bairro.toLowerCase().includes(buscaEndereco.toLowerCase())
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

  const handleSelecionarEnderecoCache = (ec: EnderecoCache) => {
    setEnderecoSelecionado(ec);
    setNumero(ec.numero || "");
    setComplemento("");
    setBuscaEndereco(ec.rua);
  };

  const handleBuscarAPI = async () => {
    if (!buscaEndereco.trim()) return;
    setBuscandoAPI(true);
    const resultado = await simularBuscaAPI(buscaEndereco);
    setBuscandoAPI(false);
    handleSelecionarEnderecoCache(resultado);
  };

  const handleSalvarEndereco = () => {
    if (!cliente || !enderecoSelecionado || !numero.trim()) return;

    // Check if address (rua + numero) already exists in cache
    const existeNoCache = enderecoCacheMock.find(
      (e) => e.rua.toLowerCase() === enderecoSelecionado.rua.toLowerCase() && e.numero === numero.trim()
    );

    if (!existeNoCache) {
      const novoCacheEntry: EnderecoCache = {
        id: `ec_new_${Date.now()}`,
        rua: enderecoSelecionado.rua,
        numero: numero.trim(),
        bairro: enderecoSelecionado.bairro,
        cep: enderecoSelecionado.cep,
        cidade: enderecoSelecionado.cidade,
      };
      enderecoCacheMock.push(novoCacheEntry);
    }

    const novoEnd: EnderecoCliente = {
      id: `end_new_${Date.now()}`,
      rua: `${enderecoSelecionado.rua}, ${numero.trim()}`,
      numero: numero.trim(),
      bairro: enderecoSelecionado.bairro,
      cep: enderecoSelecionado.cep,
      cidade: enderecoSelecionado.cidade,
      complemento: complemento.trim() || undefined,
    };
    cliente.enderecos.push(novoEnd);
    setEnderecoId(novoEnd.id);
    resetEnderecoForm();
  };

  const resetEnderecoForm = () => {
    setNovoEnderecoMode(false);
    setBuscaEndereco("");
    setEnderecoSelecionado(null);
    setNumero("");
    setComplemento("");
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
                <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => { setCliente(null); setEnderecoId(null); resetEnderecoForm(); }}>
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

        {/* Novo endereço — busca com cache */}
        {novoEnderecoMode && cliente && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">Cadastrar Endereço</p>
            <div className="space-y-1.5">
              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Buscar endereço..."
                  value={buscaEndereco}
                  onChange={(e) => {
                    setBuscaEndereco(e.target.value);
                    if (enderecoSelecionado) {
                      setEnderecoSelecionado(null);
                      setNumero("");
                      setComplemento("");
                    }
                  }}
                  className="pl-7 h-8 text-xs"
                />
              </div>

              {/* Search results */}
              {buscaEndereco.trim() && !enderecoSelecionado && (
                <div className="border border-border rounded-lg overflow-hidden">
                  {enderecosFiltrados.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => handleSelecionarEnderecoCache(e)}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-secondary border-b border-border"
                    >
                      <p className="text-foreground">{e.rua}{e.numero ? `, ${e.numero}` : ""}</p>
                      <p className="text-[10px] text-muted-foreground">{e.bairro} • {e.cep} • {e.cidade}</p>
                    </button>
                  ))}
                  <button
                    onClick={handleBuscarAPI}
                    disabled={buscandoAPI}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-primary/5 flex items-center gap-1.5 text-primary font-medium"
                  >
                    {buscandoAPI ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Search className="h-3.5 w-3.5" />
                    )}
                    {buscandoAPI ? "Buscando..." : `Buscar "${buscaEndereco.trim()}"`}
                  </button>
                </div>
              )}

              {/* Revealed fields after selection */}
              {enderecoSelecionado && (
                <div className="space-y-1.5">
                  <Input value={enderecoSelecionado.rua} readOnly className="h-8 text-xs bg-muted text-muted-foreground" />
                  <Input value={enderecoSelecionado.bairro} readOnly className="h-8 text-xs bg-muted text-muted-foreground" />
                  <div className="flex gap-1.5">
                    <Input value={enderecoSelecionado.cep} readOnly className="h-8 text-xs bg-muted text-muted-foreground flex-1" />
                    <Input value={enderecoSelecionado.cidade} readOnly className="h-8 text-xs bg-muted text-muted-foreground flex-1" />
                  </div>
                  <div className="flex gap-1.5">
                    <Input
                      placeholder="Número *"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      className="h-8 text-xs flex-1"
                    />
                    <Input
                      placeholder="Complemento"
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                      className="h-8 text-xs flex-1"
                    />
                  </div>
                  <Button
                    size="sm"
                    className="w-full h-8 text-xs"
                    onClick={handleSalvarEndereco}
                    disabled={!numero.trim()}
                  >
                    Salvar Endereço
                  </Button>
                </div>
              )}
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

        {/* Enderecos salvos */}
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
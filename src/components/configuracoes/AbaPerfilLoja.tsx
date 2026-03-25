import { Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { HorarioFuncionamento, PerfilLoja } from "./mockConfigData";
import { toast } from "sonner";

interface Props {
  perfil: PerfilLoja;
  setPerfil: React.Dispatch<React.SetStateAction<PerfilLoja>>;
  horarios: HorarioFuncionamento[];
  setHorarios: React.Dispatch<React.SetStateAction<HorarioFuncionamento[]>>;
}

export function AbaPerfilLoja({ perfil, setPerfil, horarios, setHorarios }: Props) {
  const toggleHorario = (idx: number) => {
    setHorarios(prev => prev.map((h, i) => i === idx ? { ...h, ativo: !h.ativo } : h));
  };

  const updateHorario = (idx: number, field: "abertura" | "fechamento", value: string) => {
    setHorarios(prev => prev.map((h, i) => i === idx ? { ...h, [field]: value } : h));
  };

  return (
    <div className="space-y-6">
      {/* Dados Básicos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dados da Loja</CardTitle>
          <CardDescription>Informações básicas do seu estabelecimento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-6">
            {/* Logo placeholder */}
            <div className="flex flex-col items-center gap-2">
              <div className="h-24 w-24 rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                <Camera className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <span className="text-xs text-muted-foreground">Logo</span>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome da Loja</Label>
                <Input
                  value={perfil.nomeLoja}
                  onChange={e => setPerfil(p => ({ ...p, nomeLoja: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Telefone de Contato</Label>
                <Input
                  value={perfil.telefone}
                  onChange={e => setPerfil(p => ({ ...p, telefone: e.target.value }))}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Endereço da Loja</Label>
                <Input
                  value={perfil.endereco}
                  onChange={e => setPerfil(p => ({ ...p, endereco: e.target.value }))}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => toast.success("Dados salvos com sucesso!")}>
              <Save className="h-4 w-4 mr-1" /> Salvar Dados
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Horários de Funcionamento */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Horários de Funcionamento</CardTitle>
          <CardDescription>Defina os horários de abertura e fechamento para cada dia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {horarios.map((h, idx) => (
              <div key={h.dia} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
                <div className="w-36 font-medium text-sm">{h.dia}</div>
                <Switch
                  checked={h.ativo}
                  onCheckedChange={() => toggleHorario(idx)}
                />
                <Input
                  type="time"
                  value={h.abertura}
                  disabled={!h.ativo}
                  onChange={e => updateHorario(idx, "abertura", e.target.value)}
                  className="w-32"
                />
                <span className="text-muted-foreground text-sm">até</span>
                <Input
                  type="time"
                  value={h.fechamento}
                  disabled={!h.ativo}
                  onChange={e => updateHorario(idx, "fechamento", e.target.value)}
                  className="w-32"
                />
                {!h.ativo && <span className="text-xs text-muted-foreground">Fechado</span>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status da Loja */}
      <Card className={perfil.lojaAberta ? "border-green-500/30 bg-green-500/5" : "border-destructive/30 bg-destructive/5"}>
        <CardContent className="flex items-center justify-between py-6">
          <div>
            <h3 className="font-bold text-lg">
              {perfil.lojaAberta ? "🟢 Loja Aberta" : "🔴 Loja Fechada"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Use este controle para abrir ou fechar a loja manualmente, independente do horário configurado.
            </p>
          </div>
          <Switch
            checked={perfil.lojaAberta}
            onCheckedChange={v => setPerfil(p => ({ ...p, lojaAberta: v }))}
            className="scale-125"
          />
        </CardContent>
      </Card>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, ImageIcon, Upload } from "lucide-react";
import type { KitCombo, KitComboSlot, CatalogSubcategoria } from "./mockCatalogoData";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (kit: KitCombo) => void;
  editItem?: KitCombo | null;
  subcategorias: CatalogSubcategoria[];
}

function BannerUpload({ src, onFileSelect }: { src: string; onFileSelect: (url: string) => void }) {
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { setError(false); }, [src]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(URL.createObjectURL(file));
    }
    e.target.value = "";
  };

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-1 w-full h-24 rounded-lg border border-border bg-muted flex items-center justify-center relative group cursor-pointer overflow-hidden hover:ring-2 hover:ring-primary/40 transition-all"
      >
        {!src || src === "/placeholder.svg" || error ? (
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <ImageIcon className="h-6 w-6" />
            <span className="text-[10px]">Clique para enviar</span>
          </div>
        ) : (
          <img src={src} alt="Banner" className="w-full h-full object-cover" onError={() => setError(true)} />
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Upload className="h-5 w-5 text-white" />
        </div>
      </button>
    </>
  );
}

export function KitComboDialog({ open, onClose, onSave, editItem, subcategorias }: Props) {
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("/placeholder.svg");
  const [ativo, setAtivo] = useState(true);
  const [tipo, setTipo] = useState<"kit" | "combo">("combo");
  const [tipoDesconto, setTipoDesconto] = useState<"%" | "R$">("%");
  const [valorDesconto, setValorDesconto] = useState(0);
  const [subcategoriaVinculo, setSubcategoriaVinculo] = useState("");
  const [slots, setSlots] = useState<KitComboSlot[]>([]);

  useEffect(() => {
    if (editItem) {
      setNome(editItem.nome); setImagem(editItem.imagem); setAtivo(editItem.ativo);
      setTipo(editItem.tipo); setTipoDesconto(editItem.tipoDesconto);
      setValorDesconto(editItem.valorDesconto); setSubcategoriaVinculo(editItem.subcategoriaVinculo);
      setSlots([...editItem.slots]);
    } else {
      setNome(""); setImagem("/placeholder.svg"); setAtivo(true); setTipo("combo");
      setTipoDesconto("%"); setValorDesconto(0); setSubcategoriaVinculo(""); setSlots([]);
    }
  }, [editItem, open]);

  const addSlot = () => setSlots([...slots, { id: crypto.randomUUID(), subcategoriaId: "", nome: "" }]);

  const updateSlot = (idx: number, field: keyof KitComboSlot, value: string) => {
    setSlots(slots.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };

  const handleSave = () => {
    onSave({
      id: editItem?.id || crypto.randomUUID(),
      nome, imagem, ativo, tipo, tipoDesconto, valorDesconto, subcategoriaVinculo, slots,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editItem ? "Editar Kit/Combo" : "Novo Kit/Combo"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div><Label>Nome</Label><Input value={nome} onChange={(e) => setNome(e.target.value)} /></div>
          <div>
            <Label>Banner</Label>
            <BannerUpload src={imagem} onFileSelect={setImagem} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tipo</Label>
              <Select value={tipo} onValueChange={(v) => setTipo(v as "kit" | "combo")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="kit">Kit</SelectItem>
                  <SelectItem value="combo">Combo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 pt-6"><Switch checked={ativo} onCheckedChange={setAtivo} /><Label>Ativo</Label></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tipo de Desconto</Label>
              <Select value={tipoDesconto} onValueChange={(v) => setTipoDesconto(v as "%" | "R$")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="%">Percentual (%)</SelectItem>
                  <SelectItem value="R$">Valor (R$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Valor do Desconto</Label><Input type="number" value={valorDesconto} onChange={(e) => setValorDesconto(+e.target.value)} /></div>
          </div>
          <div>
            <Label>Subcategoria Vínculo</Label>
            <Select value={subcategoriaVinculo} onValueChange={setSubcategoriaVinculo}>
              <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
              <SelectContent>
                {subcategorias.map(s => <SelectItem key={s.id} value={s.id}>{s.nome}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Slots</Label>
              <Button size="sm" variant="outline" onClick={addSlot}><Plus className="mr-1 h-3 w-3" /> Slot</Button>
            </div>
            {slots.map((slot, i) => (
              <div key={slot.id} className="mb-2 flex items-end gap-2">
                <div className="flex-1">
                  <Label className="text-xs">Nome do Slot</Label>
                  <Input className="h-8 text-sm" value={slot.nome} onChange={(e) => updateSlot(i, "nome", e.target.value)} />
                </div>
                <div className="flex-1">
                  <Label className="text-xs">Subcategoria</Label>
                  <Select value={slot.subcategoriaId} onValueChange={(v) => updateSlot(i, "subcategoriaId", v)}>
                    <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent>
                      {subcategorias.map(s => <SelectItem key={s.id} value={s.id}>{s.nome}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => setSlots(slots.filter((_, j) => j !== i))}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!nome.trim()}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

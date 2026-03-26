import { CanalVenda } from "./mockPdvData";
import { cn } from "@/lib/utils";
import { Store, MessageCircle, Smartphone, ClipboardList } from "lucide-react";

const canais: { id: CanalVenda; label: string; icon: React.ReactNode }[] = [
  { id: "balcao", label: "Balcão", icon: <Store className="h-3.5 w-3.5" /> },
  { id: "whatsapp", label: "WhatsApp", icon: <MessageCircle className="h-3.5 w-3.5" /> },
  { id: "ifood", label: "iFood", icon: <Smartphone className="h-3.5 w-3.5" /> },
  { id: "99food", label: "99Food", icon: <Smartphone className="h-3.5 w-3.5" /> },
  { id: "app", label: "App", icon: <Smartphone className="h-3.5 w-3.5" /> },
];

interface CanalVendaSelectorProps {
  value: CanalVenda | "todos";
  onChange: (val: CanalVenda | "todos") => void;
  showTodos?: boolean;
}

export function CanalVendaSelector({ value, onChange, showTodos = false }: CanalVendaSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1 w-full">
        {canais.map((c) => (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-0.5 rounded-lg border py-1.5 transition-colors min-w-0",
              value === c.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            {c.icon}
            <span className="text-[9px] font-medium leading-none truncate w-full text-center">{c.label}</span>
          </button>
        ))}
      </div>
      {showTodos && (
        <button
          onClick={() => onChange("todos")}
          className={cn(
            "w-full flex items-center justify-center gap-1.5 rounded-lg border py-1.5 text-xs font-medium transition-colors",
            value === "todos"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-card text-muted-foreground hover:text-foreground"
          )}
        >
          <ClipboardList className="h-3.5 w-3.5" />
          Todos
        </button>
      )}
    </div>
  );
}

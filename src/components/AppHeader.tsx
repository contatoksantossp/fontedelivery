import { StatusBadge } from "./StatusBadge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Wallet, Clock } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-card px-4">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Carlos Souza</p>
            <p className="text-xs text-muted-foreground">A Fonte Delivery — Unidade Centro</p>
          </div>
          <StatusBadge status="online" />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span>Aberto em 25/03/2026 — 08:00</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Wallet className="h-3.5 w-3.5 text-primary" />
            <span>Fundo: R$ 200,00</span>
          </div>
        </div>
      </div>
    </header>
  );
}

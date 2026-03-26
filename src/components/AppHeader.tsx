import { useState } from "react";
import { StatusBadge } from "./StatusBadge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Wallet, Clock, Plus, LayoutDashboard, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export function AppHeader() {
  const navigate = useNavigate();
  const [lojaAberta, setLojaAberta] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const toggleLoja = () => {
    setLojaAberta(prev => !prev);
    toast.success(lojaAberta ? "Loja fechada com sucesso" : "Loja aberta com sucesso");
    setConfirmOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-card px-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Carlos Souza</p>
              <p className="text-xs text-muted-foreground">A Fonte Delivery — Unidade Centro</p>
            </div>
            <StatusBadge
              status={lojaAberta ? "online" : "offline"}
              onClick={() => setConfirmOpen(true)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" onClick={() => navigate("/visao-geral")}>
              <LayoutDashboard className="h-4 w-4" />
              Visão Geral
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" onClick={() => navigate("/rotas")}>
              <Truck className="h-4 w-4" />
              Logística
            </Button>
            <Button size="sm" className="gap-1.5" onClick={() => navigate("/pdv")}>
              <Plus className="h-4 w-4" />
              Novo Pedido
            </Button>
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

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {lojaAberta ? "Fechar a loja?" : "Abrir a loja?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {lojaAberta
                ? "Ao fechar, a loja ficará offline e não receberá novos pedidos."
                : "Ao abrir, a loja ficará online e voltará a receber pedidos."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={toggleLoja}>
              {lojaAberta ? "Sim, fechar" : "Sim, abrir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

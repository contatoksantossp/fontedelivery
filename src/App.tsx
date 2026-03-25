import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PlaceholderPage from "./pages/PlaceholderPage";
import PDV from "./pages/PDV";
import VisaoGeral from "./pages/VisaoGeral";
import Rotas from "./pages/Rotas";
import Catalogo from "./pages/Catalogo";
import Estoque from "./pages/Estoque";
import Financeiro from "./pages/Financeiro";
import CuponsPromocoes from "./pages/CuponsPromocoes";
import Parceiros from "./pages/Parceiros";
import { AppLayout } from "./layouts/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/visao-geral" element={<VisaoGeral />} />
            <Route path="/pdv" element={<PDV />} />
            <Route path="/rotas" element={<Rotas />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/cupons" element={<CuponsPromocoes />} />
            <Route path="/parceiros" element={<Parceiros />} />
            <Route path="/configuracoes" element={<PlaceholderPage title="Configurações" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

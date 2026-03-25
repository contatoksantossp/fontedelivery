import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PlaceholderPage from "./pages/PlaceholderPage";
import VisaoGeral from "./pages/VisaoGeral";
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
            <Route path="/pdv" element={<PlaceholderPage title="PDV — Ponto de Venda" />} />
            <Route path="/rotas" element={<PlaceholderPage title="Rotas e Logística" />} />
            <Route path="/catalogo" element={<PlaceholderPage title="Catálogo" />} />
            <Route path="/estoque" element={<PlaceholderPage title="Estoque" />} />
            <Route path="/financeiro" element={<PlaceholderPage title="Financeiro" />} />
            <Route path="/cupons" element={<PlaceholderPage title="Cupons e Promoções" />} />
            <Route path="/parceiros" element={<PlaceholderPage title="Parceiros" />} />
            <Route path="/configuracoes" element={<PlaceholderPage title="Configurações" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@admin.com" && password === "admin") {
      setError(false);
      navigate("/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-4">
            <Flame className="h-10 w-10 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold font-display text-foreground">A Fonte Delivery</h1>
            <p className="text-sm text-muted-foreground mt-1">Gestor — Acesso Operacional</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="operador@afonte.com"
              className="bg-card border-border focus:border-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-muted-foreground">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-card border-border focus:border-primary pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              Acesso negado. Verifique suas credenciais ou nível de permissão.
            </div>
          )}

          <Button type="submit" className="w-full font-display font-semibold text-sm">
            Entrar
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Apenas operadores com Nível &gt; 20 podem acessar o Gestor.
        </p>
      </div>
    </div>
  );
}

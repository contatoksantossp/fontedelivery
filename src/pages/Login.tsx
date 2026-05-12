import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Mode = "signin" | "signup";

export default function Login() {
  const navigate = useNavigate();
  const { signIn, user, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/dashboard", { replace: true });
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    if (mode === "signin") {
      const { error } = await signIn(email, password);
      setSubmitting(false);
      if (error) setError("Acesso negado. Verifique suas credenciais.");
      else navigate("/dashboard", { replace: true });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      });
      setSubmitting(false);
      if (error) {
        setError(error.message);
      } else {
        toast.success("Conta criada! Entre agora.");
        setMode("signin");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-4">
            <Flame className="h-10 w-10 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold font-display text-foreground">A Fonte Delivery</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "signin" ? "Gestor — Acesso Operacional" : "Criar conta"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground">E-mail</Label>
            <Input
              id="email" type="email" placeholder="operador@afonte.com"
              className="bg-card border-border focus:border-primary"
              value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-muted-foreground">Senha</Label>
            <div className="relative">
              <Input
                id="password" type={showPassword ? "text" : "password"} placeholder="••••••••"
                className="bg-card border-border focus:border-primary pr-10"
                value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
              <button
                type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button type="submit" disabled={submitting} className="w-full font-display font-semibold text-sm">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "signin" ? "Entrar" : "Criar conta"}
          </Button>

          <button
            type="button"
            onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); }}
            className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {mode === "signin" ? "Primeiro acesso? Criar conta" : "Já tenho conta — entrar"}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          A primeira conta criada vira admin automaticamente.
        </p>
      </div>
    </div>
  );
}

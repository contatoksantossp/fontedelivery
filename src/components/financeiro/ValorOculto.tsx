import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValorOcultoProps {
  valor: string;
  className?: string;
}

export function ValorOculto({ valor, className }: ValorOcultoProps) {
  const [visivel, setVisivel] = useState(false);

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="font-bold">{visivel ? valor : "R$ ****"}</span>
      <button
        type="button"
        onClick={() => setVisivel(!visivel)}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        {visivel ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </span>
  );
}

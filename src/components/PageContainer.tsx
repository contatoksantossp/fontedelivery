import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageContainerProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function PageContainer({ title, subtitle, children, className }: PageContainerProps) {
  return (
    <div className={cn("flex-1 p-6 space-y-6", className)}>
      {(title || subtitle) && (
        <div>
          {title && <h1 className="text-2xl font-bold font-display text-foreground">{title}</h1>}
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

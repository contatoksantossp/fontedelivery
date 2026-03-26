import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "online" | "offline";
  className?: string;
  onClick?: () => void;
}

export function StatusBadge({ status, className, onClick }: StatusBadgeProps) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold font-display",
        status === "online"
          ? "bg-success/20 text-success"
          : "bg-destructive/20 text-destructive",
        onClick && "cursor-pointer hover:opacity-80 transition-opacity",
        className
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          status === "online" ? "bg-success animate-pulse-orange" : "bg-destructive"
        )}
      />
      {status === "online" ? "Online" : "Offline"}
    </Comp>
  );
}

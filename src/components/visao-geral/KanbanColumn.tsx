import { CSSProperties, ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface KanbanColumnProps {
  id: string;
  title: string;
  count: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function KanbanColumn({ id, title, count, children, className, style }: KanbanColumnProps) {
  const { setNodeRef, isOver, active } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col rounded-lg border bg-card/50 transition-colors",
        isOver && active && "border-primary bg-primary/5",
        className
      )}
      style={style}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <h3 className="text-xs font-display font-semibold text-foreground uppercase tracking-wider">
          {title}
        </h3>
        <span className="text-[10px] font-bold bg-primary/15 text-primary px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      </div>
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-2">{children}</div>
      </ScrollArea>
    </div>
  );
}

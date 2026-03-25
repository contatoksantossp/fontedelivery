import { PageContainer } from "@/components/PageContainer";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <div className="rounded-2xl bg-primary/10 p-5">
          <Construction className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-xl font-bold font-display text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground max-w-xs">
          Este módulo está em desenvolvimento e será liberado em breve.
        </p>
      </div>
    </PageContainer>
  );
}

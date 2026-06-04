import type { PokemonHistoryItem } from "@atlanticcity/domain";
import { AppCard, Badge } from "@atlanticcity/ui";

import { formatVisitedAt } from "../utils/formatVisitedAt";

interface HistorySummaryProps {
  compact?: boolean;
  items: PokemonHistoryItem[];
}

export function HistorySummary({ compact = false, items }: HistorySummaryProps) {
  const totalVisits = items.reduce((total, item) => total + item.visitCount, 0);
  const mostVisited = [...items].sort((a, b) => b.visitCount - a.visitCount)[0];

  if (compact) {
    return null;
  }

  return (
    <div className="space-y-4">
      <AppCard className="p-5" tone="glass">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
          Resumen
        </p>
        <p className="mt-3 text-4xl font-bold">{String(items.length).padStart(2, "0")}</p>
        <p className="text-sm text-muted-foreground">Pokemon en bitacora</p>
        <div className="mt-5 space-y-3 text-sm">
          <SummaryRow label="Total visitas" value={String(totalVisits)} />
          <SummaryRow label="Ultima visita" value={formatVisitedAt(items[0]?.visitedAt)} />
          <SummaryRow label="Mas visitado" value={mostVisited?.name ?? "-"} />
        </div>
      </AppCard>

      {mostVisited ? (
        <AppCard className="p-5" tone="glass">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
            Frecuencia
          </p>
          <Badge className="mt-4 border-0 bg-cyan-500 text-white shadow-cyan-500/30">
            {mostVisited.name} · {mostVisited.visitCount}
          </Badge>
        </AppCard>
      ) : null}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-mono capitalize">{value ?? "-"}</span>
    </div>
  );
}

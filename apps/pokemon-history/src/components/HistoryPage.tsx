import { EmptyState } from "@atlanticcity/ui";
import { History as HistoryIcon } from "lucide-react";

import { HistoryList } from "./HistoryList";
import { HistorySummary } from "./HistorySummary";
import { useVisitedHistory } from "../hooks/useVisitedHistory";

export function HistoryPage() {
  const history = useVisitedHistory();

  return (
    <section className="min-h-full space-y-6 bg-background text-foreground">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-500">
            <HistoryIcon aria-hidden="true" size={16} />
            Bitacora
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Visitas recientes
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Registro persistente sincronizado con el Detail MFE.
          </p>
        </div>

        {history.length === 0 ? (
          <EmptyState
            description="Abre una ficha Pokemon desde el explorador para iniciar la bitacora."
            title="Sin visitas registradas"
          />
        ) : (
          <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            <HistoryList items={history} />
            <HistorySummary items={history} />
          </div>
        )}
    </section>
  );
}

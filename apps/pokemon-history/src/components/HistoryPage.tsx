import { clearHistory } from "@atlanticcity/application";
import { localStorageHistoryRepository } from "@atlanticcity/infrastructure";
import { AppButton, EmptyState } from "@atlanticcity/ui";
import { History as HistoryIcon, Trash2 } from "lucide-react";

import { useVisitedHistory } from "../hooks/useVisitedHistory";
import { HistoryList } from "./HistoryList";
import { HistorySummary } from "./HistorySummary";

interface HistoryPageProps {
  compact?: boolean;
}

export function HistoryPage({ compact = false }: HistoryPageProps) {
  const { history, refreshHistory } = useVisitedHistory();
  const canClear = history.length > 0;

  const handleClearHistory = () => {
    clearHistory(localStorageHistoryRepository);
    refreshHistory();
  };

  return (
    <section className="min-h-full space-y-6 bg-background text-foreground">
      {!compact ? (
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start ">
          <HistoryHeading />
          <ClearHistoryButton disabled={!canClear} onClick={handleClearHistory} />
        </div>
      ) : null}

      {compact ? (
        <div>
          <HistoryHeading compact />
        </div>
      ) : null}

      {history.length === 0 ? (
        <EmptyState
          description="Abre una ficha Pokemon desde el explorador para iniciar la bitacora persistente."
          icon={HistoryIcon}
          title="Sin visitas registradas"
        />
      ) : (
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <HistoryList compact={compact} items={history} />
          <HistorySummary compact={compact} items={history} />
        </div>
      )}
    </section>
  );
}

function HistoryHeading({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-500">
        <HistoryIcon aria-hidden="true" size={16} />
        Bitacora
      </p>
      <h1
        className={
          compact
            ? "text-3xl font-bold tracking-tight"
            : "text-5xl font-bold leading-none tracking-tight sm:text-6xl"
        }
      >
        Historial
      </h1>
      <p className="mt-3 text-sm text-muted-foreground sm:text-base">
        Pokemon vistos recientemente.
      </p>
    </div>
  );
}

function ClearHistoryButton({
  disabled,
  onClick
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <AppButton
      className="w-fit"
      disabled={disabled}
      onClick={onClick}
      type="button"
      variant="outline"
    >
      <Trash2 aria-hidden="true" size={16} />
      Limpiar historial
    </AppButton>
  );
}

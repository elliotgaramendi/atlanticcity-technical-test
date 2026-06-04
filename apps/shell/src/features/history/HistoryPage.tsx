import { clearHistory } from "@atlanticcity/application";
import { localStorageHistoryRepository } from "@atlanticcity/infrastructure";
import { AppButton, AppCard } from "@atlanticcity/ui";
import { Trash2, History as HistoryIcon } from "lucide-react";

import { RemoteSlot } from "../../components/RemoteSlot";
import { shellRemotes } from "../../remotes";

const historyRemote = shellRemotes.find((remote) => remote.id === "pokemon-history");

export function HistoryPage() {
  return (
    <section>
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-500">
            <HistoryIcon aria-hidden="true" size={16} />
            Bitacora
          </p>
          <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl">
            Historial
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Pokemon vistos recientemente.
          </p>
        </div>
        <AppButton
          className="w-fit"
          onClick={() => clearHistory(localStorageHistoryRepository)}
          type="button"
          variant="outline"
        >
          <Trash2 aria-hidden="true" size={16} />
          Limpiar historial
        </AppButton>
      </div>

      <AppCard className="p-4 sm:p-6" tone="glass">
        {historyRemote ? (
          <RemoteSlot remote={historyRemote} />
        ) : (
          <p className="text-sm text-muted-foreground">
            El remoto de historial no esta configurado.
          </p>
        )}
      </AppCard>
    </section>
  );
}

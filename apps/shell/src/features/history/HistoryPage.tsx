import { AppCard } from "@atlanticcity/ui";

import { RemoteSlot } from "../../components/RemoteSlot";
import { shellRemotes } from "../../remotes";

const historyRemote = shellRemotes.find((remote) => remote.id === "pokemon-history");

export function HistoryPage() {
  return (
    <section>
      <AppCard className="p-4 sm:p-6" tone="glass">
        {historyRemote ? (
          <RemoteSlot remote={historyRemote} remoteProps={{ compact: false }} />
        ) : (
          <p className="text-sm text-muted-foreground">
            El remoto de historial no esta configurado.
          </p>
        )}
      </AppCard>
    </section>
  );
}

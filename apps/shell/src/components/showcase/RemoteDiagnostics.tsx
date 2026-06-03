import { RemoteSlot } from "../RemoteSlot";
import { shellRemotes } from "../../remotes";

export function RemoteDiagnostics() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
      <div className="border-t border-border/70 pt-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          Microfrontends
        </p>
        <div className="grid gap-5 lg:grid-cols-2">
          {shellRemotes.map((remote) => (
            <RemoteSlot key={remote.id} remote={remote} />
          ))}
        </div>
      </div>
    </section>
  );
}

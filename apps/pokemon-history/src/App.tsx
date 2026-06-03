import { workspaceApps } from "@atlanticcity/config";
import { History, MonitorDot } from "lucide-react";

const app = workspaceApps.history;

export function App() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-50">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12">
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg border border-amber-300/30 bg-amber-400/10 text-amber-200">
          <History aria-hidden="true" size={28} />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-amber-200">
          Microfrontend standalone
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          {app.name}
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-stone-300">
          <span className="inline-flex items-center gap-2 rounded-md border border-stone-700 px-3 py-2">
            <MonitorDot aria-hidden="true" size={16} />
            localhost:{app.port}
          </span>
          <span className="rounded-md border border-stone-700 px-3 py-2">
            Historial persistente pendiente para Etapa 2+
          </span>
        </div>
      </section>
    </main>
  );
}

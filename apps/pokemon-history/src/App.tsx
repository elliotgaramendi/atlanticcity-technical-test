import { workspaceApps } from "@atlanticcity/config";
import { History, MonitorDot } from "lucide-react";

const app = workspaceApps.history;

export function App() {
  return (
    <main className="min-h-screen bg-blue-950 text-blue-50">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12">
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg border border-indigo-300/30 bg-indigo-400/10 text-indigo-200">
          <History aria-hidden="true" size={28} />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-200">
          Microfrontend standalone
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          {app.name}
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-blue-200">
          <span className="inline-flex items-center gap-2 rounded-md border border-blue-700 px-3 py-2">
            <MonitorDot aria-hidden="true" size={16} />
            localhost:{app.port}
          </span>
          <span className="rounded-md border border-blue-700 px-3 py-2">
            Historial persistente pendiente para Etapa 2+
          </span>
        </div>
      </section>
    </main>
  );
}

export default App;

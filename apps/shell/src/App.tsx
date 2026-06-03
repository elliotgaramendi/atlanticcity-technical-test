import { workspaceApps } from "@atlanticcity/config";
import { Boxes, MonitorDot } from "lucide-react";

const app = workspaceApps.shell;

export function App() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12">
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg border border-red-400/30 bg-red-500/10 text-red-200">
          <Boxes aria-hidden="true" size={28} />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-red-300">
          Atlantic City Technical Test
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          {app.name}
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
          <span className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-2">
            <MonitorDot aria-hidden="true" size={16} />
            localhost:{app.port}
          </span>
          <span className="rounded-md border border-zinc-700 px-3 py-2">
            Placeholder listo para Etapa 2
          </span>
        </div>
      </section>
    </main>
  );
}

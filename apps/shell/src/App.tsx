import { workspaceApps } from "@atlanticcity/config";
import { Boxes, MonitorDot } from "lucide-react";

import { RemoteSlot } from "./components/RemoteSlot";
import { shellRemotes } from "./remotes";

const app = workspaceApps.shell;

export function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto flex max-w-6xl flex-col px-6 py-12">
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg border border-blue-300/30 bg-blue-400/10 text-blue-200">
          <Boxes aria-hidden="true" size={28} />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-200">
          Atlantic City Technical Test
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          {app.name}
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2 rounded-md border border-blue-800 px-3 py-2">
            <MonitorDot aria-hidden="true" size={16} />
            localhost:{app.port}
          </span>
          <span className="rounded-md border border-blue-800 px-3 py-2">
            Host consumiendo remotos reales
          </span>
        </div>
        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          {shellRemotes.map((remote) => (
            <RemoteSlot key={remote.id} remote={remote} />
          ))}
        </section>
      </section>
    </main>
  );
}

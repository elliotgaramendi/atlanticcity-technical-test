import { workspaceApps } from "@atlanticcity/config";
import { BadgeInfo, MonitorDot } from "lucide-react";

const app = workspaceApps.detail;

export interface PokemonDetailRemoteProps {
  pokemonId?: number;
  pokemonName?: string;
}

export function App({ pokemonId, pokemonName }: PokemonDetailRemoteProps = {}) {
  const displayName = pokemonName ?? app.name;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12">
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg border border-sky-300/30 bg-sky-400/10 text-sky-200">
          <BadgeInfo aria-hidden="true" size={28} />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sky-200">
          Microfrontend standalone
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          {displayName}
        </h1>
        {pokemonId ? (
          <p className="mt-3 font-mono text-sm uppercase tracking-[0.24em] text-cyan-300">
            National ID #{String(pokemonId).padStart(3, "0")}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-3 py-2">
            <MonitorDot aria-hidden="true" size={16} />
            localhost:{app.port}
          </span>
          <span className="rounded-md border border-slate-700 px-3 py-2">
            Detalle Pokemon pendiente para Etapa 2+
          </span>
        </div>
      </section>
    </main>
  );
}

export default App;

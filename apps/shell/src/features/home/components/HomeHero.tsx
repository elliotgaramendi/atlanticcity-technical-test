import { AppCard } from "@atlanticcity/ui";
import { Sparkles } from "lucide-react";

export function HomeHero({ totalPokemon }: { totalPokemon: number }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-500">
          <Sparkles aria-hidden="true" size={16} />
          Sistema de exploracion
        </p>
        <h1 className="max-w-3xl text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl">
          Explorar Pokemon
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          Una base de datos visual de criaturas registradas en Atlantic City.
          Filtra por tipo, busca por nombre o numero, y abre una ficha completa.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <MetricCard label="Registros" value={String(totalPokemon).padStart(2, "0")} />
        <MetricCard label="Tipos" value="03" />
        <MetricCard label="Region" value="Kanto" />
      </div>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <AppCard className="min-w-24 rounded-2xl p-4">
      <p className="text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-mono text-lg">{value}</p>
    </AppCard>
  );
}

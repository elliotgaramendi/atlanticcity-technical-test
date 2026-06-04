import { AppCard } from "@atlanticcity/ui";
import { Activity } from "lucide-react";

interface PokemonAbilitiesCardProps {
  abilities: string[];
}

export function PokemonAbilitiesCard({ abilities }: PokemonAbilitiesCardProps) {
  return (
    <AppCard className="p-5 sm:p-6" tone="glass">
      <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">
        <Activity aria-hidden="true" className="text-cyan-500" size={20} />
        Habilidades
      </h2>
      <div className="space-y-3">
        {abilities.map((ability) => (
          <div
            className="rounded-2xl border border-sky-200/70 bg-white/50 px-4 py-3 capitalize dark:border-sky-400/15 dark:bg-slate-950/50"
            key={ability}
          >
            {ability}
          </div>
        ))}
      </div>
    </AppCard>
  );
}

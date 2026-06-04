import type { PokemonDetail } from "@atlanticcity/domain";
import { formatPokemonId } from "@atlanticcity/utils";
import { AppCard } from "@atlanticcity/ui";
import { Dumbbell, Ruler, Sparkles, Zap } from "lucide-react";

import { PokemonMetricCard } from "./PokemonMetricCard";
import { PokemonTypeBadges } from "./PokemonTypeBadges";

interface PokemonDetailHeroProps {
  pokemon: PokemonDetail;
}

export function PokemonDetailHero({ pokemon }: PokemonDetailHeroProps) {
  return (
    <AppCard className="overflow-hidden p-0" tone="elevated">
      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-3xl bg-sky-100 dark:bg-slate-950">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.28),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(129,140,248,0.24),transparent_28%)]"
          />
          <img
            alt={pokemon.name}
            className="relative z-10 h-64 w-64 object-contain drop-shadow-2xl"
            src={pokemon.imageUrl}
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-500">
            <Sparkles aria-hidden="true" size={16} />
            Ficha de investigacion
          </p>
          <p className="font-mono text-sm text-muted-foreground">
            National ID {formatPokemonId(pokemon.id)}
          </p>
          <h1 className="mt-2 text-4xl font-bold capitalize tracking-tight sm:text-6xl">
            {pokemon.name}
          </h1>
          <PokemonTypeBadges name={pokemon.name} types={pokemon.types} />

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <PokemonMetricCard
              icon={Ruler}
              label="Altura"
              value={`${pokemon.height / 10} m`}
            />
            <PokemonMetricCard
              icon={Dumbbell}
              label="Peso"
              value={`${pokemon.weight / 10} kg`}
            />
            <PokemonMetricCard
              icon={Zap}
              label="Exp."
              value={String(pokemon.baseExperience)}
            />
          </div>
        </div>
      </div>
    </AppCard>
  );
}

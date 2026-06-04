import type { PokemonDetail } from "@atlanticcity/domain";

import { PokemonAbilitiesCard } from "./detail/PokemonAbilitiesCard";
import { PokemonDetailHero } from "./detail/PokemonDetailHero";
import { PokemonStatsCard } from "./detail/PokemonStatsCard";

interface PokemonDetailPanelProps {
  pokemon: PokemonDetail;
}

export function PokemonDetailPanel({ pokemon }: PokemonDetailPanelProps) {
  return (
    <article className="grid gap-5">
      <PokemonDetailHero pokemon={pokemon} />
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <PokemonStatsCard stats={pokemon.stats} />
        <PokemonAbilitiesCard abilities={pokemon.abilities} />
      </div>
    </article>
  );
}

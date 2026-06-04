import type { Pokemon } from "@atlanticcity/domain";
import { useMemo, useState } from "react";

import { PokemonDetailRemoteDialog } from "../detail/PokemonDetailRemoteDialog";
import { SearchDialog } from "../search/SearchDialog";
import { HomeHero } from "./components/HomeHero";
import { HomeSearchControls } from "./components/HomeSearchControls";
import { PokemonCategorySection } from "./components/PokemonCategorySection";
import { usePokemonCategories } from "./hooks/usePokemonCategories";

export function HomePage() {
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const categories = usePokemonCategories();
  const allPokemon = useMemo(() => dedupePokemon(categories.flatMap((category) => category.items)), [
    categories
  ]);

  return (
    <>
      <HomeHero totalPokemon={allPokemon.length} />
      <HomeSearchControls
        onOpenAdvancedSearch={() => setIsSearchOpen(true)}
        onQueryChange={setQuery}
        query={query}
      />

      {categories.map((category) => (
        <PokemonCategorySection
          category={category}
          key={category.type}
          onPokemonSelect={setSelectedPokemon}
          query={query}
        />
      ))}

      <footer className="mt-14 border-t border-border py-8 text-center text-sm text-muted-foreground">
        Atlantic City Pokedex · datos cortesia de PokeAPI
      </footer>

      <SearchDialog
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        onPokemonSelect={setSelectedPokemon}
        pokemon={allPokemon}
      />
      <PokemonDetailRemoteDialog
        open={Boolean(selectedPokemon)}
        onOpenChange={(open) => {
          if (!open) setSelectedPokemon(null);
        }}
        pokemon={selectedPokemon}
      />
    </>
  );
}

function dedupePokemon(pokemon: Pokemon[]): Pokemon[] {
  const pokemonById = new Map<number, Pokemon>();

  for (const item of pokemon) {
    if (!pokemonById.has(item.id)) {
      pokemonById.set(item.id, item);
    }
  }

  return [...pokemonById.values()];
}

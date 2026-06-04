import type { Pokemon } from "@atlanticcity/domain";
import { PokemonCard } from "@atlanticcity/ui";

interface SearchResultCardProps {
  onSelect: (pokemon: Pokemon) => void;
  pokemon: Pokemon;
}

export function SearchResultCard({ onSelect, pokemon }: SearchResultCardProps) {
  return (
    <PokemonCard
      id={pokemon.id}
      imageUrl={pokemon.imageUrl}
      name={pokemon.name}
      onClick={() => onSelect(pokemon)}
      types={pokemon.types}
      variant="compact"
    />
  );
}

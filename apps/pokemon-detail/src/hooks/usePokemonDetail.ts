import { pokeApiRepository } from "@atlanticcity/infrastructure";
import { normalizePokemonName } from "@atlanticcity/utils";
import { useQuery } from "@tanstack/react-query";

export function usePokemonDetail(pokemonName: string) {
  const normalizedName = normalizePokemonName(pokemonName);

  return useQuery({
    enabled: normalizedName.length > 0,
    queryFn: () => pokeApiRepository.getPokemonDetail(normalizedName),
    queryKey: ["pokemon-detail", normalizedName]
  });
}

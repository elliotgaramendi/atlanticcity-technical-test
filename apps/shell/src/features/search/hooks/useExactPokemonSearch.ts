import { pokeApiRepository } from "@atlanticcity/infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useExactPokemonSearch(term: string, enabled: boolean) {
  const query = useQuery({
    enabled: enabled && term.length > 0,
    queryFn: () => pokeApiRepository.getPokemonDetail(term),
    queryKey: ["pokemon-exact-search", term],
    retry: false
  });

  return {
    ...query,
    isNotFound: getResponseStatus(query.error) === 404
  };
}

export function normalizeExactPokemonSearch(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

function getResponseStatus(error: unknown): number | undefined {
  return (error as { response?: { status?: number } } | null)?.response?.status;
}

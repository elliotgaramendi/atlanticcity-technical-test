import type { PokemonHistoryItem } from "@atlanticcity/domain";
import { ErrorState, LoadingState } from "@atlanticcity/ui";

import { PokemonDetailPanel } from "./PokemonDetailPanel";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import { useSavePokemonVisit } from "../hooks/useSavePokemonVisit";

interface PokemonDetailViewProps {
  onVisited?: (item: PokemonHistoryItem) => void;
  pokemonName: string;
}

export function PokemonDetailView({
  onVisited,
  pokemonName
}: PokemonDetailViewProps) {
  const detailQuery = usePokemonDetail(pokemonName);

  useSavePokemonVisit({
    enabled: detailQuery.isSuccess,
    onVisited,
    pokemon: detailQuery.data
  });

  if (detailQuery.isLoading) {
    return <LoadingState variant="detail" />;
  }

  if (detailQuery.isError || !detailQuery.data) {
    return (
      <ErrorState
        description="No pudimos cargar la ficha desde PokeAPI. Revisa el nombre e intenta otra vez."
        onRetry={() => void detailQuery.refetch()}
        title="Pokemon no encontrado"
      />
    );
  }

  return <PokemonDetailPanel pokemon={detailQuery.data} />;
}

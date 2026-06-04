import type { PokemonHistoryItem } from "@atlanticcity/domain";

import { DetailProviders } from "./components/DetailProviders";
import { PokemonDetailView } from "./components/PokemonDetailView";

export interface PokemonDetailRemoteProps {
  pokemonName: string;
  onVisited?: (item: PokemonHistoryItem) => void;
}

export function App({ pokemonName, onVisited }: PokemonDetailRemoteProps) {
  return (
    <DetailProviders>
      <PokemonDetailView pokemonName={pokemonName} onVisited={onVisited} />
    </DetailProviders>
  );
}

export default App;

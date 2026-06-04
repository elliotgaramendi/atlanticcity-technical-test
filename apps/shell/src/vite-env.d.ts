/// <reference types="vite/client" />

declare module "pokemonDetail/App" {
  import type { PokemonHistoryItem } from "@atlanticcity/domain";
  import type { ComponentType } from "react";

  export interface PokemonDetailRemoteProps {
    pokemonName: string;
    onVisited?: (item: PokemonHistoryItem) => void;
  }

  export const App: ComponentType<PokemonDetailRemoteProps>;
  export default App;
}

declare module "pokemonHistory/App" {
  import type { ComponentType } from "react";

  export const App: ComponentType;
  export default App;
}

/// <reference types="vite/client" />

declare module "pokemonDetail/App" {
  import type { ComponentType } from "react";

  export interface PokemonDetailRemoteProps {
    pokemonId?: number;
    pokemonName?: string;
  }

  export const App: ComponentType<PokemonDetailRemoteProps>;
  export default App;
}

declare module "pokemonHistory/App" {
  import type { ComponentType } from "react";

  export const App: ComponentType;
  export default App;
}

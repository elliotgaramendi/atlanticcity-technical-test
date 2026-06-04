import { HistoryPage } from "./components/HistoryPage";

export type PokemonHistoryRemoteProps = {
  compact?: boolean;
};

export function App({ compact = false }: PokemonHistoryRemoteProps) {
  return <HistoryPage compact={compact} />;
}

export default App;

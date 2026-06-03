import type { ThemeMode } from "@atlanticcity/domain";
import { ShellHeader } from "./layout/ShellHeader";
import { HeroSection } from "./showcase/HeroSection";
import { PokemonPreviewGrid } from "./showcase/PokemonPreviewGrid";
import { SearchControls } from "./showcase/SearchControls";

interface UiShowcaseProps {
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
}

export function UiShowcase({ mode, onModeChange }: UiShowcaseProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ShellHeader mode={mode} onModeChange={onModeChange} />
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <HeroSection />
        <SearchControls />
        <PokemonPreviewGrid />
      </main>
    </div>
  );
}

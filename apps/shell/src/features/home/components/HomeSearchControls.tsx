import { AppButton, AppInput } from "@atlanticcity/ui";
import { Search, SlidersHorizontal } from "lucide-react";

interface HomeSearchControlsProps {
  onOpenAdvancedSearch: () => void;
  onQueryChange: (query: string) => void;
  query: string;
}

export function HomeSearchControls({
  onOpenAdvancedSearch,
  onQueryChange,
  query
}: HomeSearchControlsProps) {
  return (
    <section className="mt-10 grid gap-3 lg:grid-cols-[1fr_auto]">
      <div className="relative">
        <Search
          aria-hidden="true"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <AppInput
          className="pl-11"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Buscar por nombre o ID"
          value={query}
        />
      </div>
      <AppButton className="h-12" onClick={onOpenAdvancedSearch}>
        <SlidersHorizontal aria-hidden="true" size={18} />
        Busqueda avanzada
      </AppButton>
    </section>
  );
}

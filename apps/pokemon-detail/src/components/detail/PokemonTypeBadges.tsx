import type { PokemonType } from "@atlanticcity/domain";
import { Badge, cn } from "@atlanticcity/ui";

interface PokemonTypeBadgesProps {
  name: string;
  types: PokemonType[];
}

export function PokemonTypeBadges({ name, types }: PokemonTypeBadgesProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {types.map((type) => (
        <Badge
          className={cn(
            "border-0 px-3 py-1 text-xs uppercase tracking-wide shadow-lg",
            getTypeStyle(type.name)
          )}
          key={`${name}-${type.name}`}
        >
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-white/80" />
          {type.name}
        </Badge>
      ))}
    </div>
  );
}

function getTypeStyle(type: string): string {
  const styles = {
    electric: "bg-amber-400 text-slate-950 shadow-amber-400/30",
    fire: "bg-orange-500 text-white shadow-orange-500/35",
    grass: "bg-emerald-500 text-white shadow-emerald-500/35",
    poison: "bg-purple-500 text-white shadow-purple-500/35",
    psychic: "bg-pink-500 text-white shadow-pink-500/35",
    water: "bg-sky-500 text-white shadow-sky-500/35"
  } satisfies Record<string, string>;

  return styles[type.toLowerCase() as keyof typeof styles] ?? "bg-slate-500 text-white";
}

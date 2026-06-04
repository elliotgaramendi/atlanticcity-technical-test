import type { PokemonType } from "@atlanticcity/domain";
import { cn } from "../../lib/utils";
import { Badge } from "../ui";
import { getPokemonTypeStyle } from "./pokemon-type-styles";

export interface PokemonCardProps {
  id: number;
  imageUrl: string;
  name: string;
  onClick?: () => void;
  types: PokemonType[];
  variant?: "compact" | "featured";
}

export function PokemonCard({
  id,
  imageUrl,
  name,
  onClick,
  types,
  variant = "featured"
}: PokemonCardProps) {
  const isCompact = variant === "compact";
  const Component = onClick ? "button" : "article";

  return (
    <Component
      className={cn(
        "group relative flex w-full overflow-hidden rounded-3xl border border-sky-200/70 bg-white text-left text-slate-950 shadow-xl shadow-sky-900/5 transition-all duration-300 dark:border-sky-400/15 dark:bg-slate-950 dark:text-sky-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-50 dark:focus-visible:ring-offset-slate-950",
        onClick &&
          "cursor-pointer hover:-translate-y-1 hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-500/10",
        isCompact ? "min-h-40 p-4" : "min-h-64 p-5"
      )}
      onClick={onClick}
      type={onClick ? "button" : undefined}
    >
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(56,189,248,0.34),transparent_34%),linear-gradient(135deg,rgba(14,165,233,0.08),rgba(15,23,42,0.02))]",
          "dark:bg-[radial-gradient(circle_at_80%_15%,rgba(14,165,233,0.34),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92),rgba(12,74,110,0.28))]"
        )}
        aria-hidden="true"
      />
      <div className="relative z-10 flex w-full flex-col">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-sky-100/45">
          <span>#{String(id).padStart(3, "0")}</span>
        </div>
        <div
          className={cn(
            "flex flex-1 items-center justify-center",
            isCompact ? "py-3" : "py-6"
          )}
        >
          <img
            alt={name}
            className={cn(
              "object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105",
              isCompact ? "h-24 w-24" : "h-36 w-36"
            )}
            loading="lazy"
            src={imageUrl}
          />
        </div>
        <h3 className="text-xl font-bold tracking-tight">{name}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {types.map((type) => (
            <Badge
              className={cn(
                "border-0 px-2 py-1 text-[0.65rem] uppercase tracking-wide shadow-lg",
                getPokemonTypeStyle(type.name)
              )}
              key={`${name}-${type.name}`}
            >
              <span className="mr-1 h-1.5 w-1.5 rounded-full bg-white/80" />
              {type.name}
            </Badge>
          ))}
        </div>
      </div>
    </Component>
  );
}

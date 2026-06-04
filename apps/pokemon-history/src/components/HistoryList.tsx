import type { PokemonHistoryItem } from "@atlanticcity/domain";
import { formatPokemonId } from "@atlanticcity/utils";
import { AppCard, Badge } from "@atlanticcity/ui";
import { Clock, Repeat } from "lucide-react";

import { formatVisitedAt } from "../utils/formatVisitedAt";

export function HistoryList({ items }: { items: PokemonHistoryItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <AppCard
          className="flex items-center gap-4 rounded-3xl p-4"
          key={`${item.id}-${item.visitedAt}`}
          tone="glass"
        >
          <img
            alt={item.name}
            className="h-16 w-16 rounded-2xl bg-sky-100 object-contain p-2 dark:bg-sky-400/10"
            src={item.imageUrl}
          />
          <div className="min-w-0 flex-1">
            <p className="font-mono text-xs text-muted-foreground">
              {formatPokemonId(item.id)}
            </p>
            <h3 className="truncate text-xl font-bold capitalize">{item.name}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge className="border-0 bg-sky-500 text-white shadow-sky-500/30">
                <Repeat aria-hidden="true" className="mr-1" size={12} />
                {item.visitCount} visita{item.visitCount === 1 ? "" : "s"}
              </Badge>
              <Badge
                className="border-sky-200 bg-white/60 text-slate-700 dark:border-sky-400/20 dark:bg-slate-950/60 dark:text-sky-100"
                variant="outline"
              >
                <Clock aria-hidden="true" className="mr-1" size={12} />
                {formatVisitedAt(item.visitedAt)}
              </Badge>
            </div>
          </div>
        </AppCard>
      ))}
    </div>
  );
}

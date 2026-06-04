import type { PokemonStat } from "@atlanticcity/domain";
import { AppCard } from "@atlanticcity/ui";

interface PokemonStatsCardProps {
  stats: PokemonStat[];
}

export function PokemonStatsCard({ stats }: PokemonStatsCardProps) {
  const totalStats = stats.reduce((total, stat) => total + stat.baseStat, 0);

  return (
    <AppCard className="p-5 sm:p-6" tone="glass">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold">Stats basicos</h2>
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          BST · {totalStats}
        </span>
      </div>
      <div className="space-y-4">
        {stats.map((stat) => (
          <StatRow key={stat.name} label={stat.name} value={stat.baseStat} />
        ))}
      </div>
    </AppCard>
  );
}

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </span>
        <span className="font-mono text-sm">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-sky-100 dark:bg-slate-900">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500"
          style={{ width: `${Math.min(100, (value / 160) * 100)}%` }}
        />
      </div>
    </div>
  );
}

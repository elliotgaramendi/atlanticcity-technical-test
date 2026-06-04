import type { LucideIcon } from "lucide-react";

interface PokemonMetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function PokemonMetricCard({
  icon: Icon,
  label,
  value
}: PokemonMetricCardProps) {
  return (
    <div className="min-h-24 rounded-2xl border border-sky-200/70 bg-white/55 p-4 dark:border-sky-400/15 dark:bg-slate-950/45">
      <p className="flex items-center gap-2 text-[0.68rem] leading-none tracking-wider text-muted-foreground">
        <Icon aria-hidden="true" className="shrink-0" size={14} />
        <span>{label}</span>
      </p>
      <p className="mt-4 font-mono text-xl leading-none">{value}</p>
    </div>
  );
}

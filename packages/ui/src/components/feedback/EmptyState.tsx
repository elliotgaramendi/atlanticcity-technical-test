import type { LucideIcon } from "lucide-react";
import { SearchX } from "lucide-react";
import type { ReactNode } from "react";
import { AppCard } from "../app";
import { cn } from "../../lib/utils";

export interface EmptyStateProps {
  action?: ReactNode;
  className?: string;
  description: string;
  icon?: LucideIcon;
  title: string;
}

export function EmptyState({
  action,
  className,
  description,
  icon: Icon = SearchX,
  title
}: EmptyStateProps) {
  return (
    <AppCard
      className={cn(
        "flex min-h-64 flex-col items-center justify-center p-8 text-center",
        className
      )}
      tone="glass"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 dark:bg-sky-400/10 dark:text-cyan-300">
        <Icon aria-hidden="true" size={28} />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-sky-100/65">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </AppCard>
  );
}

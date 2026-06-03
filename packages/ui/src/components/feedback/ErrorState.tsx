import type { LucideIcon } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";
import { AppButton, AppCard } from "../app";
import { cn } from "../../lib/utils";

export interface ErrorStateProps {
  action?: ReactNode;
  className?: string;
  description: string;
  icon?: LucideIcon;
  onRetry?: () => void;
  title: string;
}

export function ErrorState({
  action,
  className,
  description,
  icon: Icon = AlertTriangle,
  onRetry,
  title
}: ErrorStateProps) {
  return (
    <AppCard
      className={cn(
        "flex min-h-64 flex-col items-center justify-center border-rose-300/50 p-8 text-center dark:border-rose-400/20",
        className
      )}
      tone="glass"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-400/10 dark:text-rose-200">
        <Icon aria-hidden="true" size={28} />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-sky-100/65">
        {description}
      </p>
      {action ?? (
        onRetry ? (
          <AppButton className="mt-6" onClick={onRetry}>
            Reintentar
          </AppButton>
        ) : null
      )}
    </AppCard>
  );
}

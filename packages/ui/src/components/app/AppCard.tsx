import type { HTMLAttributes, ReactNode } from "react";
import { Card } from "../ui";
import { cn } from "../../lib/utils";

export interface AppCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tone?: "default" | "elevated" | "glass";
}

export function AppCard({
  children,
  className,
  tone = "default",
  ...props
}: AppCardProps) {
  return (
    <Card
      className={cn(
        "rounded-3xl border-sky-200/70 bg-white/85 text-slate-950 shadow-xl shadow-sky-900/5 dark:border-sky-400/15 dark:bg-slate-950/80 dark:text-sky-50 dark:shadow-sky-950/20",
        tone === "elevated" &&
          "bg-gradient-to-br from-white via-sky-50 to-blue-100/60 shadow-2xl shadow-sky-900/10 dark:from-slate-950 dark:via-slate-950 dark:to-sky-950/70",
        tone === "glass" &&
          "bg-white/65 backdrop-blur-xl dark:bg-slate-950/60",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

import { Skeleton } from "../ui";
import { cn } from "../../lib/utils";

export interface LoadingStateProps {
  className?: string;
  items?: number;
  variant?: "cards" | "detail" | "list";
}

export function LoadingState({
  className,
  items = 3,
  variant = "cards"
}: LoadingStateProps) {
  if (variant === "detail") {
    return (
      <div className={cn("grid gap-5 lg:grid-cols-[1.2fr_0.8fr]", className)}>
        <Skeleton className="min-h-80 rounded-3xl bg-sky-200/50 dark:bg-sky-400/10" />
        <div className="space-y-4">
          <Skeleton className="h-12 rounded-2xl bg-sky-200/50 dark:bg-sky-400/10" />
          <Skeleton className="h-36 rounded-3xl bg-sky-200/50 dark:bg-sky-400/10" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        variant === "list" ? "space-y-4" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {Array.from({ length: items }).map((_, index) => (
        <Skeleton
          className={cn(
            "rounded-3xl bg-sky-200/50 dark:bg-sky-400/10",
            variant === "list" ? "h-24" : "min-h-64"
          )}
          key={index}
        />
      ))}
    </div>
  );
}

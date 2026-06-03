import { Button, type ButtonProps } from "../ui";
import { cn } from "../../lib/utils";

export type AppButtonProps = ButtonProps;

export function AppButton({ className, variant, ...props }: AppButtonProps) {
  const isDefault = !variant || variant === "default";

  return (
    <Button
      className={cn(
        "rounded-full font-semibold shadow-sm transition-all duration-300 ease-out focus-visible:ring-sky-400 active:scale-[0.98]",
        isDefault &&
          "bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500 text-white shadow-sky-500/20 hover:-translate-y-px hover:from-sky-400 hover:to-indigo-400 hover:shadow-lg hover:shadow-sky-500/25",
        variant === "outline" &&
          "border-sky-300/40 bg-white/70 text-slate-900 hover:-translate-y-px hover:bg-sky-50 hover:shadow-md hover:shadow-sky-500/10 dark:border-sky-400/20 dark:bg-slate-950/40 dark:text-sky-50 dark:hover:bg-sky-950/70",
        variant === "ghost" &&
          "text-slate-600 hover:bg-sky-100 hover:text-sky-950 dark:text-sky-200 dark:hover:bg-sky-950/70",
        className
      )}
      variant={variant}
      {...props}
    />
  );
}

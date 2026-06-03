import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Input } from "../ui";
import { cn } from "../../lib/utils";

export type AppInputProps = ComponentPropsWithoutRef<typeof Input>;

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      className={cn(
        "h-12 rounded-2xl border-sky-200 bg-white/80 px-4 text-slate-950 shadow-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-sky-400/20 dark:bg-slate-950/60 dark:text-sky-50 dark:placeholder:text-sky-200/40",
        className
      )}
      {...props}
    />
  );
  }
);

AppInput.displayName = "AppInput";

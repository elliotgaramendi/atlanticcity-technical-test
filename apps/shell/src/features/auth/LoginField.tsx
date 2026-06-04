import { AppInput } from "@atlanticcity/ui";
import type { ReactNode } from "react";

interface LoginFieldProps {
  error?: string;
  icon: ReactNode;
  id: string;
  inputProps: React.ComponentProps<typeof AppInput>;
  label: string;
}

export function LoginField({
  error,
  icon,
  id,
  inputProps,
  label
}: LoginFieldProps) {
  return (
    <div className="block">
      <label
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground"
        htmlFor={id}
      >
        {label}
      </label>
      <span className="relative block">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <AppInput className="pl-11" id={id} {...inputProps} />
      </span>
      {error ? (
        <span className="mt-2 block text-sm text-rose-500">{error}</span>
      ) : null}
    </div>
  );
}

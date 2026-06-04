import { AppInput } from "@atlanticcity/ui";
import type { ReactNode } from "react";

interface LoginFieldProps {
  error?: string;
  icon: ReactNode;
  id: string;
  inputProps: React.ComponentProps<typeof AppInput>;
  label: string;
  rightAdornment?: ReactNode;
}

export function LoginField({
  error,
  icon,
  id,
  inputProps,
  label,
  rightAdornment
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
        <AppInput
          className={rightAdornment ? "pl-11 pr-12" : "pl-11"}
          id={id}
          {...inputProps}
        />
        {rightAdornment ? (
          <span className="absolute right-2 top-1/2 -translate-y-1/2">
            {rightAdornment}
          </span>
        ) : null}
      </span>
      {error ? (
        <span className="mt-2 block text-sm text-rose-500">{error}</span>
      ) : null}
    </div>
  );
}

import { AppButton, AppCard } from "@atlanticcity/ui";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { LoginField } from "./LoginField";
import type { LoginFormValues } from "./login-schema";

interface LoginCardProps {
  errors: FieldErrors<LoginFormValues>;
  isSubmitting: boolean;
  onSubmit: () => void;
  register: UseFormRegister<LoginFormValues>;
}

export function LoginCard({
  errors,
  isSubmitting,
  onSubmit,
  register
}: LoginCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AppCard
      className="mx-auto w-full max-w-md p-8 shadow-2xl shadow-sky-500/10"
      tone="elevated"
    >
      <LoginCardStatus />

      <h2 className="text-2xl font-bold">Bienvenido, explorador</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Ingresa tus credenciales para continuar.
      </p>

      <form className="mt-8 space-y-5" onSubmit={onSubmit}>
        <LoginField
          error={errors.username?.message}
          icon={<User aria-hidden="true" size={17} />}
          id="login-username"
          inputProps={{
            autoComplete: "username",
            ...register("username")
          }}
          label="Usuario"
        />
        <LoginField
          error={errors.password?.message}
          icon={<Lock aria-hidden="true" size={17} />}
          id="login-password"
          inputProps={{
            autoComplete: "current-password",
            type: showPassword ? "text" : "password",
            ...register("password")
          }}
          label="Contrasena"
          rightAdornment={
            <AppButton
              aria-label={
                showPassword ? "Ocultar contrasena" : "Mostrar contrasena"
              }
              className="h-9 w-9 p-0"
              onClick={() => setShowPassword((current) => !current)}
              size="icon"
              type="button"
              variant="ghost"
            >
              {showPassword ? (
                <EyeOff aria-hidden="true" size={16} />
              ) : (
                <Eye aria-hidden="true" size={16} />
              )}
            </AppButton>
          }
        />

        <AppButton className="h-12 w-full" disabled={isSubmitting} type="submit">
          Ingresar
        </AppButton>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Acceso de demostracion · cualquier cambio invalido sera rechazado
      </p>
    </AppCard>
  );
}

function LoginCardStatus() {
  return (
    <div className="mb-8 flex items-center justify-between gap-3">
      <span className="rounded-full border border-sky-200 px-3 py-1 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground dark:border-sky-400/20">
        AC · ID-0451
      </span>
      <span className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.28em] text-cyan-500">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        Online
      </span>
    </div>
  );
}

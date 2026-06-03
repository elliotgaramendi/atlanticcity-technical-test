import { zodResolver } from "@hookform/resolvers/zod";
import { AppButton, AppCard, AppInput, ThemeToggle, showAppToast } from "@atlanticcity/ui";
import { KeyRound, Lock, ShieldCheck, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";

import { demoCredentials } from "./auth-credentials";
import { useSessionStore, useThemeStore } from "../../stores";

const loginSchema = z.object({
  password: z.string().min(1, "La contrasena es requerida"),
  username: z.string().min(1, "El usuario es requerido")
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useSessionStore();
  const { mode, setMode } = useThemeStore();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError
  } = useForm<LoginFormValues>({
    defaultValues: demoCredentials,
    resolver: zodResolver(loginSchema)
  });

  if (isAuthenticated()) {
    return <Navigate replace to="/" />;
  }

  function handleLogin(values: LoginFormValues) {
    const didLogin = login(values);

    if (!didLogin) {
      setError("password", {
        message: "Credenciales demo invalidas",
        type: "validate"
      });
      showAppToast.error(
        "Acceso denegado",
        "Usa las credenciales demo de Atlantic City."
      );
      return;
    }

    showAppToast.success("Sesion iniciada", "Bienvenido al Pokedex Lab.");
    navigate("/", { replace: true });
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_20%_72%,rgba(59,130,246,0.12),transparent_30%)] dark:bg-[radial-gradient(circle_at_72%_48%,rgba(14,165,233,0.22),transparent_30%),radial-gradient(circle_at_16%_72%,rgba(37,99,235,0.14),transparent_30%)]"
      />
      <div className="absolute right-5 top-5 z-10">
        <ThemeToggle mode={mode} onModeChange={setMode} />
      </div>

      <section className="relative z-10 mx-auto grid min-h-dvh w-full max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.86fr]">
        <div className="max-w-2xl">
          <BrandMark />
          <h1 className="mt-10 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Acceso al sistema de{" "}
            <span className="bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
              exploracion Pokemon
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Inicia sesion con tus credenciales de explorador para acceder a la
            base de datos visual de criaturas, estadisticas y reportes de campo.
          </p>

          <div className="mt-10 grid gap-3">
            <LoginBenefit
              icon={<ShieldCheck aria-hidden="true" size={18} />}
              text="Cada sesion queda registrada en tu historial."
              title="Credencial verificada"
            />
            <LoginBenefit
              icon={<KeyRound aria-hidden="true" size={18} />}
              text="Comunicacion segura con la base de datos PokeAPI."
              title="Acceso cifrado"
            />
          </div>
        </div>

        <AppCard
          className="mx-auto w-full max-w-md p-8 shadow-2xl shadow-sky-500/10"
          tone="elevated"
        >
          <div className="mb-8 flex items-center justify-between gap-3">
            <span className="rounded-full border border-sky-200 px-3 py-1 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground dark:border-sky-400/20">
              AC · ID-0451
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.28em] text-cyan-500">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Online
            </span>
          </div>

          <h2 className="text-2xl font-bold">Bienvenido, explorador</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ingresa tus credenciales para continuar.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit(handleLogin)}>
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
                type: "password",
                ...register("password")
              }}
              label="Contrasena"
            />

            <AppButton className="h-12 w-full" disabled={isSubmitting} type="submit">
              Ingresar
            </AppButton>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Acceso de demostracion · cualquier cambio invalido sera rechazado
          </p>
        </AppCard>
      </section>
    </main>
  );
}

function BrandMark() {
  return (
    <div className="flex items-center gap-4">
      <img
        alt="Pokemon"
        className="h-12 w-12 rounded-full object-contain drop-shadow-lg"
        src="/pokemon-icon.svg"
      />
      <div>
        <p className="font-bold leading-none">Atlantic City</p>
        <p className="mt-1 text-xs uppercase tracking-[0.34em] text-muted-foreground">
          Pokedex Lab
        </p>
      </div>
    </div>
  );
}

function LoginBenefit({
  icon,
  text,
  title
}: {
  icon: React.ReactNode;
  text: string;
  title: string;
}) {
  return (
    <AppCard className="flex items-center gap-4 rounded-2xl p-4" tone="glass">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-cyan-300">
        {icon}
      </span>
      <span>
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-muted-foreground">{text}</span>
      </span>
    </AppCard>
  );
}

function LoginField({
  error,
  id,
  icon,
  inputProps,
  label
}: {
  error?: string;
  id: string;
  icon: React.ReactNode;
  inputProps: React.ComponentProps<typeof AppInput>;
  label: string;
}) {
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

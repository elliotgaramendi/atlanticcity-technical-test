import { ThemeToggle, showAppToast } from "@atlanticcity/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import { useSessionStore, useThemeStore } from "../../stores";
import { demoCredentials } from "./auth-credentials";
import { loginSchema, type LoginFormValues } from "./login-schema";
import { LoginCard } from "./LoginCard";
import { LoginHero } from "./LoginHero";

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
    mode: "onChange",
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
        <LoginHero />
        <LoginCard
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit(handleLogin)}
          register={register}
        />
      </section>
    </main>
  );
}

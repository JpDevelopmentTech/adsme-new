import { LOGIN_COPY } from "@/constants/auth-copy.constants";
import { GoogleSignInForm } from "@/presentation/components/auth/google-sign-in-form";
import { LoginForm } from "@/presentation/components/auth/login-form";
import { FormDivider } from "@/presentation/components/ui/form-divider";
import type { LoginFormProps } from "@/types/login.types";

/** Tarjeta de vidrio flotante del login: encabezado, formulario y accesos alternativos. */
export function LoginPanel({ initialError }: LoginFormProps) {
  return (
    <main className="glass-float flex w-full max-w-[480px] shrink-0 flex-col gap-[22px] rounded-[34px] px-6 py-9 sm:px-10 sm:py-11">
      <header className="flex flex-col gap-2">
        <h2 className="text-[32px] leading-[1.15] font-extralight tracking-[-0.019em] text-text-primary">
          {LOGIN_COPY.title}
        </h2>
        <p className="text-sm leading-[1.5] text-text-secondary">{LOGIN_COPY.subtitle}</p>
      </header>

      <LoginForm initialError={initialError} />

      <FormDivider label={LOGIN_COPY.dividerLabel} />

      <GoogleSignInForm />

      <p className="text-center text-xs font-normal text-text-muted">{LOGIN_COPY.footnote}</p>
    </main>
  );
}

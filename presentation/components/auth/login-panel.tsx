import { LOGIN_COPY } from "@/constants/auth-copy.constants";
import { GoogleSignInForm } from "@/presentation/components/auth/google-sign-in-form";
import { LoginForm } from "@/presentation/components/auth/login-form";
import { FormDivider } from "@/presentation/components/ui/form-divider";
import type { LoginFormProps } from "@/types/login.types";

/** Columna derecha del login: encabezado, formulario y accesos alternativos. */
export function LoginPanel({ initialError }: LoginFormProps) {
  return (
    <main className="flex flex-1 items-center justify-center p-6 sm:p-10">
      <div className="flex w-full max-w-[400px] flex-col gap-[22px]">
        <header className="flex flex-col gap-2">
          <h2 className="font-display text-[30px] font-bold text-text-primary">
            {LOGIN_COPY.title}
          </h2>
          <p className="text-[15px] leading-[1.4] text-text-secondary">
            {LOGIN_COPY.subtitle}
          </p>
        </header>

        <LoginForm initialError={initialError} />

        <FormDivider label={LOGIN_COPY.dividerLabel} />

        <GoogleSignInForm />

        <p className="text-center text-[13px] text-text-muted">
          {LOGIN_COPY.footnote}
        </p>
      </div>
    </main>
  );
}

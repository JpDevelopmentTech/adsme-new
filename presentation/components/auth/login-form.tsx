"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { LOGIN_COPY } from "@/constants/auth-copy.constants";
import { FORGOT_PASSWORD_ROUTE } from "@/constants/routes.constants";
import { signInWithPasswordAction } from "@/presentation/actions/sign-in-with-password-action";
import { CheckboxField } from "@/presentation/components/ui/checkbox-field";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import { PasswordField } from "@/presentation/components/ui/password-field";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { TextField } from "@/presentation/components/ui/text-field";
import type { LoginFormProps } from "@/types/login.types";

export function LoginForm({ initialError }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(
    signInWithPasswordAction,
    { message: initialError ?? null, fieldErrors: {} },
  );
  // React resetea el formulario al terminar la acción; el correo se controla para
  // conservarlo tras un intento fallido y que solo se limpie la contraseña.
  const [email, setEmail] = useState("");

  return (
    <form action={formAction} className="flex w-full flex-col gap-[22px]">
      {state.message ? <FormAlert message={state.message} /> : null}

      <TextField
        id="email"
        name="email"
        type="email"
        label={LOGIN_COPY.emailLabel}
        placeholder={LOGIN_COPY.emailPlaceholder}
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={state.fieldErrors.email}
      />

      <PasswordField
        id="password"
        name="password"
        label={LOGIN_COPY.passwordLabel}
        placeholder={LOGIN_COPY.passwordPlaceholder}
        autoComplete="current-password"
        required
        error={state.fieldErrors.password}
      />

      <div className="flex items-center justify-between">
        <CheckboxField
          id="rememberMe"
          name="rememberMe"
          label={LOGIN_COPY.rememberLabel}
          defaultChecked
        />
        <Link
          href={FORGOT_PASSWORD_ROUTE}
          className="text-[13px] font-semibold text-brand-violet transition-opacity hover:opacity-80"
        >
          {LOGIN_COPY.forgotPassword}
        </Link>
      </div>

      <PrimaryButton
        type="submit"
        isLoading={isPending}
        className="w-full py-[15px] text-[15px]"
      >
        {LOGIN_COPY.submit}
      </PrimaryButton>
    </form>
  );
}

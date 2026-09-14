"use server";

import { redirect } from "next/navigation";
import { AUTH_ERROR_MESSAGES } from "@/constants/auth-messages.constants";
import { POST_LOGIN_ROUTE } from "@/constants/routes.constants";
import { createSignInWithPassword } from "@/domain/use-cases/sign-in-with-password";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { persistRememberPreference } from "@/infrastructure/session/remember-preference-store";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import type { SignInFormState } from "@/types/auth.types";
import { signInSchema } from "@/validators/auth.validators";

/**
 * Server Action del formulario de acceso: valida la entrada, delega en el caso de uso
 * y redirige al panel. Devuelve errores por campo o generales para renderizarlos en la UI.
 */
export async function signInWithPasswordAction(
  _prevState: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    rememberMe: formData.get("rememberMe") === "on",
  });

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      message: null,
      fieldErrors: {
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      },
    };
  }

  await persistRememberPreference(parsed.data.rememberMe);

  const repository = createSupabaseAuthRepository(
    await createServerSupabaseClient(),
  );
  const result = await createSignInWithPassword(repository)(parsed.data);

  if (!result.success) {
    return {
      message: AUTH_ERROR_MESSAGES[result.error.code],
      fieldErrors: {},
    };
  }

  redirect(POST_LOGIN_ROUTE);
}

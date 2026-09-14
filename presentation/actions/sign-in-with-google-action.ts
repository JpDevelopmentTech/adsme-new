"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_ERROR_MESSAGES } from "@/constants/auth-messages.constants";
import { AUTH_CALLBACK_ROUTE, LOGIN_ROUTE } from "@/constants/routes.constants";
import { createStartGoogleSignIn } from "@/domain/use-cases/start-google-sign-in";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { persistRememberPreference } from "@/infrastructure/session/remember-preference-store";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";

/**
 * Server Action que arranca el flujo OAuth de Google Workspace.
 * Si el proveedor no está habilitado, vuelve a /login con el error en la query string.
 */
export async function signInWithGoogleAction(): Promise<void> {
  await persistRememberPreference(true);

  const repository = createSupabaseAuthRepository(
    await createServerSupabaseClient(),
  );
  const callbackUrl = new URL(
    AUTH_CALLBACK_ROUTE,
    await resolveOrigin(),
  ).toString();
  const result = await createStartGoogleSignIn(repository)(callbackUrl);

  if (!result.success) {
    redirect(
      `${LOGIN_ROUTE}?error=${encodeURIComponent(AUTH_ERROR_MESSAGES[result.error.code])}`,
    );
  }

  redirect(result.value);
}

/** Deriva el origen público de la request para construir la URL de callback. */
async function resolveOrigin(): Promise<string> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "http";

  return `${protocol}://${host}`;
}

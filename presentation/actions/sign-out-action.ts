"use server";

import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "@/constants/routes.constants";
import { createSignOut } from "@/domain/use-cases/sign-out";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";

/** Server Action que cierra la sesión y devuelve al usuario al login. */
export async function signOutAction(): Promise<void> {
  const repository = createSupabaseAuthRepository(
    await createServerSupabaseClient(),
  );
  await createSignOut(repository)();

  redirect(LOGIN_ROUTE);
}

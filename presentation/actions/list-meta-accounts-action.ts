"use server";

import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { fetchAdAccounts } from "@/infrastructure/meta/meta-api";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import type { MetaAccountsResult } from "@/types/meta-ads.types";

/**
 * Cuentas publicitarias que cubre el acceso ya concedido, consultadas bajo
 * demanda en vez de en cada carga de la pantalla. Devuelve la lista vacía si la
 * consulta falla: el selector ya explica qué revisar cuando no llega ninguna.
 */
export async function listMetaAccountsAction(): Promise<MetaAccountsResult> {
  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(
    createSupabaseAuthRepository(supabase),
  )();

  if (!user) redirect(LOGIN_ROUTE);

  const connection =
    await createSupabaseConnectionRepository(supabase).findByPlatform("meta");

  if (!connection) return { accounts: [], currentId: null };

  try {
    return {
      accounts: await fetchAdAccounts(connection.accessToken),
      currentId: connection.externalAccountId,
    };
  } catch {
    return { accounts: [], currentId: connection.externalAccountId };
  }
}

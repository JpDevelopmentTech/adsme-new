"use server";

import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { resolveTiktokAccess } from "@/infrastructure/tiktok/tiktok-access";
import { fetchAdvertisers } from "@/infrastructure/tiktok/tiktok-oauth";
import type { TiktokAccountsResult } from "@/types/tiktok-ads.types";

/**
 * Cuentas de anunciante que cubre el acceso ya concedido, consultadas bajo
 * demanda en vez de en cada carga de la pantalla. Devuelve la lista vacía si la
 * consulta falla: el selector ya explica qué revisar cuando no llega ninguna.
 */
export async function listTiktokAccountsAction(): Promise<TiktokAccountsResult> {
  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(
    createSupabaseAuthRepository(supabase),
  )();

  if (!user) redirect(LOGIN_ROUTE);

  const connections = createSupabaseConnectionRepository(supabase);
  const connection = await connections.findByPlatform("tiktok");

  if (!connection) return { accounts: [], currentId: null };

  const access = await resolveTiktokAccess(connection, connections);

  if (access.status !== "ok") {
    return { accounts: [], currentId: connection.externalAccountId };
  }

  try {
    return {
      accounts: await fetchAdvertisers(access.accessToken),
      currentId: connection.externalAccountId,
    };
  } catch {
    return { accounts: [], currentId: connection.externalAccountId };
  }
}

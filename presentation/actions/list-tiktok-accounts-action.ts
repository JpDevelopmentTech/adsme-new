"use server";

import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { resolveTiktokAccess } from "@/infrastructure/tiktok/tiktok-access";
import { fetchAdvertisers } from "@/infrastructure/tiktok/tiktok-oauth";
import type { AccountPickerData } from "@/types/account-picker.types";
import { toTiktokAccountOption } from "@/utils/to-tiktok-account-option";

/**
 * Cuentas de anunciante que cubre el acceso ya concedido, con las que hoy
 * alimentan adsme marcadas. Se consultan bajo demanda en vez de en cada carga
 * de la pantalla.
 *
 * Devuelve la lista vacía si la consulta falla: el selector ya explica qué
 * revisar cuando no llega ninguna cuenta.
 */
export async function listTiktokAccountsAction(): Promise<AccountPickerData> {
  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(
    createSupabaseAuthRepository(supabase),
  )();

  if (!user) redirect(LOGIN_ROUTE);

  const connections = createSupabaseConnectionRepository(supabase);
  const connected = await connections.listByPlatform("tiktok");
  const selectedIds = connected.map((connection) => connection.externalAccountId);
  // Cualquiera de las conexiones sirve: todas guardan el mismo acceso.
  const [connection] = connected;

  if (!connection) return { options: [], selectedIds: [] };

  const access = await resolveTiktokAccess(connection, connections);

  if (access.status !== "ok") return { options: [], selectedIds };

  try {
    const advertisers = await fetchAdvertisers(access.accessToken);

    return { options: advertisers.map(toTiktokAccountOption), selectedIds };
  } catch {
    return { options: [], selectedIds };
  }
}

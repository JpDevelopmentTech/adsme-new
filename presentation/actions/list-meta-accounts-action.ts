"use server";

import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { fetchAdAccounts } from "@/infrastructure/meta/meta-api";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import type { AccountPickerData } from "@/types/account-picker.types";
import { toMetaAccountOption } from "@/utils/to-meta-account-option";

/**
 * Cuentas publicitarias que cubre el acceso ya concedido, con las que hoy
 * alimentan adsme marcadas. Se consultan bajo demanda en vez de en cada carga
 * de la pantalla, para no gastar una llamada a la Graph API por visita.
 *
 * Devuelve la lista vacía si la consulta falla: el selector ya explica qué
 * revisar cuando no llega ninguna cuenta.
 */
export async function listMetaAccountsAction(): Promise<AccountPickerData> {
  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(
    createSupabaseAuthRepository(supabase),
  )();

  if (!user) redirect(LOGIN_ROUTE);

  const connected =
    await createSupabaseConnectionRepository(supabase).listByPlatform("meta");
  const selectedIds = connected.map((connection) => connection.externalAccountId);
  // Cualquiera de las conexiones sirve: todas guardan el mismo acceso.
  const [access] = connected;

  if (!access) return { options: [], selectedIds: [] };

  try {
    const accounts = await fetchAdAccounts(access.accessToken);

    return { options: accounts.map(toMetaAccountOption), selectedIds };
  } catch {
    return { options: [], selectedIds };
  }
}

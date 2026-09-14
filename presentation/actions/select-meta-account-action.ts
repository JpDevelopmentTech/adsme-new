"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { META_ERRORS } from "@/constants/meta-ads.constants";
import {
  CAMPAIGNS_ROUTE,
  CONNECTIONS_ROUTE,
  LOGIN_ROUTE,
} from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { fetchAdAccounts } from "@/infrastructure/meta/meta-api";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";

/** Vuelve a Conexiones con el error en la query string, si lo hubo. */
function backToConnections(error?: string): never {
  redirect(
    error
      ? `${CONNECTIONS_ROUTE}?error=${encodeURIComponent(error)}`
      : CONNECTIONS_ROUTE,
  );
}

/**
 * Cambia la cuenta publicitaria de la que se importan campañas. El identificador
 * se valida contra lo que Meta devuelve en ese momento: lo que llega del cliente
 * no decide qué se guarda. Lo ya importado se borra porque pertenece a la cuenta
 * anterior y, si no, quedaría atribuido a la nueva.
 */
export async function selectMetaAccountAction(
  formData: FormData,
): Promise<void> {
  const accountId = String(formData.get("accountId") ?? "");
  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(
    createSupabaseAuthRepository(supabase),
  )();

  if (!user) redirect(LOGIN_ROUTE);

  const connections = createSupabaseConnectionRepository(supabase);
  const connection = await connections.findByPlatform("meta");

  if (!connection) backToConnections(META_ERRORS.notConnected);
  if (accountId === connection.externalAccountId) backToConnections();

  const accounts = await fetchAdAccounts(connection.accessToken);
  const chosen = accounts.find((account) => account.id === accountId);

  if (!chosen) backToConnections(META_ERRORS.unknownAdAccount);

  const cleared = await createSupabaseCampaignRepository(
    supabase,
  ).deleteConnectionCampaigns(connection.id);

  if (!cleared.success) backToConnections(META_ERRORS.accountSwitchFailed);

  const saved = await connections.updateAccount(connection.id, {
    label: chosen.name,
    externalAccountId: chosen.id,
    extra: { accountNumericId: chosen.accountId },
  });

  if (!saved) backToConnections(META_ERRORS.accountSwitchFailed);

  revalidatePath(CONNECTIONS_ROUTE);
  revalidatePath(CAMPAIGNS_ROUTE);
  backToConnections();
}

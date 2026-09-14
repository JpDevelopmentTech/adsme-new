"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CAMPAIGNS_ROUTE,
  CONNECTIONS_ROUTE,
  LOGIN_ROUTE,
} from "@/constants/routes.constants";
import { TIKTOK_ERRORS } from "@/constants/tiktok-ads.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { resolveTiktokAccess } from "@/infrastructure/tiktok/tiktok-access";
import { fetchAdvertisers } from "@/infrastructure/tiktok/tiktok-oauth";

/** Vuelve a Conexiones con el error en la query string, si lo hubo. */
function backToConnections(error?: string): never {
  redirect(
    error
      ? `${CONNECTIONS_ROUTE}?error=${encodeURIComponent(error)}`
      : CONNECTIONS_ROUTE,
  );
}

/**
 * Cambia la cuenta de anunciante de la que se importan campañas. El
 * identificador se valida contra lo que TikTok devuelve en ese momento: lo que
 * llega del cliente no decide qué se guarda. Lo ya importado se borra porque
 * pertenece a la cuenta anterior y, si no, quedaría atribuido a la nueva.
 */
export async function selectTiktokAccountAction(
  formData: FormData,
): Promise<void> {
  const accountId = String(formData.get("accountId") ?? "");
  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(
    createSupabaseAuthRepository(supabase),
  )();

  if (!user) redirect(LOGIN_ROUTE);

  const connections = createSupabaseConnectionRepository(supabase);
  const connection = await connections.findByPlatform("tiktok");

  if (!connection) backToConnections(TIKTOK_ERRORS.notConnected);
  if (accountId === connection.externalAccountId) backToConnections();

  const access = await resolveTiktokAccess(connection, connections);

  if (access.status !== "ok") {
    backToConnections(TIKTOK_ERRORS.needsReauthorization);
  }

  let chosen;
  try {
    const advertisers = await fetchAdvertisers(access.accessToken);
    chosen = advertisers.find((advertiser) => advertiser.id === accountId);
  } catch {
    backToConnections(TIKTOK_ERRORS.advertisersFailed);
  }

  if (!chosen) backToConnections(TIKTOK_ERRORS.unknownAdvertiser);

  const cleared = await createSupabaseCampaignRepository(
    supabase,
  ).deleteConnectionCampaigns(connection.id);

  if (!cleared.success) backToConnections(TIKTOK_ERRORS.accountSwitchFailed);

  const saved = await connections.updateAccount(connection.id, {
    label: chosen.name,
    externalAccountId: chosen.id,
    extra: { currency: chosen.currency },
  });

  if (!saved) backToConnections(TIKTOK_ERRORS.accountSwitchFailed);

  revalidatePath(CONNECTIONS_ROUTE);
  revalidatePath(CAMPAIGNS_ROUTE);
  backToConnections();
}

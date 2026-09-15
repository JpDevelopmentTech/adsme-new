"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ACCOUNT_IDS_FIELD } from "@/constants/connections.constants";
import {
  CAMPAIGNS_ROUTE,
  CONNECTIONS_ROUTE,
  LOGIN_ROUTE,
} from "@/constants/routes.constants";
import { TIKTOK_ERRORS } from "@/constants/tiktok-ads.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSelectConnectionAccounts } from "@/domain/use-cases/select-connection-accounts";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { resolveTiktokAccess } from "@/infrastructure/tiktok/tiktok-access";
import { fetchAdvertisers } from "@/infrastructure/tiktok/tiktok-oauth";
import { backToConnections } from "@/presentation/actions/back-to-connections";
import { accountIdsSchema } from "@/validators/connection-accounts.validators";
import { toTiktokAccountSelection } from "@/utils/to-tiktok-account-selection";

/**
 * Fija de qué cuentas de anunciante de TikTok se importan campañas.
 *
 * Los identificadores se validan contra lo que TikTok devuelve en ese momento:
 * lo que llega del cliente no decide qué se guarda. Las cuentas que se
 * desmarcan se desconectan y pierden sus campañas importadas.
 */
export async function selectTiktokAccountsAction(
  formData: FormData,
): Promise<void> {
  const parsed = accountIdsSchema.safeParse(formData.getAll(ACCOUNT_IDS_FIELD));

  if (!parsed.success) backToConnections(TIKTOK_ERRORS.noAccountsSelected);

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(
    createSupabaseAuthRepository(supabase),
  )();

  if (!user) redirect(LOGIN_ROUTE);

  const connections = createSupabaseConnectionRepository(supabase);
  // Cualquiera de las conexiones sirve: todas guardan el mismo acceso.
  const [connection] = await connections.listByPlatform("tiktok");

  if (!connection) backToConnections(TIKTOK_ERRORS.notConnected);

  const access = await resolveTiktokAccess(connection, connections);

  if (access.status !== "ok") {
    backToConnections(TIKTOK_ERRORS.needsReauthorization);
  }

  let advertisers;
  try {
    advertisers = await fetchAdvertisers(access.accessToken);
  } catch {
    backToConnections(TIKTOK_ERRORS.advertisersFailed);
  }

  const chosen = advertisers.filter((advertiser) =>
    parsed.data.includes(advertiser.id),
  );

  if (chosen.length !== parsed.data.length) {
    backToConnections(TIKTOK_ERRORS.unknownAdvertiser);
  }

  const saved = await createSelectConnectionAccounts(connections)({
    platform: "tiktok",
    selected: chosen.map(toTiktokAccountSelection),
    access: {
      accessToken: access.accessToken,
      refreshToken: access.refreshToken,
      tokenExpiresAt: access.expiresAt,
      scopes: connection.scopes,
    },
    connectedBy: user.id,
  });

  if (!saved) backToConnections(TIKTOK_ERRORS.accountsUpdateFailed);

  revalidatePath(CONNECTIONS_ROUTE);
  revalidatePath(CAMPAIGNS_ROUTE);
  backToConnections();
}

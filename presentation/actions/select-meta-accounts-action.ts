"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ACCOUNT_IDS_FIELD } from "@/constants/connections.constants";
import { META_ERRORS } from "@/constants/meta-ads.constants";
import {
  CAMPAIGNS_ROUTE,
  CONNECTIONS_ROUTE,
  LOGIN_ROUTE,
} from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSelectConnectionAccounts } from "@/domain/use-cases/select-connection-accounts";
import { fetchAdAccounts } from "@/infrastructure/meta/meta-api";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { backToConnections } from "@/presentation/actions/back-to-connections";
import { accountIdsSchema } from "@/validators/connection-accounts.validators";
import { toMetaAccountSelection } from "@/utils/to-meta-account-selection";

/**
 * Fija de qué cuentas publicitarias de Meta se importan campañas.
 *
 * Los identificadores se validan contra lo que Meta devuelve en ese momento: lo
 * que llega del cliente no decide qué se guarda. Las cuentas que se desmarcan
 * se desconectan y pierden sus campañas importadas, porque pertenecían a ellas.
 */
export async function selectMetaAccountsAction(
  formData: FormData,
): Promise<void> {
  const parsed = accountIdsSchema.safeParse(formData.getAll(ACCOUNT_IDS_FIELD));

  if (!parsed.success) backToConnections(META_ERRORS.noAccountsSelected);

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(
    createSupabaseAuthRepository(supabase),
  )();

  if (!user) redirect(LOGIN_ROUTE);

  const connections = createSupabaseConnectionRepository(supabase);
  // Cualquiera de las conexiones sirve: todas guardan el mismo acceso.
  const [access] = await connections.listByPlatform("meta");

  if (!access) backToConnections(META_ERRORS.notConnected);

  let accounts;
  try {
    accounts = await fetchAdAccounts(access.accessToken);
  } catch {
    backToConnections(META_ERRORS.adAccountsFailed);
  }

  const chosen = accounts.filter((account) =>
    parsed.data.includes(account.id),
  );

  if (chosen.length !== parsed.data.length) {
    backToConnections(META_ERRORS.unknownAdAccount);
  }

  const saved = await createSelectConnectionAccounts(connections)({
    platform: "meta",
    selected: chosen.map(toMetaAccountSelection),
    access: {
      accessToken: access.accessToken,
      refreshToken: access.refreshToken,
      tokenExpiresAt: access.tokenExpiresAt,
      scopes: access.scopes,
    },
    connectedBy: user.id,
  });

  if (!saved) backToConnections(META_ERRORS.accountsUpdateFailed);

  revalidatePath(CONNECTIONS_ROUTE);
  revalidatePath(CAMPAIGNS_ROUTE);
  backToConnections();
}

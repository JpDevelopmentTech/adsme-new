"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CAMPAIGNS_ROUTE,
  CONNECTIONS_ROUTE,
  LOGIN_ROUTE,
} from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";

/**
 * Desvincula Meta Ads por completo: se van todas sus cuentas, no solo una. Las
 * campañas importadas caen con cada conexión por el `on delete cascade` de la
 * clave foránea.
 */
export async function disconnectMetaAction(): Promise<void> {
  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  const connections = createSupabaseConnectionRepository(supabase);
  const accounts = await connections.listByPlatform("meta");

  await Promise.all(
    accounts.map((account) => connections.deleteConnection(account.id)),
  );

  revalidatePath(CONNECTIONS_ROUTE);
  revalidatePath(CAMPAIGNS_ROUTE);
}

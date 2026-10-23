"use server";

import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { syncAllConnections } from "@/infrastructure/sync/sync-all-connections";
import { finishSync } from "@/presentation/actions/finish-sync";

/**
 * Reimporta a mano las campañas de todas las cuentas conectadas, lo mismo que
 * hace el cron cada 6 horas.
 *
 * Se redirige una sola vez y al final: en Next `redirect` viaja como excepción
 * y hacerlo por plataforma cortaría las que quedasen por sincronizar.
 */
export async function syncConnectionsAction(): Promise<void> {
  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  finishSync(await syncAllConnections(supabase));
}

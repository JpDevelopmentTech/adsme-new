"use server";

import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { syncMeta } from "@/infrastructure/sync/sync-meta";
import { finishSync } from "@/presentation/actions/finish-sync";

/** Sincroniza solo Meta y vuelve a Conexiones con el motivo si algo falló. */
export async function syncMetaAction(): Promise<void> {
  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  finishSync([await syncMeta(supabase)]);
}

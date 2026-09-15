import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { TIKTOK_ERRORS } from "@/constants/tiktok-ads.constants";
import { syncFailed, type SyncOutcome } from "@/domain/entities/sync-outcome";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { syncEachConnection } from "@/infrastructure/sync/sync-each-connection";
import { syncTiktokConnection } from "@/infrastructure/sync/sync-tiktok-connection";

/**
 * Importa las campañas de todas las cuentas de anunciante de TikTok conectadas:
 * cada una es su propia conexión, con su token y sus campañas, así que se
 * sincronizan por separado y un fallo en una no impide importar las demás.
 */
export async function syncTiktok(
  supabase: SupabaseClient,
): Promise<SyncOutcome[]> {
  const connections = createSupabaseConnectionRepository(supabase);
  const accounts = await connections.listByPlatform("tiktok");

  if (accounts.length === 0) return [syncFailed(TIKTOK_ERRORS.notConnected)];

  return syncEachConnection(accounts, (connection) =>
    syncTiktokConnection(supabase, connections, connection),
  );
}

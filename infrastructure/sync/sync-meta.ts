import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { META_ERRORS } from "@/constants/meta-ads.constants";
import { syncFailed, type SyncOutcome } from "@/domain/entities/sync-outcome";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { syncEachConnection } from "@/infrastructure/sync/sync-each-connection";
import { syncMetaConnection } from "@/infrastructure/sync/sync-meta-connection";

/**
 * Importa las campañas de todas las cuentas de Meta conectadas: cada una es su
 * propia conexión, con su token y sus campañas, así que se sincronizan por
 * separado y un fallo en una no impide importar las demás.
 */
export async function syncMeta(
  supabase: SupabaseClient,
): Promise<SyncOutcome[]> {
  const connections = createSupabaseConnectionRepository(supabase);
  const accounts = await connections.listByPlatform("meta");

  if (accounts.length === 0) return [syncFailed(META_ERRORS.notConnected)];

  return syncEachConnection(accounts, (connection) =>
    syncMetaConnection(supabase, connections, connection),
  );
}

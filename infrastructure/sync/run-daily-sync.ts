import "server-only";

import { logger } from "@/infrastructure/logging/logger";
import { listConnectionOwners } from "@/infrastructure/repositories/list-connection-owners";
import { createServiceSupabaseClient } from "@/infrastructure/supabase/service-supabase-client";
import { syncOwner } from "@/infrastructure/sync/sync-owner";
import type { DailySyncSummary } from "@/types/cron.types";

/**
 * Importación programada de todo: las cuentas conectadas de cada propietario.
 *
 * Los propietarios van en paralelo porque cada uno usa sus propios accesos;
 * dentro de cada uno las cuentas siguen yendo en serie, como en el botón.
 * Así la duración la marca el propietario más lento, no la suma de todos.
 */
export async function runDailySync(): Promise<DailySyncSummary> {
  const startedAt = new Date().toISOString();

  const admin = createServiceSupabaseClient();
  const ownerIds = await listConnectionOwners(admin);
  const owners = await Promise.all(
    ownerIds.map((ownerId) => syncOwner(admin, ownerId)),
  );

  const summary: DailySyncSummary = {
    startedAt,
    finishedAt: new Date().toISOString(),
    owners,
  };

  for (const owner of owners) {
    if (owner.ok) logger.info("cron.owner_synced", { ownerId: owner.ownerId });
    else logger.error("cron.owner_failed", { ownerId: owner.ownerId, errors: owner.errors });
  }

  return summary;
}

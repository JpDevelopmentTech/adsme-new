import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { logger } from "@/infrastructure/logging/logger";
import { openOwnerSession } from "@/infrastructure/supabase/owner-session";
import { syncAllConnections } from "@/infrastructure/sync/sync-all-connections";
import type { OwnerSyncResult } from "@/types/cron.types";

/**
 * Sincroniza todas las cuentas de un propietario con su propia sesión, igual
 * que si hubiera pulsado «Sincronizar».
 *
 * Nunca lanza: un propietario con el acceso caducado no debe impedir que se
 * sincronicen los demás. La sesión se cierra pase lo que pase.
 */
export async function syncOwner(
  admin: SupabaseClient,
  ownerId: string,
): Promise<OwnerSyncResult> {
  let session;

  try {
    session = await openOwnerSession(admin, ownerId);

    const errors = (await syncAllConnections(session.supabase)).flatMap(
      (outcome) => (outcome.ok ? [] : [outcome.message]),
    );

    return { ownerId, ok: errors.length === 0, errors };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);

    return { ownerId, ok: false, errors: [reason] };
  } finally {
    await session?.close().catch((error: unknown) => {
      logger.warn("cron.session_close_failed", {
        ownerId,
        reason: error instanceof Error ? error.message : String(error),
      });
    });
  }
}

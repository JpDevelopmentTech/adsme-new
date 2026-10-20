import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { ConnectionPlatform } from "@/domain/entities/connection";
import type { SyncOutcome } from "@/domain/entities/sync-outcome";
import { isGoogleAdsConfigured } from "@/infrastructure/google/google-ads-env";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { syncGoogle } from "@/infrastructure/sync/sync-google";
import { syncMeta } from "@/infrastructure/sync/sync-meta";
import { syncTiktok } from "@/infrastructure/sync/sync-tiktok";

/**
 * Sincronizador de cada plataforma que ya tiene integración real. Todos
 * devuelven una lista porque Meta y TikTok admiten varias cuentas conectadas y
 * cada una trae su propio resultado; Google, con una sola, devuelve uno.
 */
const SYNCS: Partial<
  Record<
    ConnectionPlatform,
    (supabase: SupabaseClient) => Promise<SyncOutcome[]>
  >
> = {
  google_ads: async (supabase) => [await syncGoogle(supabase)],
  meta: syncMeta,
  tiktok: syncTiktok,
};

/**
 * Reimporta las campañas de todas las cuentas conectadas del usuario con el
 * que está autenticado `supabase`. Lo comparten el botón «Sincronizar» y el
 * cron diario, así que ambos importan exactamente lo mismo.
 *
 * Las plataformas se sincronizan una tras otra y sus resultados se juntan al
 * final: quien llama decide qué hacer con los fallos.
 */
export async function syncAllConnections(
  supabase: SupabaseClient,
): Promise<SyncOutcome[]> {
  const connections =
    await createSupabaseConnectionRepository(supabase).listConnections();

  // Una vuelta por plataforma aunque haya varias cuentas de la misma: cada
  // sync recorre por su cuenta todas las conexiones que le pertenecen.
  const platforms = [...new Set(connections.map((item) => item.platform))];

  // Google no se conecta desde la app: sus datos los empuja un script y la fila
  // de conexión se crea sola en el primer sync. Sin esto nunca entraría en el
  // bucle, porque el usuario todavía no tiene ninguna conexión suya de Google.
  if (isGoogleAdsConfigured() && !platforms.includes("google_ads")) {
    platforms.push("google_ads");
  }

  const outcomes: SyncOutcome[] = [];

  for (const platform of platforms) {
    const sync = SYNCS[platform];
    if (!sync) continue;

    outcomes.push(...(await sync(supabase)));
  }

  return outcomes;
}

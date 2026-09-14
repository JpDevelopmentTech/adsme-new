"use server";

import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { LOGIN_ROUTE } from "@/constants/routes.constants";
import type { ConnectionPlatform } from "@/domain/entities/connection";
import type { SyncOutcome } from "@/domain/entities/sync-outcome";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { isGoogleAdsConfigured } from "@/infrastructure/google/google-ads-env";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { syncGoogle } from "@/infrastructure/sync/sync-google";
import { syncMeta } from "@/infrastructure/sync/sync-meta";
import { syncTiktok } from "@/infrastructure/sync/sync-tiktok";
import { finishSync } from "@/presentation/actions/finish-sync";

/** Sincronizador de cada plataforma que ya tiene integración real. */
const SYNCS: Partial<
  Record<ConnectionPlatform, (supabase: SupabaseClient) => Promise<SyncOutcome>>
> = {
  google_ads: syncGoogle,
  meta: syncMeta,
  tiktok: syncTiktok,
};

/**
 * Reimporta las campañas de todas las cuentas conectadas.
 *
 * Las plataformas se sincronizan una tras otra y sus resultados se juntan al
 * final. Antes cada una redirigía por su cuenta y, como en Next `redirect` viaja
 * como excepción, la primera cortaba el bucle: con dos cuentas conectadas solo
 * llegaba a importarse la más antigua.
 */
export async function syncConnectionsAction(): Promise<void> {
  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  const connections =
    await createSupabaseConnectionRepository(supabase).listConnections();

  // Una vuelta por plataforma aunque haya varias filas de la misma: cada sync
  // resuelve la conexión vigente por sí mismo y repetirlo sería trabajo doble.
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

    outcomes.push(await sync(supabase));
  }

  finishSync(outcomes);
}

import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { GOOGLE_ADS_ACCOUNT_LABEL } from "@/constants/google-ads.constants";
import type { Connection } from "@/domain/entities/connection";
import { getGoogleAdsAccountId } from "@/infrastructure/google/google-ads-env";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";

/**
 * Ocupa el lugar del token en una conexión que no tiene ninguno. La columna es
 * obligatoria y se guarda cifrada como las demás, así que no puede quedar vacía.
 */
const SCRIPT_TOKEN_MARKER = "google-ads-script";

/**
 * Devuelve la conexión de Google Ads del usuario, creándola si es su primera
 * sincronización.
 *
 * A diferencia de Meta y TikTok, aquí nadie pulsa «Conectar»: la cuenta es una
 * sola para toda la plataforma y los datos ya están en el buzón. La fila existe
 * únicamente para colgar de ella las campañas del usuario, porque `campaigns`
 * exige que campaña y conexión compartan dueño.
 */
export async function ensureGoogleConnection(
  supabase: SupabaseClient,
  connectedBy: string,
): Promise<Connection | null> {
  const connections = createSupabaseConnectionRepository(supabase);
  const existing = await connections.findByPlatform("google_ads");

  if (existing) return existing;

  const saved = await connections.saveConnection(
    {
      platform: "google_ads",
      accountLabel: GOOGLE_ADS_ACCOUNT_LABEL,
      externalAccountId: getGoogleAdsAccountId(),
      accessToken: SCRIPT_TOKEN_MARKER,
      refreshToken: null,
      tokenExpiresAt: null,
      scopes: "",
      extra: { source: SCRIPT_TOKEN_MARKER },
    },
    connectedBy,
  );

  return saved ? connections.findByPlatform("google_ads") : null;
}

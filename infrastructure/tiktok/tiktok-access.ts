import "server-only";

import { TIKTOK_TOKEN_SKEW_SECONDS } from "@/constants/tiktok-ads.constants";
import type { Connection } from "@/domain/entities/connection";
import { refreshAccessToken } from "@/infrastructure/tiktok/tiktok-oauth";
import type { ConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";

/** El acceso sirve, no sirve, o falló algo que no dice nada sobre el permiso. */
export type TiktokAccess =
  | { status: "ok"; accessToken: string }
  | { status: "revoked" }
  | { status: "failed" };

function isFresh(expiresAt: string | null): boolean {
  if (!expiresAt) return true;

  return Date.parse(expiresAt) - Date.now() > TIKTOK_TOKEN_SKEW_SECONDS * 1000;
}

/**
 * Devuelve un token de acceso utilizable, renovándolo si hace falta y
 * guardando el nuevo. Único sitio donde se refresca.
 *
 * Distingue el permiso revocado de un fallo pasajero a propósito: marcar la
 * conexión como revocada por una caída de TikTok obligaría al usuario a
 * reautorizar sin motivo.
 */
export async function resolveTiktokAccess(
  connection: Connection,
  connections: ConnectionRepository,
): Promise<TiktokAccess> {
  if (isFresh(connection.tokenExpiresAt)) {
    return { status: "ok", accessToken: connection.accessToken };
  }

  if (!connection.refreshToken) {
    await connections.setStatus(connection.id, "revocado");
    return { status: "revoked" };
  }

  try {
    const renewed = await refreshAccessToken(connection.refreshToken);

    if (!renewed) {
      await connections.setStatus(connection.id, "revocado");
      return { status: "revoked" };
    }

    await connections.updateTokens(connection.id, {
      accessToken: renewed.accessToken,
      refreshToken: renewed.refreshToken,
      tokenExpiresAt: renewed.expiresAt,
    });

    return { status: "ok", accessToken: renewed.accessToken };
  } catch {
    // Sin saber si fue el permiso o la red, no se toca el estado guardado.
    return { status: "failed" };
  }
}

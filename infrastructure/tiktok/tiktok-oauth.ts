import "server-only";

import {
  TIKTOK_AUTH_URL,
  TIKTOK_PAGE_SIZE,
} from "@/constants/tiktok-ads.constants";
import type { TiktokAdvertiser, TiktokToken } from "@/domain/entities/tiktok-ads";
import { tiktokGet, tiktokPost } from "@/infrastructure/tiktok/tiktok-client";
import { getTiktokCredentials } from "@/infrastructure/tiktok/tiktok-env";

/** Respuesta del canje. `expires_in` solo llega si el token caduca. */
interface TokenPayload {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  advertiser_ids?: string[];
}

/**
 * URL de la pantalla de consentimiento. TikTok la sirve desde su portal y no
 * usa los parámetros habituales de OAuth: la app se identifica con `app_id`.
 */
export function buildTiktokAuthorizationUrl(
  state: string,
  redirectUri: string,
): string | null {
  const credentials = getTiktokCredentials();
  if (!credentials) return null;

  const params = new URLSearchParams({
    app_id: credentials.appId,
    redirect_uri: redirectUri,
    state,
  });

  return `${TIKTOK_AUTH_URL}?${params}`;
}

/**
 * Canjea el código de autorización por el acceso. TikTok lo llama `auth_code`,
 * no `code`, y la credencial secreta `secret`, no `client_secret`.
 */
export async function exchangeCodeForToken(
  authCode: string,
): Promise<TiktokToken | null> {
  const credentials = getTiktokCredentials();
  if (!credentials) return null;

  const payload = await tiktokPost<TokenPayload>("/oauth2/access_token/", {
    app_id: credentials.appId,
    secret: credentials.secret,
    auth_code: authCode,
    grant_type: "authorization_code",
  });

  if (!payload.access_token) return null;

  return {
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token ?? null,
    expiresAt: payload.expires_in
      ? new Date(Date.now() + payload.expires_in * 1000).toISOString()
      : null,
    advertiserIds: payload.advertiser_ids ?? [],
  };
}

/**
 * Renueva el acceso sin volver a pedir permiso. Solo aplica si el canje
 * entregó un refresh token: cuando el de anunciante no caduca, TikTok no lo
 * manda y esta función nunca llega a llamarse.
 */
export async function refreshAccessToken(
  refreshToken: string,
): Promise<TiktokToken | null> {
  const credentials = getTiktokCredentials();
  if (!credentials) return null;

  const payload = await tiktokPost<TokenPayload>("/oauth2/refresh_token/", {
    app_id: credentials.appId,
    secret: credentials.secret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  if (!payload.access_token) return null;

  return {
    accessToken: payload.access_token,
    // TikTok reenvía el refresh token al renovar; si no lo hace se conserva el guardado.
    refreshToken: payload.refresh_token ?? null,
    expiresAt: payload.expires_in
      ? new Date(Date.now() + payload.expires_in * 1000).toISOString()
      : null,
    advertiserIds: payload.advertiser_ids ?? [],
  };
}

interface AdvertiserRow {
  advertiser_id: string;
  advertiser_name?: string;
}

interface AdvertiserInfoRow {
  advertiser_id: string;
  advertiser_name?: string;
  currency?: string;
}

/**
 * Cuentas de anunciante que cubre el permiso concedido. A diferencia de Google,
 * TikTok devuelve el nombre junto al identificador, así que basta una llamada;
 * la segunda solo añade la moneda, y si falla no se pierde la lista.
 */
export async function fetchAdvertisers(
  accessToken: string,
): Promise<TiktokAdvertiser[]> {
  const credentials = getTiktokCredentials();
  if (!credentials) return [];

  const payload = await tiktokGet<{ list?: AdvertiserRow[] }>(
    "/oauth2/advertiser/get/",
    { app_id: credentials.appId, secret: credentials.secret },
    accessToken,
  );

  const rows = payload.list ?? [];
  if (rows.length === 0) return [];

  const currencies = await fetchCurrencies(
    rows.map((row) => row.advertiser_id),
    accessToken,
  );

  return rows.map((row) => ({
    id: row.advertiser_id,
    name: row.advertiser_name?.trim() || row.advertiser_id,
    currency: currencies.get(row.advertiser_id) ?? null,
  }));
}

/** La moneda es informativa: un fallo aquí no debe dejar sin cuentas al selector. */
async function fetchCurrencies(
  ids: string[],
  accessToken: string,
): Promise<Map<string, string>> {
  try {
    const payload = await tiktokGet<{ list?: AdvertiserInfoRow[] }>(
      "/advertiser/info/",
      {
        advertiser_ids: JSON.stringify(ids.slice(0, TIKTOK_PAGE_SIZE)),
        fields: JSON.stringify(["advertiser_id", "advertiser_name", "currency"]),
      },
      accessToken,
    );

    return new Map(
      (payload.list ?? []).map((row) => [row.advertiser_id, row.currency ?? ""]),
    );
  } catch {
    return new Map();
  }
}

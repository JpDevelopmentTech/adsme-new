import "server-only";

/**
 * Credenciales de la app de TikTok for Business. `null` si todavía no están
 * configuradas. TikTok no las llama `client_id`/`client_secret` sino
 * `app_id`/`secret`, y así viajan en cada petición.
 */
export function getTiktokCredentials(): { appId: string; secret: string } | null {
  const appId = process.env.TIKTOK_APP_ID;
  const secret = process.env.TIKTOK_APP_SECRET;

  if (!appId || !secret) return null;

  return { appId, secret };
}

export function isTiktokConfigured(): boolean {
  return getTiktokCredentials() !== null;
}

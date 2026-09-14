import "server-only";

/** Credenciales de la app de Meta. `null` si todavía no están configuradas. */
export function getMetaCredentials(): { appId: string; appSecret: string } | null {
  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;

  if (!appId || !appSecret) return null;

  return { appId, appSecret };
}

export function isMetaConfigured(): boolean {
  return getMetaCredentials() !== null;
}

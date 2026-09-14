import "server-only";

import { MetaApiError } from "@/infrastructure/meta/meta-api-error";

/**
 * GET a la Graph API devolviendo `null` ante cualquier fallo o error de Meta.
 * Los flujos de OAuth ya traducen ese `null` a un mensaje para el usuario.
 */
export async function getJson<TPayload>(url: string): Promise<TPayload | null> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return null;

    const payload = (await response.json()) as TPayload & { error?: unknown };

    return payload.error ? null : payload;
  } catch {
    return null;
  }
}

/**
 * Igual que `getJson`, pero propaga el motivo que devuelve Meta. La importación
 * lo necesita: si falla, un array vacío es indistinguible de una cuenta sin
 * campañas, y ese silencio es lo que impedía ver por qué no llegaban datos.
 */
export async function getJsonOrThrow<TPayload>(url: string): Promise<TPayload> {
  let response: Response;

  try {
    response = await fetch(url, { cache: "no-store" });
  } catch {
    throw new MetaApiError("No se pudo contactar con Meta.");
  }

  const payload = (await response.json().catch(() => null)) as
    | (TPayload & { error?: { message?: string } })
    | null;

  if (!response.ok || !payload || payload.error) {
    throw new MetaApiError(payload?.error?.message ?? `HTTP ${response.status}`);
  }

  return payload;
}

import "server-only";

import { TIKTOK_API_URL } from "@/constants/tiktok-ads.constants";
import { TiktokApiError } from "@/infrastructure/tiktok/tiktok-api-error";

/** Envoltorio con el que TikTok responde a todo, éxito o fallo. */
interface TiktokEnvelope<TData> {
  code?: number;
  message?: string;
  data?: TData;
}

/**
 * Desempaqueta la respuesta de TikTok.
 *
 * Es el detalle que más se cuela: **los errores llegan con HTTP 200** y el
 * motivo en `code`, así que comprobar solo `response.ok` los dejaría pasar como
 * respuestas vacías. Cualquier `code` distinto de 0 es un fallo.
 */
async function unwrap<TData>(response: Response): Promise<TData> {
  if (!response.ok) {
    throw new TiktokApiError(`TikTok respondió ${response.status}.`, response.status);
  }

  const payload = (await response.json()) as TiktokEnvelope<TData>;

  if (payload.code !== 0) {
    throw new TiktokApiError(
      payload.message ?? "TikTok rechazó la petición.",
      payload.code ?? -1,
    );
  }

  if (!payload.data) {
    throw new TiktokApiError("TikTok respondió sin datos.", payload.code ?? -1);
  }

  return payload.data;
}

/** GET autenticado. El token viaja en la cabecera `Access-Token`, no en Bearer. */
export async function tiktokGet<TData>(
  path: string,
  params: Record<string, string>,
  accessToken: string,
): Promise<TData> {
  const response = await fetch(
    `${TIKTOK_API_URL}${path}?${new URLSearchParams(params)}`,
    { headers: { "Access-Token": accessToken }, cache: "no-store" },
  );

  return unwrap<TData>(response);
}

/** POST sin autenticar, para el canje del código por el token. */
export async function tiktokPost<TData>(
  path: string,
  body: Record<string, unknown>,
): Promise<TData> {
  const response = await fetch(`${TIKTOK_API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  return unwrap<TData>(response);
}

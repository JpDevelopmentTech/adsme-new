import "server-only";

import { META_GRAPH_URL } from "@/constants/meta-ads.constants";
import { getJsonOrThrow } from "@/infrastructure/meta/meta-http";
import { MetaApiError } from "@/infrastructure/meta/meta-api-error";
import { currencyCodeSchema } from "@/validators/currency.validators";

/**
 * Moneda de la cuenta publicitaria, en la que Meta reporta todo el gasto.
 *
 * Lanza `MetaApiError` si Meta no la devuelve: importar sin ella obligaría a
 * suponer pesos, y una cuenta en dólares volvería a sumarse como si lo fueran.
 */
export async function fetchMetaAccountCurrency(
  accessToken: string,
  adAccountId: string,
): Promise<string> {
  const params = new URLSearchParams({
    fields: "currency",
    access_token: accessToken,
  });

  const payload = await getJsonOrThrow<{ currency?: unknown }>(
    `${META_GRAPH_URL}/${adAccountId}?${params}`,
  );
  const currency = currencyCodeSchema.safeParse(payload.currency);

  if (!currency.success) {
    throw new MetaApiError("Meta no informó la moneda de la cuenta.");
  }

  return currency.data;
}

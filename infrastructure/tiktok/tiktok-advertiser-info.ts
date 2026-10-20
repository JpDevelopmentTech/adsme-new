import "server-only";

import { TIKTOK_PAGE_SIZE } from "@/constants/tiktok-ads.constants";
import { TiktokApiError } from "@/infrastructure/tiktok/tiktok-api-error";
import { tiktokGet } from "@/infrastructure/tiktok/tiktok-client";
import { currencyCodeSchema } from "@/validators/currency.validators";

/**
 * Campos pedidos a `/advertiser/info/`. El nombre es `name`, no
 * `advertiser_name` como en `/oauth2/advertiser/get/`: con ese TikTok responde
 * 40002 y por eso todas las cuentas se guardaban sin moneda.
 */
const ADVERTISER_INFO_FIELDS = ["advertiser_id", "name", "currency"];

interface AdvertiserInfoRow {
  advertiser_id: string;
  currency?: unknown;
}

/**
 * Moneda de cada cuenta de anunciante, indexada por su id. TikTok reporta el
 * gasto en la moneda de la cuenta. Lanza `TiktokApiError` si la consulta falla.
 */
export async function fetchAdvertiserCurrencies(
  advertiserIds: string[],
  accessToken: string,
): Promise<Map<string, string>> {
  const payload = await tiktokGet<{ list?: AdvertiserInfoRow[] }>(
    "/advertiser/info/",
    {
      advertiser_ids: JSON.stringify(advertiserIds.slice(0, TIKTOK_PAGE_SIZE)),
      fields: JSON.stringify(ADVERTISER_INFO_FIELDS),
    },
    accessToken,
  );

  const currencies = new Map<string, string>();

  for (const row of payload.list ?? []) {
    const currency = currencyCodeSchema.safeParse(row.currency);
    if (currency.success) currencies.set(row.advertiser_id, currency.data);
  }

  return currencies;
}

/**
 * Moneda de una sola cuenta, para la sincronización. Lanza si TikTok no la da:
 * importar sin ella obligaría a suponer pesos y una cuenta en dólares volvería
 * a sumarse como si lo fueran.
 */
export async function fetchAdvertiserCurrency(
  advertiserId: string,
  accessToken: string,
): Promise<string> {
  const currency = (
    await fetchAdvertiserCurrencies([advertiserId], accessToken)
  ).get(advertiserId);

  if (!currency) {
    throw new TiktokApiError("TikTok no informó la moneda de la cuenta.", -1);
  }

  return currency;
}

import { BASE_CURRENCY, TRM_CURRENCY } from "@/constants/currency.constants";
import type { SpendByCurrency } from "@/domain/entities/money";
import type { ReportSpend } from "@/domain/entities/report-spend";
import { addToSpend } from "@/utils/add-to-spend";

/**
 * Prepara el gasto de un trabajo para el reporte público. Los pesos se quedan
 * como están; los dólares se convierten con la TRM del trabajo si la tiene, y
 * si no se dejan aparte. Cualquier otra moneda también queda aparte: adsme solo
 * convierte dólares, con la tasa que el gestor acordó con su cliente.
 */
export function convertSpend(
  spend: SpendByCurrency,
  usdCopRate: number | null,
): ReportSpend {
  let nativeCop = 0;
  let pending: SpendByCurrency = {};
  const conversions: ReportSpend["conversions"] = [];

  for (const [currency, amount] of Object.entries(spend)) {
    if (currency === BASE_CURRENCY) nativeCop += amount;
    else if (currency === TRM_CURRENCY && usdCopRate !== null) {
      conversions.push({ usd: amount, rate: usdCopRate });
    } else pending = addToSpend(pending, currency, amount);
  }

  return { nativeCop, conversions, pending };
}

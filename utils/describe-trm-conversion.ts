import { STEP_THREE_COPY } from "@/constants/report-config.constants";
import { BASE_CURRENCY, TRM_CURRENCY } from "@/constants/currency.constants";
import { TRM_LIMITS } from "@/constants/trm.constants";
import type { SpendByCurrency } from "@/domain/entities/money";
import { convertSpend } from "@/utils/convert-spend";
import { formatMoney } from "@/utils/format-money";
import { formatTrm } from "@/utils/format-trm";
import { reportSpendCop } from "@/utils/report-spend-cop";

/**
 * Pista del campo de la TRM: cuánto suman en pesos los dólares del trabajo con
 * la tasa escrita y qué inversión verá el cliente. Una tasa suelta no dice si
 * está bien escrita; la cifra que produce, sí. `undefined` mientras la tasa no
 * sea válida, para no enseñar cuentas con un número a medio escribir.
 */
export function describeTrmConversion(
  jobSpend: SpendByCurrency,
  rate: number | null,
): string | undefined {
  const usd = jobSpend[TRM_CURRENCY] ?? 0;

  if (usd <= 0) return STEP_THREE_COPY.trmNoUsd;
  if (rate === null || rate < TRM_LIMITS.min || rate > TRM_LIMITS.max) {
    return undefined;
  }

  return STEP_THREE_COPY.trmHint(
    formatMoney(usd, TRM_CURRENCY),
    formatTrm(rate),
    formatMoney(Math.round(usd * rate), BASE_CURRENCY),
    formatMoney(reportSpendCop(convertSpend(jobSpend, rate)), BASE_CURRENCY),
  );
}

import {
  BASE_CURRENCY,
  SPEND_JOINER,
} from "@/constants/currency.constants";
import type { SpendByCurrency } from "@/domain/entities/money";
import type { MoneyFormatOptions } from "@/types/money.types";
import { formatMoney } from "@/utils/format-money";
import { sortCurrencies } from "@/utils/sort-currencies";

/**
 * Reparto por monedas en una línea, sin sumar nada: «$8,9 M + US$876». Sin
 * gasto se escribe «$0», como cualquier otra cifra vacía en pesos.
 */
export function formatSpend(
  spend: SpendByCurrency,
  options: MoneyFormatOptions = {},
): string {
  const currencies = sortCurrencies(Object.keys(spend));

  if (currencies.length === 0) return formatMoney(0, BASE_CURRENCY, options);

  return currencies
    .map((currency) => formatMoney(spend[currency] ?? 0, currency, options))
    .join(SPEND_JOINER);
}

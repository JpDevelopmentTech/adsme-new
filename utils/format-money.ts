import {
  BASE_CURRENCY,
  CURRENCY_LOCALE,
  CURRENCY_SYMBOLS,
  MILLION,
  THOUSAND,
} from "@/constants/currency.constants";
import type { MoneyFormatOptions } from "@/types/money.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatExactCurrency } from "@/utils/format-exact-currency";

/** Por debajo de esta cifra el importe abreviado se escribe entero: «US$1.966». */
const COMPACT_FROM = 10 * THOUSAND;

/** Prefijo de la moneda: «$», «US$» o el código seguido de espacio («EUR 12»). */
function prefixOf(currency: string): string {
  return CURRENCY_SYMBOLS[currency] ?? `${currency} `;
}

/** Cifra con separador de miles; con céntimos solo si los tiene («876», «876,37»). */
function formatAmount(amount: number): string {
  const hasCents = Math.round(amount * 100) % 100 !== 0;

  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(amount);
}

/** Cifra abreviada con un decimal: «15,8 K», «1,2 M». */
function formatScaled(amount: number): string {
  const [divisor, unit] = amount >= MILLION ? [MILLION, "M"] : [THOUSAND, "K"];

  return `${new Intl.NumberFormat(CURRENCY_LOCALE, {
    maximumFractionDigits: 1,
  }).format(amount / divisor)} ${unit}`;
}

/**
 * Escribe un importe en su moneda. Los pesos siguen el formato de siempre
 * («$8.900.000», «$8,9 M»); los dólares llevan «US$» para no confundirse con
 * pesos y conservan los céntimos, que en dólares sí significan algo.
 */
export function formatMoney(
  amount: number,
  currency: string,
  { compact = false }: MoneyFormatOptions = {},
): string {
  if (currency === BASE_CURRENCY) {
    return compact ? formatCompactCurrency(amount) : formatExactCurrency(amount);
  }

  const figure =
    compact && amount >= COMPACT_FROM
      ? formatScaled(amount)
      : formatAmount(compact ? Math.round(amount) : amount);

  return `${prefixOf(currency)}${figure}`;
}

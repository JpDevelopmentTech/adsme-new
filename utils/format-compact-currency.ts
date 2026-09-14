import {
  CURRENCY_LOCALE,
  CURRENCY_SYMBOL,
  MILLION,
  THOUSAND,
} from "@/constants/currency.constants";

/** Formatea el número con un decimal y coma decimal, sin ceros sobrantes ("41,7", "5"). */
function formatUnit(value: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Importe abreviado para las tarjetas de métricas: `$41,7 M`, `$850 K`, `$1.200`.
 * El diseño muestra siempre la escala en mayúscula tras el número.
 */
export function formatCompactCurrency(amount: number): string {
  if (amount >= MILLION) {
    return `${CURRENCY_SYMBOL}${formatUnit(amount / MILLION)} M`;
  }

  if (amount >= THOUSAND) {
    return `${CURRENCY_SYMBOL}${formatUnit(amount / THOUSAND)} K`;
  }

  return `${CURRENCY_SYMBOL}${formatUnit(amount)}`;
}

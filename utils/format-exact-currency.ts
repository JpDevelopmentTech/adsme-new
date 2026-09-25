import { CURRENCY_LOCALE, CURRENCY_SYMBOL } from "@/constants/currency.constants";

/**
 * Importe completo al peso: `$28.351.772`. Sin decimales porque las cuentas
 * reportan en pesos colombianos, donde los céntimos no significan nada y solo
 * alargan una cifra que ya es larga.
 */
export function formatExactCurrency(amount: number): string {
  return `${CURRENCY_SYMBOL}${new Intl.NumberFormat(CURRENCY_LOCALE, {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

import { CURRENCY_LOCALE, CURRENCY_SYMBOL } from "@/constants/currency.constants";

/**
 * Costo por vista: `$35` o `$12,40`. A diferencia del resto de importes lleva
 * céntimos, porque en un CPV de decenas de pesos son la diferencia que importa.
 */
export function formatCpv(value: number): string {
  return `${CURRENCY_SYMBOL}${new Intl.NumberFormat(CURRENCY_LOCALE, {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value)}`;
}

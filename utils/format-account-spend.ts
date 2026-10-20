import {
  CURRENCY_LOCALE,
  REPORTING_CURRENCY,
} from "@/constants/currency.constants";

/**
 * Gasto en la moneda original de la cuenta (`USD 876,00`), para enseñarlo junto
 * a su equivalente en pesos. `null` si la cuenta ya es en pesos: repetir la
 * misma cifra no aporta nada.
 */
export function formatAccountSpend(
  amount: number,
  currency: string,
): string | null {
  if (currency === REPORTING_CURRENCY) return null;

  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: "currency",
    currency,
    currencyDisplay: "code",
  }).format(amount);
}

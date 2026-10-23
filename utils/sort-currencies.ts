import { CURRENCY_ORDER } from "@/constants/currency.constants";

/** Posición de una moneda: primero las de `CURRENCY_ORDER`, luego el resto. */
function rank(currency: string): number {
  const index = CURRENCY_ORDER.indexOf(currency);

  return index === -1 ? CURRENCY_ORDER.length : index;
}

/**
 * Ordena códigos de moneda como se listan en pantalla: pesos, dólares y, detrás,
 * las demás por orden alfabético.
 */
export function sortCurrencies(currencies: readonly string[]): string[] {
  return [...currencies].sort(
    (a, b) => rank(a) - rank(b) || a.localeCompare(b),
  );
}

import { CURRENCY_LOCALE, CURRENCY_SYMBOLS } from "@/constants/currency.constants";

/** TRM en pesos por dólar, con céntimos solo si los tiene: «$4.000», «$4.150,25». */
export function formatTrm(rate: number): string {
  const hasCents = Math.round(rate * 100) % 100 !== 0;

  return `${CURRENCY_SYMBOLS.COP}${new Intl.NumberFormat(CURRENCY_LOCALE, {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(rate)}`;
}

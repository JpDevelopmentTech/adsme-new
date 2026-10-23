import { CURRENCY_LOCALE } from "@/constants/currency.constants";

/**
 * TRM guardada tal como se vuelve a mostrar en el campo: «4.150,25», con el
 * mismo formato que acepta `parseTrmInput`, para que editar y guardar sin
 * tocarla no la cambie.
 */
export function formatTrmInput(rate: number | null): string {
  if (rate === null) return "";

  const hasCents = Math.round(rate * 100) % 100 !== 0;

  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(rate);
}

import { CURRENCY_LOCALE, MILLION, THOUSAND } from "@/constants/currency.constants";

/**
 * Precisión de la escala abreviada: cuanto menor es el número, más decimales
 * hacen falta para que la cifra siga diciendo algo (`3,42 M`, `84,3 K`, `312 K`).
 */
function formatScaled(value: number): string {
  const decimals = value >= 100 ? 0 : value >= 10 ? 1 : 2;

  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Cifra abreviada de las tarjetas del reporte: `3,42 M`, `312 K`, `1.284`. */
export function formatCompactNumber(value: number): string {
  if (value >= MILLION) return `${formatScaled(value / MILLION)} M`;
  if (value >= THOUSAND) return `${formatScaled(value / THOUSAND)} K`;

  return new Intl.NumberFormat(CURRENCY_LOCALE).format(Math.round(value));
}

/** Porcentaje redondeado tal como lo escribe el diseño (`74%`, `9,4%`). */
export function formatPercent(value: number): string {
  const decimals = value >= 10 ? 0 : 1;

  return `${new Intl.NumberFormat(CURRENCY_LOCALE, {
    maximumFractionDigits: decimals,
  }).format(value)}%`;
}

/** Reparto seguro: devuelve 0 en lugar de `NaN` o `Infinity` cuando no hay base. */
export function share(part: number, total: number): number {
  return total > 0 ? (part / total) * 100 : 0;
}

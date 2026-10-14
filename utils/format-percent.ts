/** Porcentaje con coma decimal: `12,3%`. Por defecto un decimal. */
export function formatPercent(value: number, digits = 1): string {
  return `${new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)}%`;
}

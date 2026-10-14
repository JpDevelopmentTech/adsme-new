/** Número de un porcentaje sin el signo y con coma decimal: «20», «12,5». */
export function formatPlainPercent(value: number): string {
  return new Intl.NumberFormat("es-CO", { maximumFractionDigits: 1 }).format(value);
}

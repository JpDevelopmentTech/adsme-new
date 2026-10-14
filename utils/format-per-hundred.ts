/** Pesos de cada $100 con un decimal y coma: `$32,7`. */
export function formatPerHundred(value: number): string {
  return `$${new Intl.NumberFormat("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value)}`;
}

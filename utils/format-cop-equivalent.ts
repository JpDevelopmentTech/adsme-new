/** Equivalente en pesos de un importe en dólares: `$4.012.500 COP`. */
export function formatCopEquivalent(copAmount: number): string {
  return `$${Math.round(copAmount).toLocaleString("es-CO")} COP`;
}

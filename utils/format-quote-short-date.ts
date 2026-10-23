/** Fecha ISO (`2026-10-20`) en corto para los avisos de la TRM: día y mes abreviado. */
export function formatQuoteShortDate(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("es-CO", { day: "numeric", month: "short" });
}

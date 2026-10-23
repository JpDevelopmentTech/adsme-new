/** Fecha del PDF: `22 de octubre de 2026`. */
export function formatQuoteLongDate(date: Date): string {
  return date.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
}

/** Título del documento al imprimir, que el navegador usa como nombre del PDF. */
export function buildQuotePdfTitle(client: string): string {
  return `Cotizacion ${client} x AdsME`.replace(/[\\/:*?"<>|]/g, "");
}

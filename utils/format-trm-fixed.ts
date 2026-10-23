/** TRM con dos decimales fijos, sin símbolo: `3.156,32`. */
export function formatTrmFixed(value: number): string {
  return value.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

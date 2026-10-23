/** Referencia del PDF con la hora local de generación: `AME-20261022-1530`. */
export function buildQuoteReferenceCode(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  const day = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  return `AME-${day}-${pad(date.getHours())}${pad(date.getMinutes())}`;
}

import { DAY_IN_MS } from "@/constants/campaign-daily.constants";

/**
 * Desplaza una fecha ISO (`YYYY-MM-DD`) el número de días indicado. Opera en
 * UTC a propósito: una fecha sin hora no tiene zona, y convertirla a `Date`
 * local haría saltar de día según dónde corra el servidor.
 */
export function shiftIsoDate(date: string, days: number): string {
  const shifted = new Date(Date.parse(`${date}T00:00:00Z`) + days * DAY_IN_MS);

  return shifted.toISOString().slice(0, 10);
}

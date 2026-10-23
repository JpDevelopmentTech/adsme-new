import { shiftMonth } from "@/utils/shift-month";

/** Meses `AAAA-MM` de `from` a `to`, ambos incluidos. */
export function listMonthsBetween(from: string, to: string): string[] {
  const months: string[] = [];
  for (let month = from; month <= to; month = shiftMonth(month, 1)) months.push(month);
  return months;
}

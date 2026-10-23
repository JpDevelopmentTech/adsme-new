/** Suma (o resta) meses a un `AAAA-MM`, en el mismo formato. */
export function shiftMonth(month: string, delta: number): string {
  const [year, index] = month.split("-").map(Number);
  const total = year * 12 + (index - 1) + delta;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}`;
}

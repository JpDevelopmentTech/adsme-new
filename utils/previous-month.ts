/** Mes anterior de `AAAA-MM`, en el mismo formato. */
export function previousMonth(month: string): string {
  const [year, index] = month.split("-").map(Number);
  return index === 1 ? `${year - 1}-12` : `${year}-${String(index - 1).padStart(2, "0")}`;
}

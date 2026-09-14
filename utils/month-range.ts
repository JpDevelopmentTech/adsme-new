/** Fecha ISO (`YYYY-MM-DD`) sin pasar por `Date`, para no arrastrar la zona horaria. */
function toIso(year: number, monthIndex: number, day: number): string {
  const month = String(monthIndex + 1).padStart(2, "0");

  return `${year}-${month}-${String(day).padStart(2, "0")}`;
}

/** Días naturales del mes al que pertenece la referencia. */
export function daysInMonth(reference: Date): number {
  return new Date(
    reference.getFullYear(),
    reference.getMonth() + 1,
    0,
  ).getDate();
}

export function startOfMonth(reference: Date): string {
  return toIso(reference.getFullYear(), reference.getMonth(), 1);
}

export function endOfMonth(reference: Date): string {
  return toIso(
    reference.getFullYear(),
    reference.getMonth(),
    daysInMonth(reference),
  );
}

/** Día concreto del mes de referencia, en formato ISO. */
export function dayOfMonth(reference: Date, day: number): string {
  return toIso(reference.getFullYear(), reference.getMonth(), day);
}

/** Fecha local de la referencia en formato ISO, sin desfase por zona horaria. */
export function toIsoDate(reference: Date): string {
  return dayOfMonth(reference, reference.getDate());
}

/** Días que cubre un período ISO, contando ambos extremos y nunca menos de uno. */
export function daysBetween(startsOn: string, endsOn: string): number {
  const elapsed = Date.parse(`${endsOn}T00:00:00Z`) - Date.parse(`${startsOn}T00:00:00Z`);

  return Math.max(1, Math.round(elapsed / 86_400_000) + 1);
}

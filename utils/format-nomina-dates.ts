const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

/** Partes numéricas de una fecha ISO (`AAAA-MM-DD` o `AAAA-MM`). */
function parts(iso: string): [number, number, number] {
  const [year, month, day] = iso.split("-").map(Number);
  return [year, month, day || 1];
}

/** «Octubre 14, 2026». */
export function formatLongDate(iso: string): string {
  const [year, month, day] = parts(iso);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

/** «14 Oct 2026». */
export function formatShortDate(iso: string): string {
  const [year, month, day] = parts(iso);
  return `${day} ${MONTHS[month - 1].slice(0, 3)} ${year}`;
}

/** «Octubre 2026». */
export function formatMonthLong(iso: string): string {
  const [year, month] = parts(iso);
  return `${MONTHS[month - 1]} ${year}`;
}

/** «Oct 2026». */
export function formatMonthShort(iso: string): string {
  const [year, month] = parts(iso);
  return `${MONTHS[month - 1].slice(0, 3)} ${year}`;
}

/** «Oct 26», para los ejes mensuales. */
export function formatMonthTick(iso: string): string {
  const [year, month] = parts(iso);
  return `${MONTHS[month - 1].slice(0, 3)} ${String(year).slice(2)}`;
}

/** «14 Oct», para los ejes diarios. */
export function formatDayTick(iso: string): string {
  const [, month, day] = parts(iso);
  return `${day} ${MONTHS[month - 1].slice(0, 3)}`;
}

/** Mes siguiente de `AAAA-MM`, en el mismo formato. */
export function nextMonth(month: string): string {
  const [year, index] = parts(month);
  return index === 12 ? `${year + 1}-01` : `${year}-${String(index + 1).padStart(2, "0")}`;
}

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * Distancia en palabras, como el «hace 12 min» del diseño. Recibe el momento de
 * referencia en vez de leer el reloj, para que servidor y cliente coincidan.
 */
export function formatRelativeTime(isoDate: string, nowIso: string): string {
  const elapsed = new Date(nowIso).getTime() - new Date(isoDate).getTime();

  if (elapsed < MINUTE) return "hace un momento";
  if (elapsed < HOUR) return `hace ${Math.floor(elapsed / MINUTE)} min`;
  if (elapsed < DAY) {
    const hours = Math.floor(elapsed / HOUR);
    return `hace ${hours} h`;
  }

  const days = Math.floor(elapsed / DAY);
  return days === 1 ? "hace 1 día" : `hace ${days} días`;
}

/**
 * Fecha de `now` en la zona indicada, como `YYYY-MM-DD`. La TRM y el cron
 * hablan de días de Colombia; el servidor de Vercel corre en UTC y, a partir de
 * las 7 p. m. de Bogotá, su «hoy» ya es mañana.
 */
export function todayInTimeZone(now: Date, timeZone: string): string {
  // `en-CA` formatea las fechas como `YYYY-MM-DD`.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

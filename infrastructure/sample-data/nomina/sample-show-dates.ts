import { SAMPLE_CURRENT_MONTH, SAMPLE_TODAY } from "@/infrastructure/sample-data/nomina/sample-calendar.constants";

/** Fechas exactas de los shows de octubre de Valeria Gómez, como en el diseño. */
const DESIGNED_DATES: Record<string, { event: number; income: number }[]> = {
  "valeria-gomez/2026-10": [
    { event: 1, income: 1 }, { event: 2, income: 3 }, { event: 4, income: 4 }, { event: 5, income: 6 },
    { event: 7, income: 8 }, { event: 9, income: 10 }, { event: 10, income: 10 }, { event: 12, income: 13 },
  ],
};

/** Días del mes de una fecha `AAAA-MM`. */
function daysIn(month: string): number {
  const [year, monthIndex] = month.split("-").map(Number);
  return new Date(year, monthIndex, 0).getDate();
}

/**
 * Días de evento e ingreso de los `count` shows de un mes, repartidos a lo largo
 * del mes. En el mes en curso solo llegan hasta ayer, porque hoy aún no pasa.
 */
export function sampleShowDates(artistId: string, month: string, count: number): { event: number; income: number }[] {
  const designed = DESIGNED_DATES[`${artistId}/${month}`];
  if (designed && designed.length === count) return designed;

  const lastDay = month === SAMPLE_CURRENT_MONTH ? SAMPLE_TODAY - 1 : daysIn(month) - 1;

  return Array.from({ length: count }, (_, index) => {
    const event = Math.max(1, Math.round(((index + 1) * lastDay) / (count + 1)));
    return { event, income: Math.min(lastDay, event + (index % 2)) };
  });
}

/** Fecha ISO `AAAA-MM-DD` de un día del mes. */
export function isoDay(month: string, day: number): string {
  return `${month}-${String(day).padStart(2, "0")}`;
}

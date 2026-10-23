import type { NominaCalendar } from "@/infrastructure/sample-data/nomina/sample-nomina.types";

/** Meses del periodo por defecto: el mes en curso y los 5 anteriores. */
const PERIOD_MONTHS = 6;

/** Fecha de hoy en Bogotá, para que el mes no cambie según el servidor. */
function bogotaParts(now: Date): { year: number; month: number; day: number } {
  const [year, month, day] = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(now).split("-").map(Number);
  return { year, month, day };
}

/** Calendario real: los últimos 6 meses hasta hoy, sin periodo anterior con qué comparar. */
export function buildNominaCalendar(now: Date): NominaCalendar {
  const { year, month, day } = bogotaParts(now);
  const months = Array.from({ length: PERIOD_MONTHS }, (_, index) => {
    const date = new Date(Date.UTC(year, month - PERIOD_MONTHS + index, 1));
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
  });

  return {
    months,
    currentMonth: months[months.length - 1],
    today: day,
    daysInCurrentMonth: new Date(Date.UTC(year, month, 0)).getUTCDate(),
    previousTotals: null,
  };
}

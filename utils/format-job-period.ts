/** Abreviaturas de mes usadas en la columna PERÍODO del diseño. */
export const SHORT_MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

/**
 * Formatea la ventana de la pauta como en `B5`: dentro del mismo mes se escribe
 * una sola vez (`01–31 Ago`); si cambia, se repite en ambos (`10 Ago–10 Sep`).
 */
export function formatJobPeriod(startsOn: string, endsOn: string): string {
  const start = parseIsoDate(startsOn);
  const end = parseIsoDate(endsOn);

  if (!start || !end) return "";

  const startDay = pad(start.day);
  const endDay = pad(end.day);

  if (start.month === end.month && start.year === end.year) {
    return `${startDay}–${endDay} ${SHORT_MONTHS[start.month]}`;
  }

  return `${startDay} ${SHORT_MONTHS[start.month]}–${endDay} ${SHORT_MONTHS[end.month]}`;
}

function parseIsoDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return null;

  return { year, month: month - 1, day };
}

function pad(day: number): string {
  return String(day).padStart(2, "0");
}

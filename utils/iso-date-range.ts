import { shiftIsoDate } from "@/utils/shift-iso-date";

/** Tope de días que se enumeran, para que un período absurdo no cuelgue el render. */
const MAX_DAYS = 800;

/** Todas las fechas ISO del rango, extremos incluidos y en orden ascendente. */
export function isoDateRange(from: string, to: string): string[] {
  const dates: string[] = [];

  for (let date = from; date <= to && dates.length < MAX_DAYS; ) {
    dates.push(date);
    date = shiftIsoDate(date, 1);
  }

  return dates;
}

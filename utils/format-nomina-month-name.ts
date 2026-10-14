import { formatMonthLong } from "@/utils/format-nomina-dates";

/** Solo el nombre del mes de `AAAA-MM`: «Octubre». */
export function formatNominaMonthName(month: string): string {
  return formatMonthLong(month).split(" ")[0];
}

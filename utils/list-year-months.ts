import type { NominaChoice } from "@/types/nomina-modales.types";
import { formatMonthLong } from "@/utils/format-nomina-dates";

/** Meses de los años dados como opciones `AAAA-MM` → «Octubre 2026», sin años repetidos. */
export function listYearMonths(years: number[]): NominaChoice<string>[] {
  const unique = [...new Set(years.filter(Number.isFinite))].sort();

  return unique.flatMap((year) =>
    Array.from({ length: 12 }, (_, index) => {
      const value = `${year}-${String(index + 1).padStart(2, "0")}`;
      return { value, label: formatMonthLong(value) };
    }),
  );
}

import { formatMonthLong } from "@/utils/format-nomina-dates";

/** «Mayo 2026 – Octubre 2026», o un solo mes si el periodo empieza y acaba en él. */
export function formatPeriodRange(fromMonth: string, toMonth: string): string {
  const from = formatMonthLong(fromMonth);
  return fromMonth === toMonth ? from : `${from} – ${formatMonthLong(toMonth)}`;
}

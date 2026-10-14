import { formatPercent } from "@/utils/format-percent";

/** Porcentaje con coma, o «—» cuando no hay base para calcularlo. */
export function formatOptionalPercent(value: number | null): string {
  return value === null ? "—" : formatPercent(value);
}

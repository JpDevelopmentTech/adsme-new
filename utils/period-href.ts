import { PERIOD_PARAMS } from "@/constants/period-filter.constants";
import type { DateRange } from "@/types/period-filter.types";
import type { RawSearchParams } from "@/utils/parse-client-list-query";

/**
 * Enlace a `basePath` con el período en la URL, conservando el resto de
 * parámetros (como la plataforma elegida en el reporte). Con `null` quita las
 * fechas y vuelve al período por defecto.
 */
export function periodHref(
  basePath: string,
  params: RawSearchParams,
  period: DateRange | null,
): string {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (key === PERIOD_PARAMS.from || key === PERIOD_PARAMS.to) continue;
    if (typeof value === "string") query.set(key, value);
  }
  if (period) {
    query.set(PERIOD_PARAMS.from, period.from);
    query.set(PERIOD_PARAMS.to, period.to);
  }

  const search = query.toString();

  return search ? `${basePath}?${search}` : basePath;
}

import { PERIOD_FORM_COPY } from "@/constants/period-filter.constants";
import type { PeriodLimits } from "@/types/period-filter.types";
import { formatShortDate } from "@/utils/format-job-period";
import { daysBetween } from "@/utils/month-range";

/**
 * Comprueba que dos fechas ISO válidas formen un período admisible y devuelve
 * por qué no, o `null` si lo forman. La comparten el formulario, para avisar
 * antes de enviar, y el validador del servidor, que es quien decide.
 */
export function getPeriodRangeError(
  from: string,
  to: string,
  limits: PeriodLimits,
): string | null {
  if (from > to) return PERIOD_FORM_COPY.invalidOrder;

  const { min, max, maxDays } = limits;
  if ((min && from < min) || (max && to > max)) {
    return PERIOD_FORM_COPY.outOfBounds(
      min ? formatShortDate(min) : "",
      max ? formatShortDate(max) : "",
    );
  }
  if (maxDays && daysBetween(from, to) > maxDays) {
    return PERIOD_FORM_COPY.tooLong(maxDays);
  }

  return null;
}

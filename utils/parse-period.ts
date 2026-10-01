import { PERIOD_FORM_COPY, PERIOD_PARAMS } from "@/constants/period-filter.constants";
import type { DateRange, ParsedPeriod, PeriodLimits } from "@/types/period-filter.types";
import type { RawSearchParams } from "@/utils/parse-client-list-query";
import { createPeriodSchema } from "@/validators/period.validators";

/**
 * Lee un período de la URL. Sin fechas devuelve el período por defecto; con
 * fechas que no valen también, pero con el motivo, para decirlo en pantalla en
 * lugar de ignorar en silencio lo que el usuario pidió.
 */
export function parsePeriod(
  params: RawSearchParams,
  fallback: DateRange,
  limits: PeriodLimits,
  describeError: (reason: string) => string,
): ParsedPeriod {
  const from = params[PERIOD_PARAMS.from];
  const to = params[PERIOD_PARAMS.to];

  if (from === undefined && to === undefined) {
    return { period: fallback, isCustom: false, error: null };
  }

  const result = createPeriodSchema(limits).safeParse({
    [PERIOD_PARAMS.from]: from,
    [PERIOD_PARAMS.to]: to,
  });

  if (!result.success) {
    const reason = result.error.issues[0]?.message ?? PERIOD_FORM_COPY.invalidDate;

    return { period: fallback, isCustom: false, error: describeError(reason) };
  }

  return {
    period: { from: result.data[PERIOD_PARAMS.from], to: result.data[PERIOD_PARAMS.to] },
    isCustom: true,
    error: null,
  };
}

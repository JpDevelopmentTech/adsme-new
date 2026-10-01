import { z } from "zod";
import { PERIOD_FORM_COPY, PERIOD_PARAMS } from "@/constants/period-filter.constants";
import type { PeriodLimits } from "@/types/period-filter.types";
import { getPeriodRangeError } from "@/utils/get-period-range-error";

const isoDate = z.iso.date({ error: PERIOD_FORM_COPY.invalidDate });

/**
 * Período tal como llega en la URL: dos fechas reales en `YYYY-MM-DD`, en
 * orden y dentro de los límites de quien lo usa (días máximos en el dashboard,
 * el período del lanzamiento en el reporte).
 */
export function createPeriodSchema(limits: PeriodLimits) {
  return z
    .object({ [PERIOD_PARAMS.from]: isoDate, [PERIOD_PARAMS.to]: isoDate })
    .superRefine((value, context) => {
      const error = getPeriodRangeError(
        value[PERIOD_PARAMS.from],
        value[PERIOD_PARAMS.to],
        limits,
      );

      if (error) context.addIssue({ code: "custom", message: error });
    });
}

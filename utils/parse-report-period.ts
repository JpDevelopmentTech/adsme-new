import { REPORT_PERIOD_COPY } from "@/constants/report-period.constants";
import type { ReportJob } from "@/domain/entities/report-job";
import type { ParsedPeriod } from "@/types/period-filter.types";
import type { RawSearchParams } from "@/utils/parse-client-list-query";
import { parsePeriod } from "@/utils/parse-period";

/**
 * Período del reporte según la URL. Solo admite días del lanzamiento: el
 * enlace autoriza a ver esa pauta y nada fuera de ella. Sin fechas, o con
 * fechas que no valen, se muestra el lanzamiento entero.
 */
export function parseReportPeriod(params: RawSearchParams, job: ReportJob): ParsedPeriod {
  return parsePeriod(
    params,
    { from: job.startsOn, to: job.endsOn },
    { min: job.startsOn, max: job.endsOn },
    REPORT_PERIOD_COPY.invalidLink,
  );
}

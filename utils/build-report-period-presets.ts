import {
  REPORT_PERIOD_COPY,
  REPORT_PERIOD_WINDOWS,
} from "@/constants/report-period.constants";
import type { ReportJob } from "@/domain/entities/report-job";
import type { PeriodPresetOption } from "@/types/period-filter.types";
import { daysBetween } from "@/utils/month-range";
import type { RawSearchParams } from "@/utils/parse-client-list-query";
import { periodHref } from "@/utils/period-href";
import { shiftIsoDate } from "@/utils/shift-iso-date";

/**
 * Atajos del reporte: el lanzamiento entero, que enlaza sin fechas y sirve de
 * reinicio, y las últimas semanas con entrega. Una ventana solo se ofrece si es
 * más corta que lo que lleva el lanzamiento; si no, sería el lanzamiento entero
 * con otro nombre. Antes de que empiece no hay últimos días que mirar.
 */
export function buildReportPeriodPresets(
  job: ReportJob,
  today: string,
  basePath: string,
  params: RawSearchParams,
): PeriodPresetOption[] {
  const whole: PeriodPresetOption = {
    key: "whole",
    label: REPORT_PERIOD_COPY.wholeLaunch,
    period: { from: job.startsOn, to: job.endsOn },
    href: periodHref(basePath, params, null),
  };
  if (today < job.startsOn) return [whole];

  const end = today < job.endsOn ? today : job.endsOn;
  const elapsed = daysBetween(job.startsOn, end);

  const windows = REPORT_PERIOD_WINDOWS.filter((days) => days < elapsed).map((days) => {
    const period = { from: shiftIsoDate(end, -(days - 1)), to: end };

    return {
      key: `last-${days}`,
      label: REPORT_PERIOD_COPY.lastDays(days),
      period,
      href: periodHref(basePath, params, period),
    };
  });

  return [whole, ...windows];
}

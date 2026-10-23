import { REPORT_SPEND_COPY } from "@/constants/report-spend.constants";
import { REPORT_SUMMARY_COPY } from "@/constants/report.constants";
import type { ReportSpend } from "@/domain/entities/report-spend";
import type { SpendSummary } from "@/types/report.types";
import { formatPercent, share } from "@/utils/format-compact-number";
import { formatReportSpend } from "@/utils/format-report-spend";
import { reportSpendCop } from "@/utils/report-spend-cop";

/**
 * Lo que enseña la tarjeta de lo invertido. El porcentaje del presupuesto solo
 * se da si todo el gasto está en pesos (o convertido con TRM): el presupuesto
 * es en pesos, y compararlo con dólares sin convertir daría una cifra falsa.
 * En ese caso la nota dice qué quedó aparte.
 */
export function buildSpendSummary(
  spend: ReportSpend,
  investment: number,
): SpendSummary {
  const display = formatReportSpend(spend);
  const isComparable = Object.keys(spend.pending).length === 0;

  const note = isComparable
    ? REPORT_SUMMARY_COPY.budget(
        formatPercent(share(reportSpendCop(spend), investment)),
      )
    : display.extra
      ? REPORT_SPEND_COPY.extra(display.extra)
      : REPORT_SPEND_COPY.unconverted;

  return { value: display.value, note, isComparable, detail: display.trmLine };
}

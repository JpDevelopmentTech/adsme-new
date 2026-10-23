import type { ReportSpend } from "@/domain/entities/report-spend";
import type { MoneyFormatOptions } from "@/types/money.types";
import { SPEND_JOINER } from "@/constants/currency.constants";
import { formatReportSpend } from "@/utils/format-report-spend";

/**
 * El gasto del reporte en una sola línea, para pies y textos corridos: el total
 * y, si queda algo sin convertir, detrás («$2.599.547 + US$450»).
 */
export function formatReportSpendLine(
  spend: ReportSpend,
  options: MoneyFormatOptions = {},
): string {
  const { value, extra } = formatReportSpend(spend, options);

  return extra ? `${value}${SPEND_JOINER}${extra}` : value;
}

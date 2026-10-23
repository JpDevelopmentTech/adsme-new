import type { ReportSpend } from "@/domain/entities/report-spend";

/** Si hubo gasto en alguna moneda; una plataforma sin gasto no lo enseña. */
export function hasReportSpend(spend: ReportSpend): boolean {
  return (
    spend.nativeCop > 0 ||
    spend.conversions.length > 0 ||
    Object.keys(spend.pending).length > 0
  );
}

import type { ReportFooterProps } from "@/types/report.types";

/** Pie común de las dos vistas del reporte. */
export function ReportFooter({ label }: ReportFooterProps) {
  return (
    <p className="py-4 text-center text-[11.5px] text-text-muted">{label}</p>
  );
}

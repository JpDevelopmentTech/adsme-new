import { RefreshCw } from "lucide-react";
import type { ReportFooterProps } from "@/types/report.types";

/** Pie común de las dos vistas del reporte. */
export function ReportFooter({ label }: ReportFooterProps) {
  return (
    <footer className="flex items-center justify-center gap-2 pt-2 text-xs text-text-muted">
      <RefreshCw size={13} aria-hidden />
      {label}
    </footer>
  );
}

import { BrandWordmark } from "@/presentation/components/brand/brand-wordmark";
import type { ReportFooterProps } from "@/types/report.types";

/** Pie común de las dos vistas del reporte: la marca atenuada y de dónde salen los datos. */
export function ReportFooter({ label }: ReportFooterProps) {
  return (
    <footer className="flex flex-col items-center gap-3 pt-4 text-center">
      <BrandWordmark className="h-5 opacity-60" />
      <p className="text-xs font-normal text-text-muted">{label}</p>
    </footer>
  );
}

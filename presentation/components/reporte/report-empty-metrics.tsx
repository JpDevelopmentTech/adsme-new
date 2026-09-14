import { ChartNoAxesColumn } from "lucide-react";
import { REPORT_COPY } from "@/constants/report.constants";

/** Lanzamiento sin campañas vinculadas todavía: el reporte existe, los datos no. */
export function ReportEmptyMetrics() {
  return (
    <section className="flex flex-col items-center gap-3 rounded-card border border-dashed border-border bg-card px-6 py-14 text-center">
      <span
        aria-hidden
        className="grid size-12 place-items-center rounded-md bg-brand-violet/12"
      >
        <ChartNoAxesColumn size={22} className="text-brand-violet" />
      </span>

      <h2 className="font-display text-lg font-semibold text-text-primary">
        {REPORT_COPY.noMetricsTitle}
      </h2>
      <p className="max-w-[440px] text-[13px] leading-[1.5] text-text-secondary">
        {REPORT_COPY.noMetricsBody}
      </p>
    </section>
  );
}

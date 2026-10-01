import { ChartNoAxesColumn } from "lucide-react";
import { REPORT_COPY } from "@/constants/report.constants";

/** Lanzamiento sin campañas vinculadas todavía: el reporte existe, los datos no. */
export function ReportEmptyMetrics() {
  return (
    <section className="glass-thick flex flex-col items-center gap-4 rounded-window px-9 py-10 text-center">
      <span aria-hidden className="grid size-14 place-items-center rounded-[18px] border border-white/20">
        <ChartNoAxesColumn size={24} strokeWidth={1.5} className="text-text-primary" />
      </span>

      <h2 className="text-[22px] font-extralight text-text-primary">{REPORT_COPY.noMetricsTitle}</h2>
      <p className="max-w-[460px] text-sm leading-[1.55] font-light text-text-secondary">
        {REPORT_COPY.noMetricsBody}
      </p>
    </section>
  );
}

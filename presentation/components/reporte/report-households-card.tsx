import { Home } from "lucide-react";
import { REPORT_COPY } from "@/constants/report.constants";
import { ReportBarList } from "@/presentation/components/reporte/report-bar-list";
import { SampleDataBadge } from "@/presentation/components/reporte/sample-data-badge";
import type { ReportHouseholdsCardProps } from "@/types/report.types";

/** Contexto del hogar de la audiencia, tal como lo agrupa la plataforma. */
export function ReportHouseholdsCard({ households }: ReportHouseholdsCardProps) {
  return (
    <section className="flex flex-col gap-5 rounded-card border border-border bg-card p-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-text-primary">
          <Home size={17} className="text-data-lime" aria-hidden />
          {REPORT_COPY.householdsTitle}
        </h2>
        <SampleDataBadge />
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        <ReportBarList
          title={REPORT_COPY.householdsIncome}
          shares={households.income}
          color="var(--color-data-lime)"
        />
        <ReportBarList
          title={REPORT_COPY.householdsParental}
          shares={households.parental}
          color="var(--color-data-cyan)"
        />
      </div>
    </section>
  );
}

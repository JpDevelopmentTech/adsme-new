import { Users } from "lucide-react";
import { REPORT_COPY } from "@/constants/report.constants";
import { ReportBarList } from "@/presentation/components/reporte/report-bar-list";
import { SampleDataBadge } from "@/presentation/components/reporte/sample-data-badge";
import type { ReportAudienceCardProps } from "@/types/report.types";

/** Quién escuchó el lanzamiento: sexo y franja de edad. */
export function ReportAudienceCard({ audience }: ReportAudienceCardProps) {
  return (
    <section className="flex flex-col gap-5 rounded-card border border-border bg-card p-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-text-primary">
          <Users size={17} className="text-brand-magenta" aria-hidden />
          {REPORT_COPY.audienceTitle}
        </h2>
        <SampleDataBadge />
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        <ReportBarList
          title={REPORT_COPY.audienceGender}
          shares={audience.gender}
          color="var(--color-brand-magenta)"
        />
        <ReportBarList
          title={REPORT_COPY.audienceAge}
          shares={audience.age}
          color="var(--color-brand-violet)"
        />
      </div>
    </section>
  );
}

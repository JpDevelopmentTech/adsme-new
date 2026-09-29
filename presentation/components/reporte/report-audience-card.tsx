import { Users } from "lucide-react";
import { REPORT_COPY } from "@/constants/report.constants";
import { ReportBarList } from "@/presentation/components/reporte/report-bar-list";
import type { ReportAudienceCardProps } from "@/types/report.types";
import { cn } from "@/utils/cn";

/**
 * Quién escuchó el lanzamiento: sexo y franja de edad. Si el gestor ocultó uno
 * de los dos, el otro ocupa la tarjeta entera en vez de dejar media vacía.
 */
export function ReportAudienceCard({ audience }: ReportAudienceCardProps) {
  const hasBoth = audience.gender.length > 0 && audience.age.length > 0;

  return (
    <section className="flex flex-col gap-5 rounded-card border border-border bg-card p-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-text-primary">
          <Users size={17} className="text-brand-magenta" aria-hidden />
          {REPORT_COPY.audienceTitle}
        </h2>
      </header>

      <div className={cn("grid gap-6", hasBoth && "sm:grid-cols-2")}>
        {audience.gender.length > 0 ? (
          <ReportBarList
            title={REPORT_COPY.audienceGender}
            shares={audience.gender}
            color="var(--color-brand-magenta)"
          />
        ) : null}
        {audience.age.length > 0 ? (
          <ReportBarList
            title={REPORT_COPY.audienceAge}
            shares={audience.age}
            color="var(--color-brand-violet)"
          />
        ) : null}
      </div>
    </section>
  );
}

import { MapPin } from "lucide-react";
import { REPORT_COPY } from "@/constants/report.constants";
import { ReportBarList } from "@/presentation/components/reporte/report-bar-list";
import type { ReportTerritoriesCardProps } from "@/types/report.types";

/**
 * De dónde vino la gente que vio la pauta, por región. Es región y no ciudad
 * porque es la granularidad que las tres plataformas comparten: Google llega a
 * ciudad, pero Meta se queda en región y TikTok en provincia, y mezclarlas
 * pondría en la misma barra cosas de distinto tamaño.
 */
export function ReportTerritoriesCard({
  territories,
}: ReportTerritoriesCardProps) {
  return (
    <section className="flex flex-col gap-5 rounded-card border border-border bg-card p-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-text-primary">
          <MapPin size={17} className="text-data-cyan" aria-hidden />
          {REPORT_COPY.territoriesTitle}
        </h2>
      </header>

      <ReportBarList
        title={REPORT_COPY.territoriesSubtitle}
        shares={territories.map((territory) => ({
          label: territory.name,
          percent: territory.percent,
        }))}
        color="var(--color-data-cyan)"
      />
    </section>
  );
}

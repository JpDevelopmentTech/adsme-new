import { MapPin } from "lucide-react";
import { REPORT_COPY } from "@/constants/report.constants";
import { ReportBarList } from "@/presentation/components/reporte/report-bar-list";
import { ReportCardHeader } from "@/presentation/components/reporte/report-card-header";
import type { ReportTerritoriesCardProps } from "@/types/report.types";

/**
 * De dónde vino la gente que vio la pauta, por región. Es región y no ciudad
 * porque es la granularidad que las tres plataformas comparten.
 */
export function ReportTerritoriesCard({ territories }: ReportTerritoriesCardProps) {
  return (
    <section className="glass-thick flex flex-col gap-[22px] rounded-window p-[26px]">
      <ReportCardHeader icon={MapPin} title={REPORT_COPY.territoriesTitle} />
      <ReportBarList
        title={REPORT_COPY.territoriesSubtitle}
        shares={territories.map((territory) => ({ label: territory.name, percent: territory.percent }))}
      />
    </section>
  );
}

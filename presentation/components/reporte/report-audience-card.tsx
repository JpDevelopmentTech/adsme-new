import { Users } from "lucide-react";
import { REPORT_AGE_BAR_COLOR, REPORT_COPY } from "@/constants/report.constants";
import { ReportBarList } from "@/presentation/components/reporte/report-bar-list";
import { ReportCardHeader } from "@/presentation/components/reporte/report-card-header";
import { ReportGenderSplit } from "@/presentation/components/reporte/report-gender-split";
import type { ReportAudienceCardProps } from "@/types/report.types";

/** Quién vio el lanzamiento: sexo en una barra partida y franjas de edad. */
export function ReportAudienceCard({ audience }: ReportAudienceCardProps) {
  return (
    <section className="glass-thick flex flex-col gap-[22px] rounded-window p-[26px]">
      <ReportCardHeader icon={Users} title={REPORT_COPY.audienceTitle} />
      {audience.gender.length > 0 ? <ReportGenderSplit shares={audience.gender} /> : null}
      {audience.age.length > 0 ? (
        <ReportBarList title={REPORT_COPY.audienceAge} shares={audience.age} color={REPORT_AGE_BAR_COLOR} />
      ) : null}
    </section>
  );
}

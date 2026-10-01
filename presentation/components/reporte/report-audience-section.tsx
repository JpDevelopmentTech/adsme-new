import { REPORT_COPY } from "@/constants/report.constants";
import { REPORT_PERIOD_COPY } from "@/constants/report-period.constants";
import { ReportAudienceCard } from "@/presentation/components/reporte/report-audience-card";
import { ReportTerritoriesCard } from "@/presentation/components/reporte/report-territories-card";
import type { ReportAudienceSectionProps } from "@/types/report.types";
import { cn } from "@/utils/cn";

/**
 * «Tu público»: regiones y audiencia en dos tarjetas sin panel envolvente. La
 * sección entera desaparece si ninguna plataforma entregó reparto. Con un
 * período a medida lo avisa: las plataformas no entregan este reparto por día,
 * así que sigue siendo el de toda la campaña.
 */
export function ReportAudienceSection({ audience, territories, isCustomPeriod }: ReportAudienceSectionProps) {
  if (territories.length === 0 && !audience) return null;

  const hasBoth = territories.length > 0 && audience !== null;

  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-1 px-1 pt-3">
        <h2 className="text-[28px] leading-tight font-extralight text-text-primary">{REPORT_COPY.audienceSectionTitle}</h2>
        <p className="text-sm font-light text-text-secondary">{REPORT_COPY.audienceSectionSubtitle}</p>
        {isCustomPeriod ? (
          <p className="pt-1 text-xs font-normal text-lilac">{REPORT_PERIOD_COPY.wholeCampaignNote}</p>
        ) : null}
      </header>

      <div className={cn("grid items-start gap-4", hasBoth && "lg:grid-cols-2")}>
        {territories.length > 0 ? <ReportTerritoriesCard territories={territories} /> : null}
        {audience ? <ReportAudienceCard audience={audience} /> : null}
      </div>
    </section>
  );
}

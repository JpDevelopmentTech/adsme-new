import { JOB_DETAIL_COPY } from "@/constants/job-detail.constants";
import { GrowthLegend } from "@/presentation/components/reporte/growth-legend";
import { ReportGrowthChart } from "@/presentation/components/reporte/report-growth-chart";
import { JobEvolutionEmpty } from "@/presentation/components/trabajo-detalle/job-evolution-empty";
import type { JobEvolutionCardProps } from "@/types/job-detail.types";

/**
 * Evolución reciente del lanzamiento: reproducciones por día de cada
 * plataforma, con la misma gráfica que ve el cliente en su reporte para que
 * ambos lean el lanzamiento igual.
 */
export function JobEvolutionCard({ growth, period }: JobEvolutionCardProps) {
  const subtitle = JOB_DETAIL_COPY.evolutionSubtitle(period);

  return (
    <section className="glass-thick flex flex-col gap-[18px] rounded-card p-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="text-[17px] font-light text-text-primary">{JOB_DETAIL_COPY.evolutionTitle}</h2>
          <p className="text-xs font-normal text-text-muted">{subtitle}</p>
        </div>

        {growth ? <GrowthLegend totals={growth.totals} /> : null}
      </header>

      {growth ? <ReportGrowthChart growth={growth} label={subtitle} /> : <JobEvolutionEmpty />}
    </section>
  );
}

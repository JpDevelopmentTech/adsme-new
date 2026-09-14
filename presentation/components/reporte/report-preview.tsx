import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import {
  REPORT_COPY,
  SHOW_SAMPLE_REPORT_SECTIONS,
} from "@/constants/report.constants";
import {
  SAMPLE_AUDIENCE,
  SAMPLE_HOUSEHOLDS,
  SAMPLE_KEYWORDS,
  SAMPLE_TERRITORIES,
} from "@/constants/report-sample.constants";
import { ReportAdPreview } from "@/presentation/components/reporte/report-ad-preview";
import { ReportAudienceCard } from "@/presentation/components/reporte/report-audience-card";
import { ReportHouseholdsCard } from "@/presentation/components/reporte/report-households-card";
import { ReportKeywordsCard } from "@/presentation/components/reporte/report-keywords-card";
import { ReportTerritoriesCard } from "@/presentation/components/reporte/report-territories-card";
import { ReportTrendSection } from "@/presentation/components/reporte/report-trend-section";
import { ReportEmptyMetrics } from "@/presentation/components/reporte/report-empty-metrics";
import { ReportFooter } from "@/presentation/components/reporte/report-footer";
import { ReportHero } from "@/presentation/components/reporte/report-hero";
import { ReportMetricGrid } from "@/presentation/components/reporte/report-metric-grid";
import { ReportPlatformSection } from "@/presentation/components/reporte/report-platform-section";
import { ReportSplitCard } from "@/presentation/components/reporte/report-split-card";
import { ReportTopbar } from "@/presentation/components/reporte/report-topbar";
import type { ReportPreviewProps } from "@/types/report.types";
import { buildLaunchHeadline } from "@/utils/build-report-headline";
import { buildCrossMetrics } from "@/utils/build-report-metrics";
import { formatJobPeriod } from "@/utils/format-job-period";
import { toIsoDate } from "@/utils/month-range";

/**
 * Reporte del lanzamiento (`C1`–`C4` del diseño). Las secciones por plataforma
 * se filtran con las pestañas de la cabecera; el resumen transversal siempre
 * refleja el lanzamiento completo, se esté filtrando o no.
 */
export function ReportPreview({
  job,
  totals,
  platforms,
  trends,
  activePlatform,
  reportUrl,
  basePath,
  artistHref,
  now,
}: ReportPreviewProps) {
  const visible = activePlatform
    ? platforms.filter((metrics) => metrics.platform === activePlatform)
    : platforms;

  const period = formatJobPeriod(job.startsOn, job.endsOn);

  return (
    <div className="flex min-h-dvh flex-col">
      <ReportTopbar
        subtitle={`${job.title} · ${job.clientName}`}
        platforms={platforms.map((metrics) => metrics.platform)}
        activePlatform={activePlatform}
        basePath={basePath}
        syncedAt={totals.syncedAt}
        now={now}
        reportUrl={reportUrl}
      />

      <main className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-7 px-6 py-8 lg:px-10">
        <ReportHero
          job={job}
          headline={buildLaunchHeadline(totals.reach, job, toIsoDate(new Date(now)))}
        />

        {platforms.length === 0 ? (
          <ReportEmptyMetrics />
        ) : (
          <>
            {/* «Resumen del lanzamiento · las tres plataformas juntas» */}
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-lg font-semibold text-text-primary">
                {REPORT_COPY.crossSummaryTitle}
              </h2>
              <ReportMetricGrid
                metrics={buildCrossMetrics(totals, job.investment)}
              />
              <ReportSplitCard platforms={platforms} />
            </div>

            {/* Cada plataforma: cabecera, sus KPIs y su curva, como en `C2`–`C4`.
                El creativo cuelga de YouTube, que es donde lo sitúa el diseño. */}
            {visible.map((metrics) => (
              <Fragment key={metrics.platform}>
                <ReportPlatformSection
                  metrics={metrics}
                  totalSpend={totals.spend}
                />

                <ReportTrendSection
                  platform={metrics.platform}
                  series={trends[metrics.platform]}
                  period={period}
                />

                {metrics.platform === "youtube" ? (
                  <ReportAdPreview job={job} />
                ) : null}
              </Fragment>
            ))}

            {SHOW_SAMPLE_REPORT_SECTIONS ? (
              <>
                {/* «Tu público · quién vio tus anuncios»: territorios a la
                    izquierda y audiencia a la derecha, como en el diseño. */}
                <div className="flex flex-col gap-5">
                  <h2 className="font-display text-lg font-semibold text-text-primary">
                    {REPORT_COPY.audienceSectionTitle}
                  </h2>

                  <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
                    <ReportTerritoriesCard territories={SAMPLE_TERRITORIES} />
                    <ReportAudienceCard audience={SAMPLE_AUDIENCE} />
                  </div>

                  <ReportHouseholdsCard households={SAMPLE_HOUSEHOLDS} />
                </div>

                <ReportKeywordsCard keywords={SAMPLE_KEYWORDS} />
              </>
            ) : null}
          </>
        )}

        <Link
          href={artistHref}
          className="flex items-center justify-center gap-2 text-[13px] font-semibold text-brand-violet transition-colors hover:text-brand-magenta"
        >
          {REPORT_COPY.artistLink(job.clientName)}
          <ArrowRight size={15} aria-hidden />
        </Link>

        <ReportFooter label={REPORT_COPY.footer} />
      </main>
    </div>
  );
}

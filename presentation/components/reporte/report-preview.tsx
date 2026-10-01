import { REPORT_COPY } from "@/constants/report.constants";
import type { ReportSection } from "@/domain/entities/report-section";
import { ReportAdPreview } from "@/presentation/components/reporte/report-ad-preview";
import { ReportArtistLink } from "@/presentation/components/reporte/report-artist-link";
import { ReportAudienceSection } from "@/presentation/components/reporte/report-audience-section";
import { ReportCpvPanel } from "@/presentation/components/reporte/report-cpv-panel";
import { ReportEmptyMetrics } from "@/presentation/components/reporte/report-empty-metrics";
import { ReportFooter } from "@/presentation/components/reporte/report-footer";
import { ReportGrowthPanel } from "@/presentation/components/reporte/report-growth-panel";
import { ReportHero } from "@/presentation/components/reporte/report-hero";
import { ReportPeriodBar } from "@/presentation/components/reporte/report-period-bar";
import { ReportPlatformDetails } from "@/presentation/components/reporte/report-platform-details";
import { ReportPlatformsPanel } from "@/presentation/components/reporte/report-platforms-panel";
import { ReportSummaryStrip } from "@/presentation/components/reporte/report-summary-strip";
import { ReportTopbar } from "@/presentation/components/reporte/report-topbar";
import { AmbientGlow } from "@/presentation/components/ui/ambient-glow";
import type { ReportPreviewProps } from "@/types/report.types";
import { formatJobPeriod } from "@/utils/format-job-period";
import { isReportSectionVisible } from "@/utils/is-report-section-visible";

/**
 * Reporte del lanzamiento. Se lee como una historia y no como un informe:
 * cuánta gente llegó, si eso es mucho, cómo fue creciendo, dónde te vieron —con
 * el detalle de cada plataforma— y qué se vio. El filtro de fechas va justo
 * debajo del titular, antes de las cifras que recorta.
 */
export function ReportPreview({
  job,
  headline,
  totals,
  platforms,
  growth,
  cpvComparison,
  audience,
  territories,
  activePlatform,
  period,
  reportUrl,
  basePath,
  params,
  artistHref,
  now,
}: ReportPreviewProps) {
  const periodLabel = formatJobPeriod(period.range.from, period.range.to);
  const isVisible = (section: ReportSection) => isReportSectionVisible(job.hiddenSections, section);
  const showSpend = isVisible("investment");

  return (
    <div className="relative isolate min-h-dvh overflow-x-hidden">
      <AmbientGlow imageUrl={job.coverUrl} />

      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-10 px-4 pt-7 pb-16 sm:px-8">
        <ReportTopbar
          subtitle={`${job.title} · ${job.clientName}`}
          syncedAt={totals.syncedAt}
          now={now}
          reportUrl={reportUrl}
        />

        <main className="flex flex-col gap-10">
          <ReportHero job={job} headline={headline} periodLabel={periodLabel} />

          {platforms.length === 0 ? (
            <ReportEmptyMetrics />
          ) : (
            <>
              <ReportPeriodBar
                period={period.range}
                presets={period.presets}
                limits={period.limits}
                error={period.error}
              />

              <ReportSummaryStrip totals={totals} investment={job.investment} hiddenSections={job.hiddenSections} />

              {growth ? <ReportGrowthPanel growth={growth} period={periodLabel} /> : null}

              {cpvComparison ? (
                <ReportCpvPanel comparison={cpvComparison} period={periodLabel} showSpend={showSpend} />
              ) : null}

              {isVisible("platforms") ? (
                <ReportPlatformsPanel
                  platforms={platforms}
                  activePlatform={activePlatform}
                  basePath={basePath}
                  params={params}
                  showSpend={showSpend}
                />
              ) : null}

              {isVisible("platformDetails") ? (
                <ReportPlatformDetails platforms={platforms} activePlatform={activePlatform} showSpend={showSpend} />
              ) : null}

              {isVisible("adPreview") ? <ReportAdPreview job={job} /> : null}

              <ReportAudienceSection audience={audience} territories={territories} isCustomPeriod={period.isCustom} />
            </>
          )}

          {isVisible("artistReport") ? <ReportArtistLink href={artistHref} artistName={job.clientName} /> : null}
        </main>

        <ReportFooter label={REPORT_COPY.footer} />
      </div>
    </div>
  );
}

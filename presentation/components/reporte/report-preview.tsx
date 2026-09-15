import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
import { ReportAudienceCard } from "@/presentation/components/reporte/report-audience-card";
import { ReportHouseholdsCard } from "@/presentation/components/reporte/report-households-card";
import { ReportKeywordsCard } from "@/presentation/components/reporte/report-keywords-card";
import { ReportTerritoriesCard } from "@/presentation/components/reporte/report-territories-card";
import { ReportAdPreview } from "@/presentation/components/reporte/report-ad-preview";
import { ReportEmptyMetrics } from "@/presentation/components/reporte/report-empty-metrics";
import { ReportFooter } from "@/presentation/components/reporte/report-footer";
import { ReportGrowthPanel } from "@/presentation/components/reporte/report-growth-panel";
import { ReportHero } from "@/presentation/components/reporte/report-hero";
import { ReportPlatformsPanel } from "@/presentation/components/reporte/report-platforms-panel";
import { ReportSummaryStrip } from "@/presentation/components/reporte/report-summary-strip";
import { ReportTopbar } from "@/presentation/components/reporte/report-topbar";
import type { ReportPreviewProps } from "@/types/report.types";
import { buildLaunchHeadline } from "@/utils/build-report-headline";
import { formatJobPeriod } from "@/utils/format-job-period";
import { toIsoDate } from "@/utils/month-range";

/**
 * Reporte del lanzamiento. Se lee como una historia y no como un informe:
 * cuánta gente llegó, si eso es mucho, dónde te vieron, cómo fue creciendo y
 * qué se vio. Antes era una sección por plataforma, tres veces lo mismo.
 */
export function ReportPreview({
  job,
  totals,
  platforms,
  growth,
  activePlatform,
  reportUrl,
  basePath,
  artistHref,
  now,
}: ReportPreviewProps) {
  const period = formatJobPeriod(job.startsOn, job.endsOn);

  return (
    <div className="bg-ambient flex min-h-dvh flex-col">
      <ReportTopbar
        subtitle={`${job.title} · ${job.clientName}`}
        syncedAt={totals.syncedAt}
        now={now}
        reportUrl={reportUrl}
      />

      <main className="mx-auto flex w-full max-w-[1020px] flex-1 flex-col gap-5 px-5 py-8">
        <ReportHero
          job={job}
          headline={buildLaunchHeadline(totals.reach, job, toIsoDate(new Date(now)))}
        />

        {platforms.length === 0 ? (
          <ReportEmptyMetrics />
        ) : (
          <>
            <ReportSummaryStrip totals={totals} investment={job.investment} />

            <ReportPlatformsPanel
              platforms={platforms}
              activePlatform={activePlatform}
              basePath={basePath}
            />

            {growth ? (
              <ReportGrowthPanel growth={growth} period={period} />
            ) : null}

            <ReportAdPreview job={job} />

            {/* Territorios, audiencia, hogares y palabras clave siguen
                alimentados con datos de muestra y van marcados como tales. */}
            {SHOW_SAMPLE_REPORT_SECTIONS ? (
              <>
                <div className="flex flex-col gap-5">
                  <h2 className="font-display text-[15px] font-normal tracking-[-0.2px] text-text-primary">
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
          className="flex items-center justify-center gap-2 rounded-sm py-3.5 text-[13px] font-normal text-text-primary transition-opacity duration-150 hover:opacity-60 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
        >
          {REPORT_COPY.artistLink(job.clientName)}
          <ArrowRight size={15} strokeWidth={1.5} aria-hidden />
        </Link>

        <ReportFooter label={REPORT_COPY.footer} />
      </main>
    </div>
  );
}

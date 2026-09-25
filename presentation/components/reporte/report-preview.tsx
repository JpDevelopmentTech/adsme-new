import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { REPORT_COPY } from "@/constants/report.constants";
import { ReportAudienceCard } from "@/presentation/components/reporte/report-audience-card";
import { ReportTerritoriesCard } from "@/presentation/components/reporte/report-territories-card";
import { ReportAdPreview } from "@/presentation/components/reporte/report-ad-preview";
import { ReportEmptyMetrics } from "@/presentation/components/reporte/report-empty-metrics";
import { ReportFooter } from "@/presentation/components/reporte/report-footer";
import { ReportGrowthPanel } from "@/presentation/components/reporte/report-growth-panel";
import { ReportHero } from "@/presentation/components/reporte/report-hero";
import { ReportPlatformDetails } from "@/presentation/components/reporte/report-platform-details";
import { ReportPlatformsPanel } from "@/presentation/components/reporte/report-platforms-panel";
import { ReportSummaryStrip } from "@/presentation/components/reporte/report-summary-strip";
import { ReportTopbar } from "@/presentation/components/reporte/report-topbar";
import type { ReportPreviewProps } from "@/types/report.types";
import { buildLaunchHeadline } from "@/utils/build-report-headline";
import { cn } from "@/utils/cn";
import { formatJobPeriod } from "@/utils/format-job-period";
import { toIsoDate } from "@/utils/month-range";

/**
 * Reporte del lanzamiento. Se lee como una historia y no como un informe:
 * cuánta gente llegó, si eso es mucho, cómo fue creciendo, dónde te vieron —con
 * el detalle de cada plataforma— y qué se vio. Antes era una sección por
 * plataforma, tres veces lo mismo.
 */
export function ReportPreview({
  job,
  totals,
  platforms,
  growth,
  audience,
  territories,
  activePlatform,
  reportUrl,
  basePath,
  artistHref,
  now,
}: ReportPreviewProps) {
  const period = formatJobPeriod(job.startsOn, job.endsOn);
  // Con una sola tarjeta no hay dos columnas que repartir: la que haya ocupa
  // el ancho entero en vez de dejar medio panel vacío al lado.
  const hasBothCards = territories.length > 0 && audience !== null;

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

            {growth ? (
              <ReportGrowthPanel growth={growth} period={period} />
            ) : null}

            <ReportPlatformsPanel
              platforms={platforms}
              activePlatform={activePlatform}
              basePath={basePath}
            />

            <ReportPlatformDetails
              platforms={platforms}
              activePlatform={activePlatform}
            />

            <ReportAdPreview job={job} />

            {/* La sección entera desaparece si ninguna plataforma entregó
                reparto: con campañas pequeñas lo retienen por umbral de
                privacidad, y una tarjeta vacía se lee como un error. */}
            {territories.length > 0 || audience ? (
              <div className="flex flex-col gap-5">
                <h2 className="font-display text-[15px] font-normal tracking-[-0.2px] text-text-primary">
                  {REPORT_COPY.audienceSectionTitle}
                </h2>

                <div
                  className={cn(
                    "grid gap-5",
                    hasBothCards && "xl:grid-cols-[2fr_1fr]",
                  )}
                >
                  {territories.length > 0 ? (
                    <ReportTerritoriesCard territories={territories} />
                  ) : null}
                  {audience ? <ReportAudienceCard audience={audience} /> : null}
                </div>
              </div>
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

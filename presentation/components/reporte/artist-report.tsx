import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { REPORT_COPY, REPORT_METRIC_ICONS } from "@/constants/report.constants";
import { ArtistHero } from "@/presentation/components/reporte/artist-hero";
import { ArtistLaunchesTable } from "@/presentation/components/reporte/artist-launches-table";
import { ArtistPlatformCards } from "@/presentation/components/reporte/artist-platform-cards";
import { ReportFooter } from "@/presentation/components/reporte/report-footer";
import { ReportSummaryCard } from "@/presentation/components/reporte/report-summary-card";
import { ReportTopbar } from "@/presentation/components/reporte/report-topbar";
import { AmbientGlow } from "@/presentation/components/ui/ambient-glow";
import type { ArtistReportProps } from "@/types/report.types";
import { buildArtistHeadline } from "@/utils/build-report-headline";
import { buildArtistMetrics } from "@/utils/build-report-metrics";
import { cn } from "@/utils/cn";

/** Reporte consolidado del artista: todos sus lanzamientos y dónde los vieron. */
export function ArtistReport({ artist, originTitle, originHref, reportUrl, showSpend }: ArtistReportProps) {
  const activeCampaigns = artist.launches.reduce((total, launch) => total + launch.activeCampaigns, 0);
  const reach = artist.launches.reduce((total, launch) => total + launch.reach, 0);
  const metrics = buildArtistMetrics(artist, showSpend);

  return (
    <div className="relative isolate min-h-dvh overflow-x-hidden">
      <AmbientGlow imageUrl={artist.avatarUrl} />

      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-10 px-4 pt-7 pb-16 sm:px-8">
        <ReportTopbar
          subtitle={REPORT_COPY.artistSubtitle}
          syncedAt={null}
          now=""
          reportUrl={reportUrl}
          showStatus={false}
        />

        <main className="flex flex-col gap-10">
          <Link
            href={originHref}
            className="flex w-fit items-center gap-2 rounded-sm text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
          >
            <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
            {REPORT_COPY.backToLaunch(originTitle)}
          </Link>

          <ArtistHero artist={artist} headline={buildArtistHeadline(reach)} activeCampaigns={activeCampaigns} />

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-light text-text-primary">{REPORT_COPY.artistSummary}</h2>
            <div className={cn("grid gap-4", metrics.length === 3 ? "md:grid-cols-3" : "sm:grid-cols-2")}>
              {metrics.map((metric) => (
                <ReportSummaryCard
                  key={metric.label}
                  icon={REPORT_METRIC_ICONS[metric.icon]}
                  label={metric.label}
                  value={metric.value}
                  note={`${metric.note.value} ${metric.note.label}`}
                />
              ))}
            </div>
          </section>

          <ArtistLaunchesTable launches={artist.launches} showSpend={showSpend} />

          {artist.platforms.length > 0 ? (
            <ArtistPlatformCards platforms={artist.platforms} showSpend={showSpend} />
          ) : null}
        </main>

        <ReportFooter label={REPORT_COPY.artistFooter} />
      </div>
    </div>
  );
}

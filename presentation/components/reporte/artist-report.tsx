import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { REPORT_COPY } from "@/constants/report.constants";
import { ArtistHero } from "@/presentation/components/reporte/artist-hero";
import { ArtistLaunchesTable } from "@/presentation/components/reporte/artist-launches-table";
import { ArtistPlatformCards } from "@/presentation/components/reporte/artist-platform-cards";
import { ReportFooter } from "@/presentation/components/reporte/report-footer";
import { ReportMetricGrid } from "@/presentation/components/reporte/report-metric-grid";
import { ShareReportButton } from "@/presentation/components/reporte/share-report-button";
import { BrandWordmark } from "@/presentation/components/brand/brand-wordmark";
import type { ArtistReportProps } from "@/types/report.types";
import { buildArtistHeadline } from "@/utils/build-report-headline";
import { buildArtistMetrics } from "@/utils/build-report-metrics";

/** Reporte consolidado del artista (`C7` del diseño): todos sus lanzamientos. */
export function ArtistReport({
  artist,
  originTitle,
  originHref,
  reportUrl,
}: ArtistReportProps) {
  const activeCampaigns = artist.launches.reduce(
    (total, launch) => total + launch.activeCampaigns,
    0,
  );
  const reach = artist.launches.reduce(
    (total, launch) => total + launch.reach,
    0,
  );

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-canvas/85 px-6 py-4 backdrop-blur-md lg:px-10">
        <div className="flex items-center gap-4">
          <BrandWordmark />
          <span aria-hidden className="h-6 w-px bg-border" />
          <p className="text-[13px] text-text-secondary">
            {REPORT_COPY.artistSubtitle}
          </p>
        </div>

        <ShareReportButton url={reportUrl} label={REPORT_COPY.share} />
      </header>

      <main className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-7 px-6 py-8 lg:px-10">
        <Link
          href={originHref}
          className="flex w-fit items-center gap-2 text-[13px] font-semibold text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={15} aria-hidden />
          {REPORT_COPY.backToLaunch(originTitle)}
        </Link>

        <ArtistHero
          artist={artist}
          headline={buildArtistHeadline(reach)}
          activeCampaigns={activeCampaigns}
        />

        <div className="flex flex-col gap-5">
          <h2 className="font-display text-[17px] font-semibold text-text-primary">
            {REPORT_COPY.artistSummary}
          </h2>
          <ReportMetricGrid metrics={buildArtistMetrics(artist)} />
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="font-display text-[17px] font-semibold text-text-primary">
            {REPORT_COPY.artistLaunches}
          </h2>
          <ArtistLaunchesTable launches={artist.launches} />
        </div>

        {artist.platforms.length > 0 ? (
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-[17px] font-semibold text-text-primary">
              {REPORT_COPY.artistPlatforms}
            </h2>
            <ArtistPlatformCards platforms={artist.platforms} />
          </div>
        ) : null}

        <ReportFooter label={REPORT_COPY.artistFooter} />
      </main>
    </div>
  );
}

import { PLATFORM_META } from "@/constants/platforms.constants";
import { REPORT_COPY } from "@/constants/report.constants";
import type { ArtistPlatformCardsProps } from "@/types/report.types";
import { formatPercent, share } from "@/utils/format-compact-number";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatExactNumber } from "@/utils/format-exact-number";

/**
 * Una tarjeta por plataforma con el total de reproducciones del artista. La
 * barra, al pie, marca su peso sobre el total de todos sus lanzamientos.
 */
export function ArtistPlatformCards({ platforms, showSpend }: ArtistPlatformCardsProps) {
  const total = platforms.reduce((sum, metrics) => sum + metrics.videoPlays, 0);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-light text-text-primary">{REPORT_COPY.artistPlatforms}</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {platforms.map((metrics) => {
          const { label, mono, chartColor } = PLATFORM_META[metrics.platform];
          const percent = share(metrics.videoPlays, total);

          return (
            <article key={metrics.platform} className="glass-thick flex flex-col gap-4 rounded-card p-6">
              <header className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-[12px] text-[13px] font-medium"
                  style={{ color: chartColor, backgroundColor: `${chartColor}29` }}
                >
                  {mono}
                </span>
                <span className="flex min-w-0 flex-col">
                  <h3 className="text-base text-text-primary">{label}</h3>
                  <span className="text-xs text-text-muted">{REPORT_COPY.detailCampaigns(metrics.campaigns)}</span>
                </span>
              </header>

              <p className="text-[38px] leading-none font-extralight tracking-[-1px] text-text-primary tabular-nums">
                {formatExactNumber(metrics.videoPlays)}
              </p>

              <p className="text-xs text-text-secondary">
                {REPORT_COPY.artistPlatformNote(
                  formatPercent(percent),
                  showSpend ? formatExactCurrency(metrics.spend) : null,
                )}
              </p>

              <span aria-hidden className="mt-auto h-2 rounded-pill bg-white/8">
                <span className="block h-full rounded-pill" style={{ width: `${percent}%`, backgroundColor: chartColor }} />
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

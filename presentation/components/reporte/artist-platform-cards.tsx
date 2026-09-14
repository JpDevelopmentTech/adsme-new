import { PLATFORM_META } from "@/constants/platforms.constants";
import {
  REPORT_PLATFORM_BAR,
  REPORT_PLATFORM_SECTION,
  REPORT_TONE_CLASSES,
} from "@/constants/report.constants";
import type { ArtistPlatformCardsProps } from "@/types/report.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import {
  formatCompactNumber,
  formatPercent,
  share,
} from "@/utils/format-compact-number";
import { cn } from "@/utils/cn";

/**
 * Una tarjeta por plataforma con el total de reproducciones del artista. La
 * barra marca su peso sobre el total, que es lo que sí podemos medir sin
 * histórico diario.
 */
export function ArtistPlatformCards({ platforms }: ArtistPlatformCardsProps) {
  const total = platforms.reduce((sum, metrics) => sum + metrics.videoPlays, 0);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
      {platforms.map((metrics) => {
        const { Icon, label } = PLATFORM_META[metrics.platform];
        const tone = REPORT_TONE_CLASSES[REPORT_PLATFORM_SECTION[metrics.platform].tone];
        const percent = share(metrics.videoPlays, total);

        return (
          <article
            key={metrics.platform}
            className="flex flex-col gap-4 rounded-card border border-border bg-card p-5"
          >
            <header className="flex items-center gap-2.5">
              <span
                aria-hidden
                className={cn("grid size-[34px] place-items-center rounded-sm", tone.chip)}
              >
                <span className={tone.icon}>
                  <Icon size={17} />
                </span>
              </span>

              <h3 className="flex-1 font-display text-base font-semibold text-text-primary">
                {label}
              </h3>

              <span className="text-xs text-text-muted">
                {metrics.campaigns}{" "}
                {metrics.campaigns === 1 ? "campaña" : "campañas"}
              </span>
            </header>

            <p className="font-display text-[32px] leading-none font-bold text-text-primary">
              {formatCompactNumber(metrics.videoPlays)}
            </p>

            <p className="text-xs text-text-muted">
              <span className={cn("font-semibold", tone.text)}>
                {formatPercent(percent)}
              </span>{" "}
              de las reproducciones · {formatCompactCurrency(metrics.spend)}{" "}
              invertidos
            </p>

            <span aria-hidden className="h-2 overflow-hidden rounded-pill bg-surface">
              <span
                className="block h-full rounded-pill"
                style={{
                  width: `${percent}%`,
                  backgroundImage: REPORT_PLATFORM_BAR[metrics.platform],
                }}
              />
            </span>
          </article>
        );
      })}
    </div>
  );
}

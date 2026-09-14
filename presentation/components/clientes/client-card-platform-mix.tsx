import { CLIENT_CARD_COPY } from "@/constants/clients.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import type { ClientCardPlatformMixProps } from "@/types/client.types";
import { formatPercent } from "@/utils/format-compact-number";

/**
 * Cómo se reparte la inversión del mes entre plataformas. La barra es
 * decorativa: el dato lo dice la leyenda, que es lo que lee un lector de pantalla.
 */
export function ClientCardPlatformMix({ shares }: ClientCardPlatformMixProps) {
  const active = shares.filter((share) => share.percent > 0);

  if (active.length === 0) {
    return (
      <div className="flex flex-col gap-[9px]">
        <div className="h-1.5 rounded-pill bg-card-elevated" />
        <p className="flex items-center gap-1.5 text-xs text-text-muted">
          <span aria-hidden className="size-1.5 rounded-full bg-border-strong" />
          {CLIENT_CARD_COPY.noCampaigns}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[9px]">
      <div aria-hidden className="flex h-1.5 gap-0.5">
        {active.map((share) => (
          <span
            key={share.platform}
            className="rounded-pill"
            style={{
              flexBasis: `${share.percent}%`,
              backgroundColor: PLATFORM_META[share.platform].chartColor,
            }}
          />
        ))}
      </div>

      <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {active.map((share) => (
          <li
            key={share.platform}
            className="flex items-center gap-1.5 text-xs font-medium text-text-secondary"
          >
            <span
              aria-hidden
              className="size-1.5 shrink-0 rounded-full"
              style={{
                backgroundColor: PLATFORM_META[share.platform].chartColor,
              }}
            />
            {PLATFORM_META[share.platform].label} {formatPercent(share.percent)}
          </li>
        ))}
      </ul>
    </div>
  );
}

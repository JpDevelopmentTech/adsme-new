import { CAMPAIGNS_SPLIT_COPY } from "@/constants/campaigns.constants";
import type { CampaignsSplitBandProps } from "@/types/campaigns-list.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/**
 * Cuánto de lo importado ya alimenta un reporte y cuánto sigue suelto. Son dos
 * tramos y no uno por plataforma a propósito: mezclar plataforma y estado en la
 * misma barra obligaría a leer dos códigos de color a la vez.
 */
export function CampaignsSplitRail({ split }: CampaignsSplitBandProps) {
  return (
    <div className="flex flex-col gap-[9px]">
      <div aria-hidden className="flex items-center gap-[3px]">
        <span
          className="h-2.5 rounded-pill bg-g-400"
          style={{ width: `${split.linkedPercent}%` }}
        />
        {split.unlinked > 0 ? (
          <span
            className="h-2.5 flex-1 rounded-pill bg-accent"
            style={{ minWidth: 6 }}
          />
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-[18px] text-[11.5px]">
        <span className="flex items-center gap-[7px] font-light text-g-400">
          <span aria-hidden className="size-[7px] rounded-pill bg-g-400" />
          {CAMPAIGNS_SPLIT_COPY.linked(formatCompactCurrency(split.linked))}
        </span>

        {split.unlinked > 0 ? (
          <span className="flex items-center gap-[7px] text-g-50">
            <span aria-hidden className="size-[7px] rounded-pill bg-accent" />
            {CAMPAIGNS_SPLIT_COPY.unlinked(
              formatCompactCurrency(split.unlinked),
            )}
          </span>
        ) : null}
      </div>
    </div>
  );
}

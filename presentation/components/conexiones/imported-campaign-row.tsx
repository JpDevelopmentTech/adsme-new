import { IMPORTED_CAMPAIGNS_COPY } from "@/constants/connections.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import type { ImportedCampaignRowProps } from "@/types/connections.types";
import { cn } from "@/utils/cn";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

const CELL_CLASSES = "py-3 text-[12.5px] font-light";

/** Una campaña de la tabla: de dónde vino, a qué trabajo alimenta y cuánto trae. */
export function ImportedCampaignRow({ campaign }: ImportedCampaignRowProps) {
  return (
    <tr className="border-t border-border/60">
      <td
        className={`${CELL_CLASSES} truncate pr-4 pl-5 text-[13px] font-normal text-text-primary`}
      >
        {campaign.name}
      </td>

      <td className={`${CELL_CLASSES} pr-4 text-text-secondary`}>
        <span className="flex items-center gap-2 truncate">
          <span
            aria-hidden
            className="size-[7px] shrink-0 rounded-pill"
            style={{
              backgroundColor: PLATFORM_META[campaign.platform].chartColor,
            }}
          />
          {campaign.accountName}
        </span>
      </td>

      <td
        className={cn(
          CELL_CLASSES,
          "truncate pr-4",
          campaign.jobLabel ? "text-text-secondary" : "font-normal text-warning",
        )}
      >
        {campaign.jobLabel ?? IMPORTED_CAMPAIGNS_COPY.unlinked}
      </td>

      <td
        className={`${CELL_CLASSES} pr-4 text-right text-[13px] font-normal whitespace-nowrap text-text-primary`}
      >
        {formatCompactCurrency(campaign.spend)}
      </td>

      <td
        className={`${CELL_CLASSES} pr-5 text-right text-[12px] whitespace-nowrap text-text-muted`}
      >
        {campaign.syncedAtLabel}
      </td>
    </tr>
  );
}

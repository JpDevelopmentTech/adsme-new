import { IMPORTED_CAMPAIGNS_COPY } from "@/constants/connections.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import type { ImportedCampaignRowProps } from "@/types/connections.types";
import { cn } from "@/utils/cn";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/** Una campaña de la tabla: de dónde vino, a qué trabajo alimenta y cuánto trae. */
export function ImportedCampaignRow({ campaign }: ImportedCampaignRowProps) {
  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-[18px] py-4 text-[13px] font-semibold text-text-primary">
        {campaign.name}
      </td>

      <td className="px-[18px] py-4">
        <span className="flex items-center gap-2 text-[13px] whitespace-nowrap text-text-secondary">
          <span
            aria-hidden
            className="size-[7px] shrink-0 rounded-full"
            style={{
              backgroundColor: PLATFORM_META[campaign.platform].chartColor,
            }}
          />
          {campaign.accountName}
        </span>
      </td>

      <td
        className={cn(
          "px-[18px] py-4 text-[13px]",
          campaign.jobLabel
            ? "text-text-secondary"
            : "font-semibold text-warning",
        )}
      >
        {campaign.jobLabel ?? IMPORTED_CAMPAIGNS_COPY.unlinked}
      </td>

      <td className="px-[18px] py-4 text-[13px] font-semibold whitespace-nowrap text-text-primary">
        {formatCompactCurrency(campaign.spend)}
      </td>

      <td className="px-[18px] py-4 text-[13px] whitespace-nowrap text-text-muted">
        {campaign.syncedAtLabel}
      </td>
    </tr>
  );
}

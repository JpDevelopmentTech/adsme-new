"use client";

import { Link2 } from "lucide-react";
import {
  CAMPAIGNS_COPY,
  CAMPAIGN_COLUMN_WIDTHS,
} from "@/constants/campaigns.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { CampaignStateChip } from "@/presentation/components/campanas/campaign-state-chip";
import type { CampaignRowProps } from "@/types/campaigns-list.types";
import { cn } from "@/utils/cn";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatCompactNumber } from "@/utils/format-compact-number";

/**
 * Una campaña importada. La casilla va en todas las filas, no solo en las
 * sueltas: marcar una ya vinculada sirve para moverla de trabajo, y tenerla
 * siempre mantiene las columnas en el mismo eje entre grupos.
 */
export function CampaignRow({
  campaign,
  isSelected,
  isLinked,
  onToggle,
  onLink,
}: CampaignRowProps) {
  const linkLabel = isLinked
    ? CAMPAIGNS_COPY.moveRow(campaign.name)
    : CAMPAIGNS_COPY.linkRow(campaign.name);

  return (
    <li
      className={cn(
        "flex items-center gap-4 border-t border-border/60 px-5 py-[11px] transition-colors duration-150",
        isSelected ? "bg-accent/6" : "hover:bg-white/40",
      )}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(campaign.id)}
        aria-label={CAMPAIGNS_COPY.selectRow(campaign.name)}
        className={cn(
          CAMPAIGN_COLUMN_WIDTHS.check,
          "h-[18px] shrink-0 cursor-pointer accent-accent",
        )}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-[13px] font-normal text-text-primary">
          {campaign.name}
        </span>
        <span className="truncate text-[11px] font-light text-text-muted">
          {campaign.reference}
        </span>
      </div>

      <span
        className={cn(
          CAMPAIGN_COLUMN_WIDTHS.account,
          "flex shrink-0 items-center gap-2 text-[12px] font-light text-text-secondary",
        )}
      >
        <span
          aria-hidden
          className="size-[7px] shrink-0 rounded-pill"
          style={{
            backgroundColor: PLATFORM_META[campaign.platform].chartColor,
          }}
        />
        <span className="truncate">{campaign.accountLabel}</span>
      </span>

      <span className={cn(CAMPAIGN_COLUMN_WIDTHS.state, "shrink-0")}>
        <CampaignStateChip state={campaign.state} />
      </span>

      <span
        className={cn(
          CAMPAIGN_COLUMN_WIDTHS.period,
          "shrink-0 text-[12px] font-light whitespace-nowrap text-text-secondary",
        )}
      >
        {campaign.period}
      </span>

      <span
        className={cn(
          CAMPAIGN_COLUMN_WIDTHS.reach,
          "shrink-0 text-right text-[13px] whitespace-nowrap text-text-primary",
        )}
      >
        {formatCompactNumber(campaign.reach)}
      </span>

      <span
        className={cn(
          CAMPAIGN_COLUMN_WIDTHS.spend,
          "shrink-0 text-right text-[13px] whitespace-nowrap text-text-primary",
        )}
      >
        {formatCompactCurrency(campaign.spend)}
      </span>

      {/* Un icono que dice qué hace, en vez del `⋯` del diseño: el menú tendría
          una sola opción, porque el backend no sabe desvincular todavía. */}
      <span className={cn(CAMPAIGN_COLUMN_WIDTHS.actions, "flex shrink-0 justify-end")}>
        <button
          type="button"
          onClick={() => onLink(campaign.id)}
          title={linkLabel}
          aria-label={linkLabel}
          className="grid size-7 cursor-pointer place-items-center rounded-sm text-text-muted transition-colors duration-150 hover:bg-white/70 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
        >
          <Link2 size={15} strokeWidth={1.5} aria-hidden />
        </button>
      </span>
    </li>
  );
}

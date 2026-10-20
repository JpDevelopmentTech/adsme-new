"use client";

import { Link2 } from "lucide-react";
import {
  CAMPAIGNS_COPY,
  CAMPAIGN_COLUMN_WIDTHS,
} from "@/constants/campaigns.constants";
import { PlatformLogo } from "@/presentation/components/brand/platform-logo";
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
        isSelected ? "bg-accent/6" : "hover:bg-g-100",
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
        <PlatformLogo platform={campaign.platform} size={14} variant="mark" />
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
          "flex shrink-0 flex-col items-end gap-0.5 whitespace-nowrap",
        )}
      >
        <span className="text-[13px] text-text-primary">
          {formatCompactCurrency(campaign.spend)}
        </span>
        {/* La cuenta reporta en otra moneda: se enseña el original para que
            se vea de dónde sale la cifra en pesos. */}
        {campaign.accountSpend ? (
          <span className="text-[11px] font-light text-text-muted">
            {campaign.accountSpend}
          </span>
        ) : null}
      </span>

      {/* Un icono que dice qué hace, en vez del `⋯` del diseño: el menú tendría
          una sola opción, porque el backend no sabe desvincular todavía. */}
      <span className={cn(CAMPAIGN_COLUMN_WIDTHS.actions, "flex shrink-0 justify-end")}>
        <button
          type="button"
          onClick={() => onLink(campaign.id)}
          title={linkLabel}
          aria-label={linkLabel}
          className="grid size-7 cursor-pointer place-items-center rounded-sm text-text-muted transition-colors duration-150 hover:bg-g-100 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
        >
          <Link2 size={15} strokeWidth={1.5} aria-hidden />
        </button>
      </span>
    </li>
  );
}

"use client";

import { Check } from "lucide-react";
import { PLATFORM_OF_CONNECTION } from "@/constants/platform-labels.constants";
import { PlatformLogo } from "@/presentation/components/brand/platform-logo";
import type { CampaignPickerItemProps } from "@/types/link-campaign.types";
import { cn } from "@/utils/cn";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/** Fila seleccionable del listado de campañas de una cuenta. */
export function CampaignPickerItem({
  campaign,
  isSelected,
  onToggle,
}: CampaignPickerItemProps) {

  return (
    <li className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => onToggle(campaign.id)}
        aria-pressed={isSelected}
        className="flex w-full cursor-pointer items-center gap-3.5 px-1 py-3 text-left transition-colors hover:bg-card-elevated"
      >
        <span
          className={cn(
            "grid size-5 shrink-0 place-items-center rounded-md border transition-colors",
            isSelected
              ? "border-transparent bg-brand-gradient"
              : "border-border-strong bg-card",
          )}
        >
          <Check
            size={13}
            strokeWidth={3}
            aria-hidden
            className={cn("text-white", !isSelected && "opacity-0")}
          />
        </span>

        <PlatformLogo platform={PLATFORM_OF_CONNECTION[campaign.platform]} size={34} />

        <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <span className="truncate text-[13px] font-semibold text-text-primary">
            {campaign.name}
          </span>
          <span className="truncate text-xs text-text-muted">
            ID {campaign.externalCampaignId}
            {campaign.accountLabel ? ` · ${campaign.accountLabel}` : ""}
            {campaign.jobId ? " · ya vinculada" : ""}
          </span>
        </span>

        <span className="shrink-0 text-[13px] font-semibold whitespace-nowrap text-text-secondary">
          {formatCompactCurrency(campaign.spend)}
        </span>
      </button>
    </li>
  );
}

"use client";

import { ChevronRight, Disc3, Link2, Unlink } from "lucide-react";
import Link from "next/link";
import { CAMPAIGNS_COPY } from "@/constants/campaigns.constants";
import { jobDetailRoute } from "@/constants/routes.constants";
import type { CampaignGroupHeadProps } from "@/types/campaigns-list.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/**
 * Cabecera del bloque. El grupo sin vincular se tiñe de acento y lleva la
 * acción: es lo único de esta pantalla que pide una decisión, y repartir un
 * botón por fila lo habría diluido en dieciocho.
 */
export function CampaignGroupHead({
  group,
  selectedCount,
  onLink,
}: CampaignGroupHeadProps) {
  const meta = CAMPAIGNS_COPY.groupMeta(
    group.campaigns.length,
    formatCompactCurrency(group.spend),
  );

  if (group.jobId === null) {
    return (
      <div className="flex flex-wrap items-center gap-3 bg-accent/7 px-5 py-2.5">
        <Unlink size={15} strokeWidth={1.5} className="text-accent" aria-hidden />
        <span className="text-[12.5px] font-medium text-accent">
          {CAMPAIGNS_COPY.unlinkedTitle}
        </span>
        <span className="flex-1 text-[12px] font-light text-text-secondary">
          {meta}
        </span>

        {selectedCount > 0 ? (
          <button
            type="button"
            onClick={onLink}
            className="flex cursor-pointer items-center gap-[7px] rounded-md bg-accent px-[13px] py-[7px] text-[12px] font-medium whitespace-nowrap text-g-50 transition-all duration-150 hover:-translate-y-px hover:shadow-float focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none"
          >
            <Link2 size={14} strokeWidth={1.75} aria-hidden />
            {CAMPAIGNS_COPY.linkSelected(selectedCount)}
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 bg-g-100 px-5 py-2.5">
      <Disc3 size={15} strokeWidth={1.5} className="text-text-muted" aria-hidden />
      <span className="text-[12.5px] text-text-primary">{group.title}</span>
      <span className="text-[12px] font-light text-text-secondary">
        {group.clientName}
      </span>

      <span className="flex-1 text-right text-[11.5px] font-light text-text-muted">
        {meta}
      </span>

      <Link
        href={jobDetailRoute(group.jobId)}
        className="flex items-center gap-1 rounded-sm text-[12px] text-text-primary transition-opacity duration-150 hover:opacity-60 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
      >
        {CAMPAIGNS_COPY.seeJob}
        <ChevronRight size={13} strokeWidth={1.5} aria-hidden />
      </Link>
    </div>
  );
}

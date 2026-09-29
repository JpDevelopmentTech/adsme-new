"use client";

import { useMemo, useState } from "react";
import {
  CAMPAIGNS_COPY,
  CAMPAIGN_COLUMN_WIDTHS,
  CAMPAIGN_TABLE_COLUMNS,
} from "@/constants/campaigns.constants";
import { CampaignGroupHead } from "@/presentation/components/campanas/campaign-group-head";
import { CampaignRow } from "@/presentation/components/campanas/campaign-row";
import { LinkCampaignsDialog } from "@/presentation/components/campanas/link-campaigns-dialog";
import type { CampaignsBoardProps } from "@/types/campaigns-list.types";
import { cn } from "@/utils/cn";

const HEADER_CLASSES =
  "shrink-0 text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase";

/**
 * La lista agrupada por el trabajo al que alimenta cada campaña, con el bloque
 * de las sueltas arriba. Es cliente porque la selección múltiple y el diálogo
 * de destino son estado de esta pantalla, no de la URL.
 */
export function CampaignsBoard({
  groups,
  jobOptions,
  isFiltered,
  toolbar,
}: CampaignsBoardProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const byId = useMemo(
    () => new Map(groups.flatMap((group) => group.campaigns).map((c) => [c.id, c])),
    [groups],
  );
  const picked = selected.flatMap((id) => {
    const campaign = byId.get(id);

    return campaign ? [campaign] : [];
  });

  const toggle = (campaignId: string) =>
    setSelected((current) =>
      current.includes(campaignId)
        ? current.filter((id) => id !== campaignId)
        : [...current, campaignId],
    );

  // Pulsar la acción de una fila la convierte en la única selección: lo que se
  // vincula es siempre lo que el diálogo enseña.
  const openFor = (campaignId: string) => {
    setSelected([campaignId]);
    setIsDialogOpen(true);
  };

  return (
    <section className="glass-panel flex flex-col overflow-hidden rounded-card">
      {toolbar}

      {groups.length === 0 ? (
        <>
          <div className="h-px bg-border/60" />
          <p className="px-5 py-12 text-center text-[12.5px] text-text-muted">
            {isFiltered ? CAMPAIGNS_COPY.emptyFiltered : CAMPAIGNS_COPY.empty}
          </p>
        </>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[980px]">
            <div className="flex items-center gap-4 border-y border-border/60 bg-g-100 px-5 py-[9px]">
              <span className={cn(CAMPAIGN_COLUMN_WIDTHS.check, "shrink-0")} />
              <span className={cn(HEADER_CLASSES, "flex-1")}>
                {CAMPAIGN_TABLE_COLUMNS.campaign}
              </span>
              <span className={cn(HEADER_CLASSES, CAMPAIGN_COLUMN_WIDTHS.account)}>
                {CAMPAIGN_TABLE_COLUMNS.account}
              </span>
              <span className={cn(HEADER_CLASSES, CAMPAIGN_COLUMN_WIDTHS.state)}>
                {CAMPAIGN_TABLE_COLUMNS.state}
              </span>
              <span className={cn(HEADER_CLASSES, CAMPAIGN_COLUMN_WIDTHS.period)}>
                {CAMPAIGN_TABLE_COLUMNS.period}
              </span>
              <span
                className={cn(HEADER_CLASSES, CAMPAIGN_COLUMN_WIDTHS.reach, "text-right")}
              >
                {CAMPAIGN_TABLE_COLUMNS.reach}
              </span>
              <span
                className={cn(HEADER_CLASSES, CAMPAIGN_COLUMN_WIDTHS.spend, "text-right")}
              >
                {CAMPAIGN_TABLE_COLUMNS.spend}
              </span>
              <span className={cn(CAMPAIGN_COLUMN_WIDTHS.actions, "shrink-0")} />
            </div>

            {groups.map((group) => (
              <div key={group.jobId ?? "unlinked"}>
                <CampaignGroupHead
                  group={group}
                  selectedCount={
                    group.campaigns.filter((c) => selected.includes(c.id)).length
                  }
                  onLink={() => setIsDialogOpen(true)}
                />

                <ul className="flex flex-col">
                  {group.campaigns.map((campaign) => (
                    <CampaignRow
                      key={campaign.id}
                      campaign={campaign}
                      isSelected={selected.includes(campaign.id)}
                      isLinked={group.jobId !== null}
                      onToggle={toggle}
                      onLink={openFor}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <LinkCampaignsDialog
        campaigns={picked}
        jobOptions={jobOptions}
        isOpen={isDialogOpen && picked.length > 0}
        onClose={() => setIsDialogOpen(false)}
        onRemove={toggle}
      />
    </section>
  );
}

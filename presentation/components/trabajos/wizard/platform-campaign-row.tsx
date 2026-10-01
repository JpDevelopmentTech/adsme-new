"use client";

import { Check, Link2, Plug, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PLATFORM_OF_CONNECTION } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { STEP_TWO_COPY } from "@/constants/job-wizard.constants";
import { CONNECTIONS_ROUTE } from "@/constants/routes.constants";
import { linkCampaignAction } from "@/presentation/actions/link-campaign-action";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";
import type { PlatformCampaignRowProps } from "@/types/job-wizard.types";
import { cn } from "@/utils/cn";

/** Cuántos resultados se ofrecen antes de pedir un término más concreto. */
const MAX_MATCHES = 5;

/**
 * Una plataforma dentro del paso 2. Es una fila y no una tarjeta porque las
 * tres se leen en vertical y lo que cambia entre ellas es el estado, no el
 * contenido. Una plataforma puede aportar **varias** campañas al trabajo, así
 * que el buscador sigue disponible después de vincular la primera.
 */
export function PlatformCampaignRow({
  platform,
  label,
  isConnected,
  campaigns,
  linked,
  jobId,
}: PlatformCampaignRowProps) {
  const [term, setTerm] = useState("");
  const jobPlatform = PLATFORM_OF_CONNECTION[platform];
  const { mono, chartColor } = PLATFORM_META[jobPlatform];

  // Coincide por nombre o por identificador real, y nunca ofrece una campaña
  // que ya esté vinculada a este trabajo.
  const matches = useMemo(() => {
    const needle = term.trim().toLowerCase();
    if (!needle) return [];

    const linkedIds = new Set(linked.map((campaign) => campaign.id));

    return campaigns
      .filter(
        (campaign) =>
          !linkedIds.has(campaign.id) &&
          (campaign.name.toLowerCase().includes(needle) ||
            campaign.externalCampaignId.includes(needle)),
      )
      .slice(0, MAX_MATCHES);
  }, [campaigns, term, linked]);

  const status = isConnected
    ? [STEP_TWO_COPY.connected, linked.length > 0 ? STEP_TWO_COPY.linkedCount(linked.length) : null]
        .filter(Boolean)
        .join(" · ")
    : STEP_TWO_COPY.notConnected;

  return (
    <section className="flex flex-col gap-3.5 border-b border-border py-5 first:pt-0 last:border-b-0 last:pb-0">
      <header className="flex flex-wrap items-center gap-3">
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-[12px] text-[13px] font-medium"
          style={{ color: chartColor, backgroundColor: `${chartColor}29` }}
        >
          {mono}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-normal text-text-primary">{label}</span>
          <span className="flex items-center gap-1.5 text-xs font-normal text-text-muted">
            <span
              aria-hidden
              className={cn("size-1.5 shrink-0 rounded-pill", isConnected ? "bg-success" : "bg-text-muted")}
            />
            {status}
          </span>
        </div>

        {!isConnected ? (
          <SecondaryLink href={CONNECTIONS_ROUTE}>
            <Plug size={16} strokeWidth={1.5} aria-hidden />
            {STEP_TWO_COPY.connectAccount}
          </SecondaryLink>
        ) : null}
      </header>

      {linked.map((campaign) => (
        <div
          key={campaign.id}
          className="flex items-center gap-3 rounded-[14px] border border-success/20 bg-success/[0.06] py-2.5 pr-2.5 pl-3.5"
        >
          <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-pill bg-success/16">
            <Check size={13} strokeWidth={2} className="text-success" />
          </span>

          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-sm font-normal text-text-primary">{campaign.name}</span>
            <span className="truncate text-xs font-normal text-text-muted">
              ID {campaign.externalCampaignId} · {STEP_TWO_COPY.linkedHint}
            </span>
          </span>

          {/* Sin `jobId` la acción desvincula: es como se corrige un error. */}
          <form action={linkCampaignAction}>
            <input type="hidden" name="campaignId" value={campaign.id} />
            <button
              type="submit"
              aria-label={`Desvincular ${campaign.name}`}
              className="grid size-8 cursor-pointer place-items-center rounded-pill border border-border bg-surface text-text-primary transition-colors duration-150 hover:bg-g-100"
            >
              <X size={14} strokeWidth={1.5} aria-hidden />
            </button>
          </form>
        </div>
      ))}

      {isConnected ? (
        <>
          {linked.length === 0 ? (
            <p className="text-[13px] font-normal text-text-muted">{STEP_TWO_COPY.empty}</p>
          ) : null}

          <div className="flex flex-col gap-1.5">
            <label className="flex h-11 items-center gap-2.5 rounded-[14px] border border-border bg-card-elevated px-3.5 transition-colors duration-150 focus-within:border-white/40">
              <Search size={16} strokeWidth={1.5} className="text-text-muted" aria-hidden />
              <input
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder={STEP_TWO_COPY.searchPlaceholder}
                aria-label={`${STEP_TWO_COPY.searchPlaceholder} en ${label}`}
                className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
            </label>

            {matches.length > 0 ? (
              <ul className="glass-menu flex flex-col rounded-[14px] p-1.5">
                {matches.map((campaign) => (
                  <li key={campaign.id}>
                    <form
                      action={linkCampaignAction}
                      className="flex items-center gap-3 rounded-[10px] px-2.5 py-2 hover:bg-surface"
                    >
                      <input type="hidden" name="campaignId" value={campaign.id} />
                      <input type="hidden" name="jobId" value={jobId} />

                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-[13px] font-normal text-text-primary">{campaign.name}</span>
                        <span className="truncate text-[11px] font-normal text-text-muted">
                          ID {campaign.externalCampaignId}
                        </span>
                      </span>

                      <SecondaryButton
                        type="submit"
                        className="px-3.5 py-1.5 text-xs"
                        icon={<Link2 size={13} strokeWidth={1.5} aria-hidden />}
                      >
                        {STEP_TWO_COPY.link}
                      </SecondaryButton>
                    </form>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </>
      ) : null}
    </section>
  );
}

"use client";

import { Check, Plug, Search, X } from "lucide-react";
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
  const { Icon, chartColor } = PLATFORM_META[jobPlatform];

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
    <section
      className={cn(
        "flex flex-col gap-3 rounded-md border p-4",
        isConnected ? "glass-field" : "border-border",
      )}
    >
      <header className="flex flex-wrap items-center gap-3">
        <span
          aria-hidden
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-md",
            isConnected ? "bg-g-100" : "border border-border",
          )}
          style={isConnected ? { color: chartColor } : undefined}
        >
          <Icon />
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span
            className={cn(
              "text-[13.5px] font-normal",
              isConnected ? "text-text-primary" : "text-text-secondary",
            )}
          >
            {label}
          </span>
          <span className="flex items-center gap-[7px] text-[11px] text-text-muted">
            <span
              aria-hidden
              className={cn(
                "size-1.5 shrink-0 rounded-pill",
                isConnected ? "bg-success" : "bg-g-400",
              )}
            />
            {status}
          </span>
        </div>

        {!isConnected ? (
          <SecondaryLink href={CONNECTIONS_ROUTE}>
            <Plug size={14} strokeWidth={1.5} aria-hidden />
            {STEP_TWO_COPY.connectAccount}
          </SecondaryLink>
        ) : null}
      </header>

      {linked.map((campaign) => (
        <div
          key={campaign.id}
          className="flex items-center gap-3 rounded-md border border-success/30 bg-success/[0.06] px-3.5 py-2.5"
        >
          <Check size={15} strokeWidth={2} className="shrink-0 text-success" aria-hidden />

          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-[13px] text-text-primary">
              {campaign.name}
            </span>
            <span className="truncate text-[11px] text-text-muted">
              ID {campaign.externalCampaignId} · {STEP_TWO_COPY.linkedHint}
            </span>
          </span>

          {/* Sin `jobId` la acción desvincula: es como se corrige un error. */}
          <form action={linkCampaignAction}>
            <input type="hidden" name="campaignId" value={campaign.id} />
            <button
              type="submit"
              aria-label={`Desvincular ${campaign.name}`}
              className="grid size-[30px] cursor-pointer place-items-center rounded-sm text-g-500 transition-colors duration-150 hover:bg-g-100 hover:text-text-primary"
            >
              <X size={15} strokeWidth={1.5} aria-hidden />
            </button>
          </form>
        </div>
      ))}

      {isConnected ? (
        <>
          <label className="glass-field flex items-center gap-2.5 rounded-md px-3.5 py-2.5 transition-colors duration-150 focus-within:border-ink">
            <Search size={15} strokeWidth={1.5} className="text-text-muted" aria-hidden />
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder={STEP_TWO_COPY.searchPlaceholder}
              aria-label={`${STEP_TWO_COPY.searchPlaceholder} en ${label}`}
              className="min-w-0 flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-muted"
            />
          </label>

          {matches.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {matches.map((campaign) => (
                <li key={campaign.id}>
                  <form
                    action={linkCampaignAction}
                    className="flex items-center gap-3 px-1"
                  >
                    <input type="hidden" name="campaignId" value={campaign.id} />
                    <input type="hidden" name="jobId" value={jobId} />

                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-[13px] text-text-primary">
                        {campaign.name}
                      </span>
                      <span className="truncate text-[11px] text-text-muted">
                        ID {campaign.externalCampaignId}
                      </span>
                    </span>

                    <SecondaryButton type="submit" icon={null}>
                      {STEP_TWO_COPY.link}
                    </SecondaryButton>
                  </form>
                </li>
              ))}
            </ul>
          ) : null}

          {linked.length === 0 && matches.length === 0 ? (
            <p className="px-1 text-[11.5px] text-text-muted">
              {STEP_TWO_COPY.empty}
            </p>
          ) : null}
        </>
      ) : null}
    </section>
  );
}

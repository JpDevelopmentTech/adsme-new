"use client";

import { CircleAlert, CircleCheck, Plug, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PLATFORM_OF_CONNECTION } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { STEP_TWO_COPY } from "@/constants/job-wizard.constants";
import { CONNECTIONS_ROUTE } from "@/constants/routes.constants";
import { linkCampaignAction } from "@/presentation/actions/link-campaign-action";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { PlatformCampaignCardProps } from "@/types/job-wizard.types";
import { cn } from "@/utils/cn";

/**
 * Tarjeta de una plataforma dentro del paso 2: busca entre las campañas ya
 * importadas de esa cuenta y vincula la elegida con el trabajo.
 */
export function PlatformCampaignCard({
  platform,
  label,
  connection,
  campaigns,
  linked,
  jobId,
}: PlatformCampaignCardProps) {
  const [term, setTerm] = useState("");
  const { Icon, color } = PLATFORM_META[PLATFORM_OF_CONNECTION[platform]];

  // Coincide por nombre o por identificador real en la plataforma.
  const matches = useMemo(() => {
    const needle = term.trim().toLowerCase();
    if (!needle) return [];

    return campaigns
      .filter(
        (campaign) =>
          campaign.name.toLowerCase().includes(needle) ||
          campaign.externalCampaignId.includes(needle),
      )
      .slice(0, 5);
  }, [campaigns, term]);

  return (
    <section
      className={cn(
        "flex flex-col gap-4 rounded-md border border-border p-[18px]",
        connection ? "bg-card-elevated" : "bg-transparent",
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="grid size-10 shrink-0 place-items-center rounded-sm bg-card"
            style={{ color }}
          >
            <Icon />
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-text-primary">
              {label}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-text-muted">
              <span
                aria-hidden
                className={cn(
                  "size-1.5 rounded-full",
                  connection ? "bg-success" : "bg-text-muted",
                )}
              />
              {connection
                ? STEP_TWO_COPY.connected
                : STEP_TWO_COPY.notConnected}
            </span>
          </div>
        </div>
      </header>

      {connection ? (
        <label className="flex items-center gap-2.5 rounded-md border border-border bg-card px-3.5 py-2.5 focus-within:border-brand-violet/70">
          <Search size={16} className="text-text-muted" aria-hidden />
          <input
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder={STEP_TWO_COPY.searchPlaceholder}
            aria-label={`${STEP_TWO_COPY.searchPlaceholder} en ${label}`}
            className="min-w-0 flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-muted"
          />
        </label>
      ) : null}

      {matches.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {matches.map((campaign) => (
            <li key={campaign.id}>
              <form
                action={linkCampaignAction}
                className="flex items-center gap-3"
              >
                <input type="hidden" name="campaignId" value={campaign.id} />
                <input type="hidden" name="jobId" value={jobId} />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[13px] text-text-primary">
                    {campaign.name}
                  </span>
                  <span className="truncate text-xs text-text-muted">
                    ID {campaign.externalCampaignId}
                  </span>
                </span>
                <SecondaryButton
                  type="submit"
                  icon={null}
                  className="px-4 py-2 text-xs"
                >
                  {STEP_TWO_COPY.link}
                </SecondaryButton>
              </form>
            </li>
          ))}
        </ul>
      ) : null}

      {linked.length > 0 ? (
        linked.map((campaign) => (
          <div
            key={campaign.id}
            className="flex items-center gap-3 rounded-md border border-success/20 bg-success/[0.05] px-3.5 py-3"
          >
            <CircleCheck
              size={18}
              className="shrink-0 text-success"
              aria-hidden
            />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-[13px] font-semibold text-text-primary">
                {campaign.name}
              </span>
              <span className="truncate text-xs text-text-secondary">
                ID {campaign.externalCampaignId} · {STEP_TWO_COPY.linkedHint}
              </span>
            </div>
            <StatusBadge label={STEP_TWO_COPY.linked} tone="success" />
            <form action={linkCampaignAction}>
              <input type="hidden" name="campaignId" value={campaign.id} />
              <button
                type="submit"
                aria-label={`Desvincular ${campaign.name}`}
                className="cursor-pointer text-text-muted transition-colors hover:text-text-primary"
              >
                <X size={15} aria-hidden />
              </button>
            </form>
          </div>
        ))
      ) : connection ? (
        <p className="flex items-center gap-3 rounded-md border border-warning/20 bg-warning/[0.05] px-3.5 py-3 text-xs text-text-secondary">
          <CircleAlert
            size={18}
            className="shrink-0 text-warning"
            aria-hidden
          />
          {STEP_TWO_COPY.empty}
        </p>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] text-text-muted">
            {STEP_TWO_COPY.emptyDisconnected(label)}
          </p>
          <SecondaryLink
            href={CONNECTIONS_ROUTE}
            className="px-4 py-2 text-[13px]"
          >
            <Plug size={16} strokeWidth={2} aria-hidden />
            {STEP_TWO_COPY.connectAccount}
          </SecondaryLink>
        </div>
      )}
    </section>
  );
}

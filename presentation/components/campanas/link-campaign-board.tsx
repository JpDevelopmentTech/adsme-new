"use client";

import { CircleUser, Link2, Search, X } from "lucide-react";
import { useActionState, useMemo, useState } from "react";
import { LINK_CAMPAIGN_COPY } from "@/constants/link-campaign.constants";
import type { ConnectionPlatform } from "@/domain/entities/connection";
import { linkCampaignsAction } from "@/presentation/actions/link-campaigns-action";
import { CampaignPickerItem } from "@/presentation/components/campanas/campaign-picker-item";
import { PlatformTabs } from "@/presentation/components/campanas/platform-tabs";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SearchableSelect } from "@/presentation/components/ui/searchable-select";
import type { LinkCampaignBoardProps } from "@/types/link-campaign.types";

/** Pantalla `B8`: elegir campañas de una cuenta y asociarlas a un trabajo. */
export function LinkCampaignBoard({
  campaigns,
  connections,
  jobOptions,
}: LinkCampaignBoardProps) {
  const connected = connections.map((connection) => connection.platform);
  const [platform, setPlatform] = useState<ConnectionPlatform>(
    connected[0] ?? "meta",
  );
  const [term, setTerm] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [state, formAction, isPending] = useActionState(linkCampaignsAction, {
    message: null,
  });

  const account = connections.find((item) => item.platform === platform);

  // El filtrado es local: la lista ya está cargada y así responde al instante.
  const visible = useMemo(() => {
    const needle = term.trim().toLowerCase();

    return campaigns
      .filter((campaign) => campaign.platform === platform)
      .filter(
        (campaign) =>
          !needle ||
          campaign.name.toLowerCase().includes(needle) ||
          campaign.externalCampaignId.includes(needle),
      );
  }, [campaigns, platform, term]);

  const toggle = (campaignId: string) => {
    setSelected((current) =>
      current.includes(campaignId)
        ? current.filter((id) => id !== campaignId)
        : [...current, campaignId],
    );
  };

  const selectedCampaigns = campaigns.filter((campaign) =>
    selected.includes(campaign.id),
  );

  return (
    <form action={formAction} className="flex flex-col gap-5 xl:flex-row">
      {selected.map((campaignId) => (
        <input key={campaignId} type="hidden" name="campaignIds" value={campaignId} />
      ))}

      <section className="flex min-w-0 flex-1 flex-col gap-4 rounded-card border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <PlatformTabs
            active={platform}
            connected={connected}
            onChange={(next) => {
              setPlatform(next);
              setTerm("");
            }}
          />

          {account ? (
            <span className="flex items-center gap-2.5 rounded-md border border-border bg-card-elevated px-3.5 py-2 text-[13px] text-text-primary">
              <CircleUser size={15} className="text-text-muted" aria-hidden />
              {account.accountLabel} · {account.externalAccountId}
            </span>
          ) : null}
        </div>

        <label className="flex items-center gap-2.5 rounded-md border border-border bg-card-elevated px-3.5 py-2.5 focus-within:border-brand-violet/70">
          <Search size={17} className="text-text-muted" aria-hidden />
          <input
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder={LINK_CAMPAIGN_COPY.searchPlaceholder}
            aria-label={LINK_CAMPAIGN_COPY.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-muted"
          />
        </label>

        {!account ? (
          <p className="py-8 text-center text-[13px] text-text-muted">
            {LINK_CAMPAIGN_COPY.noConnection}
          </p>
        ) : visible.length === 0 ? (
          <p className="py-8 text-center text-[13px] text-text-muted">
            {term ? LINK_CAMPAIGN_COPY.noResults : LINK_CAMPAIGN_COPY.noCampaigns}
          </p>
        ) : (
          <ul>
            {visible.map((campaign) => (
              <CampaignPickerItem
                key={campaign.id}
                campaign={campaign}
                isSelected={selected.includes(campaign.id)}
                onToggle={toggle}
              />
            ))}
          </ul>
        )}
      </section>

      <aside className="flex flex-col gap-4 rounded-card border border-border bg-card p-5 xl:w-[360px] xl:shrink-0">
        <h2 className="font-display text-base font-semibold text-text-primary">
          {LINK_CAMPAIGN_COPY.mappingTitle}
        </h2>

        <SearchableSelect
          id="jobId"
          name="jobId"
          surface="elevated"
          label={LINK_CAMPAIGN_COPY.targetLabel}
          placeholder={LINK_CAMPAIGN_COPY.targetPlaceholder}
          options={jobOptions}
          isClearable
        />

        <div className="h-px bg-border" />

        <p className="text-[11px] font-bold tracking-[0.5px] text-text-muted">
          {LINK_CAMPAIGN_COPY.selectedLabel} · {selected.length}
        </p>

        <ul className="flex flex-col gap-2">
          {selectedCampaigns.map((campaign) => (
            <li
              key={campaign.id}
              className="flex items-center gap-2.5 rounded-md bg-card-elevated px-3 py-2.5"
            >
              <span className="min-w-0 flex-1 truncate text-xs text-text-secondary">
                {campaign.name}
              </span>
              <button
                type="button"
                onClick={() => toggle(campaign.id)}
                aria-label={`Quitar ${campaign.name}`}
                className="cursor-pointer text-text-muted transition-colors hover:text-text-primary"
              >
                <X size={15} aria-hidden />
              </button>
            </li>
          ))}
        </ul>

        {state.message ? <FormAlert message={state.message} /> : null}

        <PrimaryButton
          type="submit"
          className="w-full py-3.5"
          isLoading={isPending}
          disabled={selected.length === 0}
        >
          <Link2 size={18} strokeWidth={2} aria-hidden />
          {LINK_CAMPAIGN_COPY.submit(selected.length)}
        </PrimaryButton>

        <p className="text-xs leading-[1.4] text-text-muted">
          {LINK_CAMPAIGN_COPY.note}
        </p>
      </aside>
    </form>
  );
}

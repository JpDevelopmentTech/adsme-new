"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { CampaignSummaryProps } from "@/types/quote-campaign.types";
import { buildCampaignSummary } from "@/utils/build-campaign-summary";
import { quotePlaceNamer } from "@/utils/quote-place-namer";

/** Campaña recogida: «Clave: valor» de lo que ya está lleno, o «Sin datos todavía.». */
export function CampaignSummary({ id }: CampaignSummaryProps) {
  const { state, reference } = useQuote();
  const entries = buildCampaignSummary(state.draft, quotePlaceNamer(reference.catalog));

  if (!entries.length) return <p id={id} className="text-sm text-text-muted">{CAMPAIGN_COPY.emptySummary}</p>;
  return (
    <dl id={id} className="flex flex-col gap-1.5 text-sm">
      {entries.map((entry, index) => (
        <div key={`${entry.key}-${index}`} className="flex flex-wrap gap-x-1.5">
          <dt className="text-text-secondary">{entry.key}:</dt>
          <dd className="min-w-0 text-text-primary">{entry.value}</dd>
        </div>
      ))}
    </dl>
  );
}

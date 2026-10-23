import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import type { QuoteDraft } from "@/domain/entities/quote";
import { describeAges, describeTargetPlaces } from "@/domain/use-cases/quote/describe-quote-audience";
import { formatQuotePct } from "@/domain/use-cases/quote/format-quote-money";
import type { CampaignSummaryEntry } from "@/types/quote-campaign.types";

const COPY = CAMPAIGN_COPY.summary;

/**
 * Resumen de la campaña recogida, en el orden de la cotización: cliente,
 * proyecto, un «Target» por segmento con lugar, público, edades, género e
 * intereses. Lo vacío no aparece.
 */
export function buildCampaignSummary(draft: QuoteDraft, placeName: (code: string) => string): CampaignSummaryEntry[] {
  const targets = draft.targets
    .map((target) => ({ pct: target.pct, places: describeTargetPlaces(target, placeName) }))
    .filter((target) => target.places)
    .map((target) => ({ key: COPY.target(target.pct === null ? "" : formatQuotePct(target.pct)), value: target.places }));

  const entries: CampaignSummaryEntry[] = [
    { key: COPY.client, value: draft.artist.trim() },
    { key: COPY.project, value: draft.project.trim() },
    ...targets,
    { key: COPY.audience, value: draft.sex === "Todos" ? "" : draft.sex },
    { key: COPY.ages, value: describeAges(draft.ageFrom, draft.ageTo) },
    { key: COPY.genre, value: draft.genres.join(", ") },
    { key: COPY.interests, value: draft.interests.length ? COPY.interestsCount(draft.interests.length) : "" },
  ];
  return entries.filter((entry) => entry.value);
}

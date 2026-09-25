import type { CampaignBreakdownDraft } from "@/domain/entities/campaign-breakdown";

/** Traduce el draft a columnas; el propietario lo pone el `default` de la tabla. */
export function toCampaignBreakdownRow(draft: CampaignBreakdownDraft) {
  return {
    campaign_id: draft.campaignId,
    kind: draft.kind,
    bucket: draft.bucket,
    label: draft.label,
    impressions: draft.impressions,
  };
}

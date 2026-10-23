import type { ConnectionPlatform } from "@/domain/entities/connection";
import type { NominaCampaignSpend } from "@/domain/entities/nomina-campaign-spend";

/** Fila de la vista `nomina_campaign_spend`. `numeric` llega como texto. */
export interface CampaignSpendRow {
  client_id: string;
  job_id: string;
  job_title: string;
  usd_cop_rate: number | string | null;
  campaign_id: string;
  campaign_name: string;
  campaign_status: string;
  platform: string;
  currency: string;
  spend_month: string;
  spend: number | string;
}

/** Columnas que se leen de la vista. */
export const CAMPAIGN_SPEND_COLUMNS =
  "client_id, job_id, job_title, usd_cop_rate, campaign_id, campaign_name, campaign_status, platform, currency, spend_month, spend";

/** Gasto de campaña del dominio a partir de la fila. */
export function toCampaignSpend(row: CampaignSpendRow): NominaCampaignSpend {
  return {
    clientId: row.client_id,
    jobId: row.job_id,
    jobTitle: row.job_title,
    usdCopRate: row.usd_cop_rate === null ? null : Number(row.usd_cop_rate),
    campaignId: row.campaign_id,
    campaignName: row.campaign_name,
    campaignStatus: row.campaign_status,
    platform: row.platform as ConnectionPlatform,
    month: row.spend_month.slice(0, 7),
    spend: { amount: Number(row.spend), currency: row.currency },
  };
}

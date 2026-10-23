import type { NominaArtistCampaign, NominaCampaignSpend } from "@/domain/entities/nomina-campaign-spend";
import { campaignSpendInCop } from "@/utils/campaign-spend-in-cop";

/** Junta los meses de cada campaña y la convierte a pesos; de más a menos gasto. */
export function groupArtistCampaigns(rows: NominaCampaignSpend[]): NominaArtistCampaign[] {
  const byCampaign = new Map<string, NominaArtistCampaign>();

  for (const row of rows) {
    const current = byCampaign.get(row.campaignId);
    const amount = (current?.spend.amount ?? 0) + row.spend.amount;
    const spend = { amount, currency: row.spend.currency };
    byCampaign.set(row.campaignId, {
      campaignId: row.campaignId,
      campaignName: row.campaignName,
      campaignStatus: row.campaignStatus,
      platform: row.platform,
      jobId: row.jobId,
      jobTitle: row.jobTitle,
      spend,
      usdCopRate: row.usdCopRate,
      spendCop: campaignSpendInCop(spend, row.usdCopRate),
    });
  }

  return [...byCampaign.values()].sort((a, b) => (b.spendCop ?? 0) - (a.spendCop ?? 0));
}

import type { Money } from "@/domain/entities/money";
import type { NominaArtistCampaign } from "@/domain/entities/nomina-campaign-spend";

/** Gasto de las campañas que no se pudieron pasar a pesos, por moneda, con sus trabajos. */
export function sumUnconvertedSpend(campaigns: NominaArtistCampaign[]): { totals: Money[]; jobTitles: string[] } {
  const pending = campaigns.filter((campaign) => campaign.spendCop === null);
  const byCurrency = new Map<string, number>();
  for (const campaign of pending) byCurrency.set(campaign.spend.currency, (byCurrency.get(campaign.spend.currency) ?? 0) + campaign.spend.amount);

  return {
    totals: [...byCurrency.entries()].map(([currency, amount]) => ({ currency, amount })),
    jobTitles: [...new Set(pending.map((campaign) => campaign.jobTitle))],
  };
}

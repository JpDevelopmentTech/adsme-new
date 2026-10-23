import type { Money, SpendByCurrency } from "@/domain/entities/money";
import { addToSpend } from "@/utils/add-to-spend";

/** Gasto de un conjunto de campañas, separado por la moneda de cada cuenta. */
export function spendOfCampaigns(
  campaigns: readonly { spend: Money }[],
): SpendByCurrency {
  return campaigns.reduce<SpendByCurrency>(
    (total, campaign) =>
      addToSpend(total, campaign.spend.currency, campaign.spend.amount),
    {},
  );
}

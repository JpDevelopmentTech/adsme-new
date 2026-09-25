import type { Campaign } from "@/domain/entities/campaign";
import type { CampaignsSplit } from "@/types/campaigns-list.types";

/**
 * Reparto de lo importado para la banda de `B9`. Se calcula sobre todas las
 * campañas y no sobre las filtradas: la pregunta «¿cuánto de lo que entró ya
 * cuenta?» es del negocio entero, no de la vista que haya puesta.
 */
export function buildCampaignsSplit(campaigns: Campaign[]): CampaignsSplit {
  let linked = 0;
  let unlinked = 0;
  let unlinkedCount = 0;

  for (const campaign of campaigns) {
    if (campaign.jobId) {
      linked += campaign.spend;
    } else {
      unlinked += campaign.spend;
      unlinkedCount += 1;
    }
  }

  const total = linked + unlinked;

  return {
    linked,
    unlinked,
    unlinkedCount,
    totalCount: campaigns.length,
    // Sin inversión todavía no hay nada que repartir, pero tampoco nada suelto:
    // el riel se pinta entero como vinculado en vez de quedarse vacío.
    linkedPercent: total === 0 ? 100 : (linked / total) * 100,
  };
}

import type { Campaign } from "@/domain/entities/campaign";
import type { SpendByCurrency } from "@/domain/entities/money";
import type { CampaignsSplit } from "@/types/campaigns-list.types";
import { addToSpend } from "@/utils/add-to-spend";
import { sortCurrencies } from "@/utils/sort-currencies";

/**
 * Parte vinculada medida en la primera moneda que haya (pesos, o dólares si no
 * hay pesos). Sin nada importado el riel se pinta entero como vinculado: no hay
 * nada que repartir, pero tampoco nada suelto.
 */
function linkedPercentOf(linked: SpendByCurrency, unlinked: SpendByCurrency): number {
  const [currency] = sortCurrencies([
    ...new Set([...Object.keys(linked), ...Object.keys(unlinked)]),
  ]);
  if (!currency) return 100;

  const part = linked[currency] ?? 0;
  const total = part + (unlinked[currency] ?? 0);

  return total === 0 ? 100 : (part / total) * 100;
}

/**
 * Reparto de lo importado para la banda de `B9`. Se calcula sobre todas las
 * campañas y no sobre las filtradas: la pregunta «¿cuánto de lo que entró ya
 * cuenta?» es del negocio entero, no de la vista que haya puesta. Cada moneda
 * se suma por su lado.
 */
export function buildCampaignsSplit(campaigns: Campaign[]): CampaignsSplit {
  let linked: SpendByCurrency = {};
  let unlinked: SpendByCurrency = {};
  let unlinkedCount = 0;

  for (const { jobId, spend } of campaigns) {
    if (jobId) {
      linked = addToSpend(linked, spend.currency, spend.amount);
    } else {
      unlinked = addToSpend(unlinked, spend.currency, spend.amount);
      unlinkedCount += 1;
    }
  }

  return {
    linked,
    unlinked,
    unlinkedCount,
    totalCount: campaigns.length,
    linkedPercent: linkedPercentOf(linked, unlinked),
  };
}

import { BASE_CURRENCY } from "@/constants/currency.constants";
import type { CampaignDailyPoint } from "@/domain/entities/campaign-daily";
import type { JobPlatform } from "@/domain/entities/job";

/** Gasto real de un día, ya desglosado por plataforma. Solo pesos. */
export interface RealSpendDay {
  byPlatform: Record<JobPlatform, number>;
  total: number;
}

/**
 * Agrupa la serie diaria por fecha. Entran todas las campañas importadas,
 * estén o no vinculadas a un trabajo: el dinero salió de la cuenta publicitaria
 * igual, y el gráfico habla de inversión, no de asignación.
 *
 * La gráfica es en pesos, como el presupuesto, así que solo suma el gasto en
 * pesos; los dólares van aparte (`sumForeignDailySpend`). Aun así, un día con
 * gasto solo en dólares cuenta como día con datos reales: si no, recuperaría el
 * reparto planificado y pintaría un gasto en pesos que no ocurrió.
 */
export function groupDailySpend(
  points: CampaignDailyPoint[],
): Map<string, RealSpendDay> {
  const byDate = new Map<string, RealSpendDay>();

  for (const point of points) {
    if (point.spend.amount <= 0) continue;

    const current = byDate.get(point.date) ?? {
      byPlatform: { youtube: 0, meta: 0, tiktok: 0 },
      total: 0,
    };

    if (point.spend.currency === BASE_CURRENCY) {
      current.byPlatform[point.platform] += point.spend.amount;
      current.total += point.spend.amount;
    }

    byDate.set(point.date, current);
  }

  return byDate;
}

import type { CampaignDailyPoint } from "@/domain/entities/campaign-daily";
import type { JobPlatform } from "@/domain/entities/job";

/** Gasto real de un día, ya desglosado por plataforma. */
export interface RealSpendDay {
  byPlatform: Record<JobPlatform, number>;
  total: number;
}

/**
 * Agrupa la serie diaria por fecha. Entran todas las campañas importadas,
 * estén o no vinculadas a un trabajo: el dinero salió de la cuenta publicitaria
 * igual, y el gráfico habla de inversión, no de asignación.
 */
export function groupDailySpend(
  points: CampaignDailyPoint[],
): Map<string, RealSpendDay> {
  const byDate = new Map<string, RealSpendDay>();

  for (const point of points) {
    if (point.spend <= 0) continue;

    const current = byDate.get(point.date) ?? {
      byPlatform: { youtube: 0, meta: 0, tiktok: 0 },
      total: 0,
    };

    current.byPlatform[point.platform] += point.spend;
    current.total += point.spend;

    byDate.set(point.date, current);
  }

  return byDate;
}

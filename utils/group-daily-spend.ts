import type { CampaignDailyPoint } from "@/domain/entities/campaign-daily";
import type { JobPlatform } from "@/domain/entities/job";

/** Gasto real de un día, ya desglosado por plataforma. */
export interface RealSpendDay {
  byPlatform: Record<JobPlatform, number>;
  total: number;
}

/**
 * Agrupa la serie diaria por día del mes. Entran todas las campañas
 * importadas, estén o no vinculadas a un trabajo: el dinero salió de la cuenta
 * publicitaria igual, y el gráfico habla de inversión, no de asignación.
 */
export function groupDailySpend(
  points: CampaignDailyPoint[],
): Map<number, RealSpendDay> {
  const byDay = new Map<number, RealSpendDay>();

  for (const point of points) {
    // `YYYY-MM-DD`: el día son los dos últimos caracteres, sin pasar por `Date`.
    const day = Number(point.date.slice(8, 10));
    if (!Number.isInteger(day) || point.spend <= 0) continue;

    const current = byDay.get(day) ?? {
      byPlatform: { youtube: 0, meta: 0, tiktok: 0 },
      total: 0,
    };

    current.byPlatform[point.platform] += point.spend;
    current.total += point.spend;

    byDay.set(day, current);
  }

  return byDay;
}

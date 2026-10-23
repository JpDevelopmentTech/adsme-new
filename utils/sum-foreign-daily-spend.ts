import { BASE_CURRENCY } from "@/constants/currency.constants";
import type { CampaignDailyPoint } from "@/domain/entities/campaign-daily";
import type { SpendByCurrency } from "@/domain/entities/money";
import { addToSpend } from "@/utils/add-to-spend";

/**
 * Gasto en monedas distintas del peso hasta `today` inclusive: lo que la
 * gráfica en pesos del dashboard no puede sumar y se enseña aparte.
 */
export function sumForeignDailySpend(
  points: CampaignDailyPoint[],
  today: string,
): SpendByCurrency {
  return points.reduce<SpendByCurrency>(
    (total, point) =>
      point.spend.currency !== BASE_CURRENCY && point.date <= today
        ? addToSpend(total, point.spend.currency, point.spend.amount)
        : total,
    {},
  );
}

import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatDailyAmount } from "@/utils/format-daily-amount";

/**
 * Inversión con su reparto diario («$3,2 M · $107 K/día»). Sin período todavía
 * no hay entre cuántos días repartirla, así que se dice solo el total.
 */
export function formatInvestmentSummary(
  investment: number,
  startsOn: string,
  endsOn: string,
): string | null {
  if (investment <= 0) return null;

  const total = formatCompactCurrency(investment);
  const perDay = formatDailyAmount(investment, startsOn, endsOn);

  return perDay ? `${total} · ${perDay}` : total;
}

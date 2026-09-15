import { JOBS_COPY } from "@/constants/jobs.constants";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { daysBetween } from "@/utils/month-range";

/**
 * Inversión repartida entre los días del período («$400 K/día»). Es lo que hace
 * comparables dos pautas de duración distinta; sin importe no hay nada que decir.
 */
export function formatDailyAmount(
  investment: number,
  startsOn: string,
  endsOn: string,
): string | null {
  if (investment <= 0 || !startsOn || !endsOn || endsOn < startsOn) return null;

  const perDay = investment / daysBetween(startsOn, endsOn);

  return `${formatCompactCurrency(Math.round(perDay))}${JOBS_COPY.perDay}`;
}

import type { PacingDirection } from "@/types/dashboard-home.types";

/**
 * Dice si el gasto va por delante, por detrás o al ritmo del calendario, con el
 * mismo redondeo a puntos porcentuales que `formatPacing`.
 */
export function getPacingDirection(
  spendPercent: number,
  calendarPercent: number,
): PacingDirection {
  const points = Math.round(spendPercent - calendarPercent);

  if (points >= 1) return "ahead";
  if (points <= -1) return "behind";

  return "even";
}

/**
 * Vistas que cubre una inversión a un CPV dado. Devuelve `null` cuando el
 * cálculo no tiene sentido (sin inversión o con un CPV aún no válido).
 */
export function estimateCpvViews(
  investment: number,
  chargedCpv: number,
): number | null {
  if (investment <= 0 || !Number.isFinite(chargedCpv) || chargedCpv <= 0) {
    return null;
  }

  return Math.floor(investment / chargedCpv);
}

import { CPV_COMPARISON_COPY } from "@/constants/cpv-comparison.constants";
import type { ReportCpvComparison } from "@/types/report.types";
import { formatPercent } from "@/utils/format-compact-number";

/** Por debajo de medio punto la diferencia es ruido, no un resultado. */
const EVEN_THRESHOLD = 0.5;

/**
 * Titular del panel de CPV. Dice la verdad en ambos sentidos: si YouTube va
 * por debajo de lo presupuestado también lo cuenta, en vez de callarlo.
 */
export function buildCpvHeadline(comparison: ReportCpvComparison): string {
  const { deltaPercent, isFinished } = comparison;

  if (deltaPercent === null || Math.abs(deltaPercent) < EVEN_THRESHOLD) {
    return CPV_COMPARISON_COPY.even;
  }

  const percent = formatPercent(Math.abs(deltaPercent));

  return deltaPercent > 0
    ? CPV_COMPARISON_COPY.above(percent, isFinished)
    : CPV_COMPARISON_COPY.below(percent, isFinished);
}

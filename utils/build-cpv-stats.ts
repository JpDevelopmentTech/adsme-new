import { CPV_COMPARISON_COPY } from "@/constants/cpv-comparison.constants";
import type { ReportCpvComparison, ReportCpvStat } from "@/types/report.types";
import { formatCpv } from "@/utils/format-cpv";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatExactNumber } from "@/utils/format-exact-number";

/** Las tres cifras del panel de CPV: lo prometido, lo entregado y a qué costo. */
export function buildCpvStats(
  comparison: ReportCpvComparison,
  showSpend: boolean,
): ReportCpvStat[] {
  const charged = formatCpv(comparison.chargedCpv);

  return [
    {
      label: CPV_COMPARISON_COPY.plannedLabel,
      value: formatExactNumber(comparison.plannedViews),
      // Sin inversión visible, la nota no puede delatar el presupuesto.
      note: showSpend
        ? CPV_COMPARISON_COPY.plannedNote(
            formatExactCurrency(comparison.budget),
            charged,
          )
        : CPV_COMPARISON_COPY.plannedRate(charged),
    },
    {
      label: CPV_COMPARISON_COPY.actualLabel,
      value: formatExactNumber(comparison.actualToDate),
      note: CPV_COMPARISON_COPY.actualNote(comparison.isFinished),
    },
    {
      label: CPV_COMPARISON_COPY.effectiveLabel,
      value:
        comparison.effectiveCpv === null ? "—" : formatCpv(comparison.effectiveCpv),
      note: CPV_COMPARISON_COPY.effectiveNote(charged),
    },
  ];
}

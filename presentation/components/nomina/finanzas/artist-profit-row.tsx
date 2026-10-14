import { FINANCE_PROFIT_COPY } from "@/constants/nomina-finanzas-copy.constants";
import { ProfitMarginBar } from "@/presentation/components/nomina/finanzas/profit-margin-bar";
import { ProfitLevelBadge } from "@/presentation/components/nomina/profit-level-badge";
import type { ArtistProfitRowProps } from "@/types/nomina-finanzas-props.types";
import { cn } from "@/utils/cn";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatPercent } from "@/utils/format-percent";
import { NOMINA_ROW_CLASSES, NOMINA_TD_CLASSES } from "@/utils/nomina-table-styles";

/** Meta de Utilidad fija: «Rentable ✓» si ya se cumplió, el avance si no, «—» si no la tiene. */
function goalLabel(progress: number | null): string {
  if (progress === null) return "—";
  return progress >= 100 ? FINANCE_PROFIT_COPY.goalReached : formatPercent(progress);
}

/** Fila de un artista en la tabla de rentabilidad. */
export function ArtistProfitRow({ row }: ArtistProfitRowProps) {
  const money = cn(NOMINA_TD_CLASSES, "text-right");

  return (
    <tr className={NOMINA_ROW_CLASSES}>
      <th scope="row" className={cn(NOMINA_TD_CLASSES, "text-left font-normal text-text-primary")}>{row.name}</th>
      <td className={money}>{formatExactCurrency(row.income)}</td>
      <td className={money}>{row.shows}</td>
      <td className={money}>{formatExactCurrency(row.service)}</td>
      <td className={money}>{formatExactCurrency(row.profit)}</td>
      <td className={cn(money, "text-danger")}>{formatExactCurrency(row.taxes)}</td>
      <td className={cn(money, "font-normal text-success")}>{formatExactCurrency(row.netProfit)}</td>
      <td className={money}>{formatExactCurrency(row.investment)}</td>
      <td className={NOMINA_TD_CLASSES}>
        <ProfitMarginBar margin={row.margin} level={row.level} />
      </td>
      <td className={cn(NOMINA_TD_CLASSES, "text-center")}>
        <ProfitLevelBadge level={row.level} />
      </td>
      <td className={money}>{row.netPerShow === null ? "—" : formatExactCurrency(row.netPerShow)}</td>
      <td className={cn(money, row.fixedGoalProgress !== null && row.fixedGoalProgress >= 100 && "text-success")}>
        {goalLabel(row.fixedGoalProgress)}
      </td>
    </tr>
  );
}

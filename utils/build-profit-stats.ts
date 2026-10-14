import { HIGH_CONCENTRATION, PROFITABLE_MARGIN } from "@/constants/nomina-finanzas.constants";
import { FINANCE_PROFIT_COPY as COPY } from "@/constants/nomina-finanzas-copy.constants";
import type { ArtistProfitRow } from "@/types/nomina-finanzas.types";
import type { MiniStatProps } from "@/types/nomina-ui.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatOptionalPercent } from "@/utils/format-optional-percent";
import { shareOf } from "@/utils/share-of";

/** El artista con el mayor valor según `pick`, o `null` si no hay artistas. */
function topBy(rows: ArtistProfitRow[], pick: (row: ArtistProfitRow) => number): ArtistProfitRow | null {
  return rows.reduce<ArtistProfitRow | null>((top, row) => (!top || pick(row) > pick(top) ? row : top), null);
}

/** Los cuatro indicadores de la pestaña Rentabilidad. */
export function buildProfitStats(rows: ArtistProfitRow[]): MiniStatProps[] {
  const profitable = rows.filter((row) => (row.margin ?? 0) >= PROFITABLE_MARGIN).length;
  const topNet = topBy(rows, (row) => row.netProfit);
  const bestMargin = topBy(rows, (row) => row.margin ?? -Infinity);
  const topIncome = topBy(rows, (row) => row.income);
  const total = rows.reduce((sum, row) => sum + row.income, 0);
  const concentration = topIncome ? shareOf(topIncome.income, total) : null;

  return [
    { label: COPY.profitableLabel, value: `${profitable} de ${rows.length}`, sub: COPY.profitableSub },
    { label: COPY.topNetLabel, value: topNet?.name ?? "—", sub: topNet ? formatExactCurrency(topNet.netProfit) : undefined },
    { label: COPY.bestMarginLabel, value: bestMargin?.name ?? "—", sub: bestMargin ? formatOptionalPercent(bestMargin.margin) : undefined },
    {
      label: COPY.concentrationLabel,
      value: formatOptionalPercent(concentration),
      sub: (concentration ?? 0) > HIGH_CONCENTRATION ? COPY.concentrationHigh : COPY.concentrationSpread,
    },
  ];
}

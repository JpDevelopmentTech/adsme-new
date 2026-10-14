import { ArtistAvatar } from "@/presentation/components/nomina/artist-avatar";
import type { LedgerRowProps } from "@/types/nomina-finanzas-props.types";
import { cn } from "@/utils/cn";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatMonthShort, formatShortDate } from "@/utils/format-nomina-dates";
import { NOMINA_ROW_CLASSES, NOMINA_TD_CLASSES } from "@/utils/nomina-table-styles";

/** Un movimiento del libro con su reparto completo. */
export function LedgerRow({ entry }: LedgerRowProps) {
  const money = cn(NOMINA_TD_CLASSES, "text-right");

  return (
    <tr className={NOMINA_ROW_CLASSES}>
      <td className={NOMINA_TD_CLASSES}>{formatShortDate(entry.incomeDate)}</td>
      <td className={NOMINA_TD_CLASSES}>{formatMonthShort(entry.assignedMonth)}</td>
      <td className={NOMINA_TD_CLASSES}>
        <span className="flex items-center gap-2.5 font-normal text-text-primary">
          <ArtistAvatar name={entry.artistName} photoUrl={entry.photoUrl} size={22} />
          {entry.artistName}
        </span>
      </td>
      <td className={NOMINA_TD_CLASSES}>{entry.conceptLabel}</td>
      <td className={cn(money, "font-normal text-text-primary")}>{formatExactCurrency(entry.amount)}</td>
      <td className={money}>{formatExactCurrency(entry.service)}</td>
      <td className={money}>{formatExactCurrency(entry.profit)}</td>
      <td className={cn(money, "text-danger")}>{formatExactCurrency(entry.taxes)}</td>
      <td className={cn(money, "text-success")}>{formatExactCurrency(entry.netProfit)}</td>
      <td className={money}>{formatExactCurrency(entry.investment)}</td>
    </tr>
  );
}

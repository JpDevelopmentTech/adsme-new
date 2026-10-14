import { FINANCE_TAX_COPY } from "@/constants/nomina-finanzas-copy.constants";
import { TaxDisclaimer } from "@/presentation/components/nomina/finanzas/tax-disclaimer";
import type { ArtistTaxTableProps } from "@/types/nomina-finanzas-props.types";
import { cn } from "@/utils/cn";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatPercent } from "@/utils/format-percent";
import { NOMINA_ROW_CLASSES, NOMINA_TABLE_SCROLL_CLASSES, NOMINA_TD_CLASSES, NOMINA_TH_CLASSES } from "@/utils/nomina-table-styles";

/** Quién genera la base gravable, con el aviso de que el cálculo es informativo. */
export function ArtistTaxTable({ rows }: ArtistTaxTableProps) {
  const right = cn(NOMINA_TD_CLASSES, "text-right");

  return (
    <div className="flex flex-col gap-4">
      <div className={NOMINA_TABLE_SCROLL_CLASSES}>
        <table className="w-full min-w-[380px] border-collapse">
          <thead>
            <tr className="border-b border-border">
              {FINANCE_TAX_COPY.artistColumns.map((column, index) => (
                <th key={column} scope="col" className={cn(NOMINA_TH_CLASSES, index === 0 ? "text-left" : "text-right")}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={FINANCE_TAX_COPY.artistColumns.length} className="py-8 text-center text-sm text-text-muted">{FINANCE_TAX_COPY.artistEmpty}</td>
              </tr>
            ) : null}
            {rows.map((row) => (
              <tr key={row.id} className={NOMINA_ROW_CLASSES}>
                <th scope="row" className={cn(NOMINA_TD_CLASSES, "text-left font-normal text-text-primary")}>{row.name}</th>
                <td className={right}>{formatExactCurrency(row.base)}</td>
                <td className={cn(right, "text-danger")}>{formatExactCurrency(row.tax)}</td>
                <td className={right}>{formatPercent(row.share)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TaxDisclaimer />
    </div>
  );
}

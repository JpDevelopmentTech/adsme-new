import { FINANCE_EMPTY_COPY as EMPTY, FINANCE_TAX_COPY as COPY } from "@/constants/nomina-finanzas-copy.constants";
import { ArtistTaxTable } from "@/presentation/components/nomina/finanzas/artist-tax-table";
import { FinanceEmptyNote } from "@/presentation/components/nomina/finanzas/finance-empty-note";
import { FinanceKpiGrid } from "@/presentation/components/nomina/finanzas/finance-kpi-grid";
import { MonthlyTaxTable } from "@/presentation/components/nomina/finanzas/monthly-tax-table";
import { TaxesOverTimeChart } from "@/presentation/components/nomina/finanzas/taxes-over-time-chart";
import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import type { FinanceTabProps } from "@/types/nomina-finanzas-props.types";
import { buildArtistTaxes } from "@/utils/build-artist-taxes";
import { buildMonthlyTaxes } from "@/utils/build-monthly-taxes";
import { buildTaxKpis } from "@/utils/build-tax-kpis";

/** Tributario: lo causado en el periodo, mes a mes y por artista. */
export function TaxTab({ finance }: FinanceTabProps) {
  const monthly = buildMonthlyTaxes(finance.months);

  return (
    <>
      <FinanceKpiGrid kpis={buildTaxKpis(finance, monthly)} className="grid-cols-2 xl:grid-cols-4" />
      <NominaPanel title={COPY.chartTitle} subtitle={COPY.chartSubtitle}>
        {finance.totals.profit > 0 ? <TaxesOverTimeChart rows={monthly} /> : <FinanceEmptyNote title={EMPTY.noTaxes} />}
      </NominaPanel>
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <NominaPanel title={COPY.monthlyTitle} subtitle={COPY.monthlySubtitle} isThick>
          <MonthlyTaxTable rows={[...monthly].reverse()} />
        </NominaPanel>
        <NominaPanel title={COPY.artistTitle} subtitle={COPY.artistSubtitle} isThick>
          <ArtistTaxTable rows={buildArtistTaxes(finance.artists)} />
        </NominaPanel>
      </div>
    </>
  );
}

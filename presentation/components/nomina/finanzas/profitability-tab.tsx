import { FINANCE_NAME_LIMIT, FINANCE_SPLIT_LIMIT } from "@/constants/nomina-finanzas.constants";
import { FINANCE_EMPTY_COPY as EMPTY, FINANCE_PROFIT_COPY as COPY } from "@/constants/nomina-finanzas-copy.constants";
import { ArtistProfitTable } from "@/presentation/components/nomina/finanzas/artist-profit-table";
import { FinanceEmptyNote } from "@/presentation/components/nomina/finanzas/finance-empty-note";
import { MiniStatGrid } from "@/presentation/components/nomina/finanzas/mini-stat-grid";
import { StackedColumnsChart } from "@/presentation/components/nomina/finanzas/stacked-columns-chart";
import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import type { FinanceTabProps } from "@/types/nomina-finanzas-props.types";
import { buildArtistNetTimeline } from "@/utils/build-artist-net-timeline";
import { buildArtistSplitSeries } from "@/utils/build-artist-split-series";
import { buildArtistProfitRows } from "@/utils/build-artist-profit-rows";
import { buildProfitStats } from "@/utils/build-profit-stats";
import { formatMonthTick } from "@/utils/format-nomina-dates";
import { truncateLabel } from "@/utils/truncate-label";

/** Rentabilidad: quién deja utilidad, con qué margen y cómo se reparte cada artista; vacía si nadie ingresó en el periodo. */
export function ProfitabilityTab({ finance }: FinanceTabProps) {
  const rows = buildArtistProfitRows(finance.artists);
  const byIncome = [...rows].sort((a, b) => b.income - a.income).slice(0, FINANCE_SPLIT_LIMIT);
  const months = finance.months.map((month) => month.month);

  if (rows.length === 0) {
    return (
      <NominaPanel title={COPY.tableTitle}>
        <FinanceEmptyNote title={EMPTY.noIncome} text={EMPTY.profit} />
      </NominaPanel>
    );
  }

  return (
    <>
      <MiniStatGrid stats={buildProfitStats(rows)} className="grid-cols-2 xl:grid-cols-4" />
      <NominaPanel title={COPY.tableTitle} subtitle={COPY.tableSubtitle} isThick>
        <ArtistProfitTable rows={rows} />
      </NominaPanel>
      <div className="grid gap-5 lg:grid-cols-2">
        <NominaPanel title={COPY.splitTitle} subtitle={COPY.splitSubtitle}>
          <StackedColumnsChart
            categories={byIncome.map((row) => truncateLabel(row.name, FINANCE_NAME_LIMIT))}
            series={buildArtistSplitSeries(byIncome)}
            label={COPY.splitTitle}
          />
        </NominaPanel>
        <NominaPanel title={COPY.timelineTitle} subtitle={COPY.timelineSubtitle}>
          <StackedColumnsChart
            categories={months.map(formatMonthTick)}
            series={buildArtistNetTimeline(finance.ledger, months)}
            label={COPY.timelineTitle}
          />
        </NominaPanel>
      </div>
    </>
  );
}

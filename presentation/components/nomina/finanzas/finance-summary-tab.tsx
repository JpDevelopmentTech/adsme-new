import { FINANCE_EMPTY_COPY as EMPTY, FINANCE_SUMMARY_COPY as COPY } from "@/constants/nomina-finanzas-copy.constants";
import { BusinessHealthCard } from "@/presentation/components/nomina/finanzas/business-health-card";
import { FinanceEmptyNote } from "@/presentation/components/nomina/finanzas/finance-empty-note";
import { FinanceKpiGrid } from "@/presentation/components/nomina/finanzas/finance-kpi-grid";
import { IncomeStatementTable } from "@/presentation/components/nomina/finanzas/income-statement-table";
import { MiniStatGrid } from "@/presentation/components/nomina/finanzas/mini-stat-grid";
import { MonthlyEvolutionChart } from "@/presentation/components/nomina/finanzas/monthly-evolution-chart";
import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import type { FinanceTabProps } from "@/types/nomina-finanzas-props.types";
import { buildBusinessHealth } from "@/utils/build-business-health";
import { buildFinanceIndicators } from "@/utils/build-finance-indicators";
import { buildFinanceKpis } from "@/utils/build-finance-kpis";
import { buildIncomeStatement } from "@/utils/build-income-statement";
import { financeComparisonLabel } from "@/utils/finance-comparison-label";

/** Resumen: si el negocio es rentable, sus cifras, la evolución y el estado de resultados. */
export function FinanceSummaryTab({ finance }: FinanceTabProps) {
  const hasIncome = finance.totals.income > 0;

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-[330px_minmax(0,1fr)]">
        <BusinessHealthCard health={buildBusinessHealth(finance)} />
        <div className="flex min-w-0 flex-col gap-4">
          <FinanceKpiGrid kpis={buildFinanceKpis(finance)} comparison={financeComparisonLabel(finance.months.length)} className="sm:grid-cols-2 xl:grid-cols-3" />
          <NominaPanel title={COPY.indicatorsTitle} subtitle={COPY.indicatorsSubtitle}>
            <MiniStatGrid stats={buildFinanceIndicators(finance)} className="grid-cols-2 xl:grid-cols-4" />
          </NominaPanel>
        </div>
      </div>
      <NominaPanel title={COPY.evolutionTitle} subtitle={COPY.evolutionSubtitle}>
        {hasIncome ? <MonthlyEvolutionChart months={finance.months} /> : <FinanceEmptyNote title={EMPTY.noIncome} text={EMPTY.evolution} />}
      </NominaPanel>
      <NominaPanel title={COPY.statementTitle} subtitle={COPY.statementSubtitle} isThick>
        <IncomeStatementTable statement={buildIncomeStatement(finance.months)} />
      </NominaPanel>
    </>
  );
}

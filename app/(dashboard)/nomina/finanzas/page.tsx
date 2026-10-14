import type { Metadata } from "next";
import { FINANCE_COPY } from "@/constants/nomina-finanzas-copy.constants";
import { FINANCE_TAB_PARAM } from "@/constants/nomina-finanzas.constants";
import { createGetNominaFinance } from "@/domain/use-cases/get-nomina-finance";
import { createSampleNominaRepository } from "@/infrastructure/repositories/sample-nomina-repository";
import { FinanceTabContent } from "@/presentation/components/nomina/finanzas/finance-tab-content";
import { FinanceTabsNav } from "@/presentation/components/nomina/finanzas/finance-tabs-nav";
import { NominaTopbar } from "@/presentation/components/nomina/nomina-topbar";
import { PeriodSelector } from "@/presentation/components/nomina/period-selector";
import type { FinanzasPageProps } from "@/types/nomina-finanzas-props.types";
import { formatPeriodRange } from "@/utils/format-period-range";
import { parseFinanceTab } from "@/utils/parse-finance-tab";

export const metadata: Metadata = { title: "Finanzas · adsme" };

/**
 * Finanzas de la Nómina Plan: contabilidad, flujo de caja, rentabilidad,
 * tributario y libro del roster en el periodo, una pestaña por URL.
 */
export default async function FinanzasPage({ searchParams }: FinanzasPageProps) {
  const tab = parseFinanceTab((await searchParams)[FINANCE_TAB_PARAM]);
  const finance = await createGetNominaFinance(createSampleNominaRepository())();
  const period = formatPeriodRange(finance.fromMonth, finance.toMonth);

  return (
    <>
      <div className="flex flex-col gap-5">
        <NominaTopbar
          title={FINANCE_COPY.title}
          subtitle={`${FINANCE_COPY.subtitleLead} · ${period}`}
          action={<PeriodSelector label={FINANCE_COPY.periodLabel} range={FINANCE_COPY.periodRange} />}
        />
        <FinanceTabsNav active={tab} />
      </div>
      <FinanceTabContent tab={tab} finance={finance} />
    </>
  );
}

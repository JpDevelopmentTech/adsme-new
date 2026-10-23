import type { Metadata } from "next";
import { FINANCE_COPY } from "@/constants/nomina-finanzas-copy.constants";
import { FINANCE_TAB_PARAM } from "@/constants/nomina-finanzas.constants";
import { FINANCE_PERIOD_PARAM } from "@/constants/nomina-period.constants";
import { createGetNominaFinance } from "@/domain/use-cases/get-nomina-finance";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { createSupabaseNominaRepository } from "@/infrastructure/repositories/supabase-nomina-repository";
import { FinancePeriodSelector } from "@/presentation/components/nomina/finanzas/finance-period-selector";
import { FinanceTabContent } from "@/presentation/components/nomina/finanzas/finance-tab-content";
import { FinanceTabsNav } from "@/presentation/components/nomina/finanzas/finance-tabs-nav";
import { NominaTopbar } from "@/presentation/components/nomina/nomina-topbar";
import type { FinanzasPageProps } from "@/types/nomina-finanzas-props.types";
import { formatPeriodRange } from "@/utils/format-period-range";
import { parseFinancePeriod } from "@/utils/parse-finance-period";
import { parseFinanceTab } from "@/utils/parse-finance-tab";
import { serializeFinancePeriod } from "@/utils/serialize-finance-period";

export const metadata: Metadata = { title: "Finanzas · adsme" };

/**
 * Finanzas de la Nómina Plan: contabilidad, flujo de caja, rentabilidad,
 * tributario y libro del roster. La pestaña y el periodo viven en la URL.
 */
export default async function FinanzasPage({ searchParams }: FinanzasPageProps) {
  const params = await searchParams;
  const tab = parseFinanceTab(params[FINANCE_TAB_PARAM]);
  const selection = parseFinancePeriod(params[FINANCE_PERIOD_PARAM]);
  const finance = await createGetNominaFinance(createSupabaseNominaRepository(await createServerSupabaseClient(), new Date()))(selection);

  return (
    <>
      <div className="flex flex-col gap-5">
        <NominaTopbar
          title={FINANCE_COPY.title}
          subtitle={`${FINANCE_COPY.subtitleLead} · ${formatPeriodRange(finance.fromMonth, finance.toMonth)}`}
          action={<FinancePeriodSelector selection={selection} tab={tab} fromMonth={finance.fromMonth} toMonth={finance.toMonth} currentMonth={finance.currentMonth} />}
        />
        <FinanceTabsNav active={tab} period={serializeFinancePeriod(selection)} />
      </div>
      <FinanceTabContent tab={tab} finance={finance} />
    </>
  );
}

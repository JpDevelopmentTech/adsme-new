import { CashFlowTab } from "@/presentation/components/nomina/finanzas/cash-flow-tab";
import { FinanceSummaryTab } from "@/presentation/components/nomina/finanzas/finance-summary-tab";
import { LedgerTab } from "@/presentation/components/nomina/finanzas/ledger-tab";
import { ProfitabilityTab } from "@/presentation/components/nomina/finanzas/profitability-tab";
import { TaxTab } from "@/presentation/components/nomina/finanzas/tax-tab";
import type { FinanceTabContentProps } from "@/types/nomina-finanzas-props.types";

/** Pinta solo la pestaña activa de Finanzas. */
export function FinanceTabContent({ tab, finance }: FinanceTabContentProps) {
  switch (tab) {
    case "flujo":
      return <CashFlowTab finance={finance} />;
    case "rentabilidad":
      return <ProfitabilityTab finance={finance} />;
    case "tributario":
      return <TaxTab finance={finance} />;
    case "libro":
      return <LedgerTab finance={finance} />;
    default:
      return <FinanceSummaryTab finance={finance} />;
  }
}

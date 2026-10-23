import { FINANCE_DEFAULT_TAB, FINANCE_TAB_PARAM } from "@/constants/nomina-finanzas.constants";
import { DEFAULT_NOMINA_PERIOD } from "@/constants/nomina-default-period.constants";
import { FINANCE_PERIOD_PARAM } from "@/constants/nomina-period.constants";
import { NOMINA_FINANCE_ROUTE } from "@/constants/routes.constants";
import type { FinanceTab } from "@/types/nomina-finanzas.types";
import { serializeFinancePeriod } from "@/utils/serialize-finance-period";

const DEFAULT_PERIOD_VALUE = serializeFinancePeriod(DEFAULT_NOMINA_PERIOD);

/** URL de Finanzas con la pestaña y el periodo; los valores por defecto no se escriben. */
export function financeHref(tab: FinanceTab, period: string): string {
  const params = new URLSearchParams();
  if (tab !== FINANCE_DEFAULT_TAB) params.set(FINANCE_TAB_PARAM, tab);
  if (period !== DEFAULT_PERIOD_VALUE) params.set(FINANCE_PERIOD_PARAM, period);
  const query = params.toString();
  return query ? `${NOMINA_FINANCE_ROUTE}?${query}` : NOMINA_FINANCE_ROUTE;
}

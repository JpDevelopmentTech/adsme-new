import { FINANCE_COPY } from "@/constants/nomina-finanzas-copy.constants";
import { FINANCE_DEFAULT_TAB, FINANCE_TAB_PARAM, FINANCE_TABS } from "@/constants/nomina-finanzas.constants";
import { NOMINA_FINANCE_ROUTE } from "@/constants/routes.constants";
import { TabLinks } from "@/presentation/components/ui/tab-links";
import type { FinanceTabsNavProps } from "@/types/nomina-finanzas-props.types";

/** Pestañas de Finanzas sobre un filete; Resumen vive en la URL limpia. */
export function FinanceTabsNav({ active }: FinanceTabsNavProps) {
  const items = FINANCE_TABS.map((tab) => ({
    label: tab.label,
    href: tab.value === FINANCE_DEFAULT_TAB ? NOMINA_FINANCE_ROUTE : `${NOMINA_FINANCE_ROUTE}?${FINANCE_TAB_PARAM}=${tab.value}`,
    isActive: tab.value === active,
  }));

  return <TabLinks label={FINANCE_COPY.tabsLabel} items={items} className="border-b border-border" />;
}

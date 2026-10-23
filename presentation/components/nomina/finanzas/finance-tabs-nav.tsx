import { FINANCE_COPY } from "@/constants/nomina-finanzas-copy.constants";
import { FINANCE_TABS } from "@/constants/nomina-finanzas.constants";
import { TabLinks } from "@/presentation/components/ui/tab-links";
import type { FinanceTabsNavProps } from "@/types/nomina-finanzas-props.types";
import { financeHref } from "@/utils/finance-href";

/** Pestañas de Finanzas sobre un filete; cada una conserva el periodo elegido. */
export function FinanceTabsNav({ active, period }: FinanceTabsNavProps) {
  const items = FINANCE_TABS.map((tab) => ({
    label: tab.label,
    href: financeHref(tab.value, period),
    isActive: tab.value === active,
  }));

  return <TabLinks label={FINANCE_COPY.tabsLabel} items={items} className="border-b border-border" />;
}

import { FINANCE_DEFAULT_TAB, FINANCE_TABS } from "@/constants/nomina-finanzas.constants";
import type { FinanceTab } from "@/types/nomina-finanzas.types";

/** Pestaña de Finanzas pedida en la URL; cualquier valor desconocido vuelve a Resumen. */
export function parseFinanceTab(value: string | string[] | undefined): FinanceTab {
  const raw = Array.isArray(value) ? value[0] : value;
  return FINANCE_TABS.find((tab) => tab.value === raw)?.value ?? FINANCE_DEFAULT_TAB;
}

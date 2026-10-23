import type { NominaFinance } from "@/domain/entities/nomina-finance";
import type { FinanceFigures, FinanceKpi } from "@/types/nomina-finanzas.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatServiceAssumedNote } from "@/utils/format-service-assumed-note";
import { percentChange } from "@/utils/percent-change";
import { toFinanceFigures } from "@/utils/to-finance-figures";

const KPI_FIELDS: { label: string; field: keyof FinanceFigures }[] = [
  { label: "Ingresos brutos", field: "income" },
  { label: "Servicio", field: "service" },
  { label: "Utilidad bruta", field: "profit" },
  { label: "Impuestos (30%)", field: "taxes" },
  { label: "Utilidad neta", field: "netProfit" },
  { label: "Inversión en Ads", field: "investment" },
];

/** Las seis cifras del Resumen con su variación frente al periodo anterior. */
export function buildFinanceKpis(finance: NominaFinance): FinanceKpi[] {
  const current = toFinanceFigures(finance.totals);
  const previous = finance.previousTotals ? toFinanceFigures(finance.previousTotals) : null;

  return KPI_FIELDS.map(({ label, field }) => ({
    label,
    value: formatExactCurrency(current[field]),
    delta: percentChange(current[field], previous?.[field]),
    note: field === "service" ? formatServiceAssumedNote(finance.serviceAssumedBy, finance.artistCount) : undefined,
  }));
}

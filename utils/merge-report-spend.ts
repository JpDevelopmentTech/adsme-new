import type { ReportSpend, TrmConversion } from "@/domain/entities/report-spend";
import { EMPTY_REPORT_SPEND } from "@/constants/report-spend.constants";
import { sumSpend } from "@/utils/sum-spend";

/** Une las conversiones que comparten tasa: US$400 + US$476 a $4.000 son US$876 a $4.000. */
function mergeConversions(conversions: TrmConversion[]): TrmConversion[] {
  const byRate = new Map<number, number>();

  for (const { usd, rate } of conversions) {
    byRate.set(rate, (byRate.get(rate) ?? 0) + usd);
  }

  return [...byRate.entries()].map(([rate, usd]) => ({ usd, rate }));
}

/**
 * Suma gastos del reporte (plataformas, días, lanzamientos) sin mezclar
 * monedas: pesos con pesos, cada TRM con la suya y lo pendiente por moneda.
 */
export function mergeReportSpend(items: readonly ReportSpend[]): ReportSpend {
  if (items.length === 0) return EMPTY_REPORT_SPEND;

  return {
    nativeCop: items.reduce((total, item) => total + item.nativeCop, 0),
    conversions: mergeConversions(items.flatMap((item) => item.conversions)),
    pending: sumSpend(items.map((item) => item.pending)),
  };
}

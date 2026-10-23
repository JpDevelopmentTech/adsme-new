import { BASE_CURRENCY, TRM_CURRENCY } from "@/constants/currency.constants";
import { REPORT_SPEND_COPY } from "@/constants/report-spend.constants";
import type { ReportSpend } from "@/domain/entities/report-spend";
import type { MoneyFormatOptions, ReportSpendDisplay } from "@/types/money.types";
import { formatMoney } from "@/utils/format-money";
import { formatTrm } from "@/utils/format-trm";
import { reportSpendCop } from "@/utils/report-spend-cop";
import { splitSpendDisplay } from "@/utils/split-spend-display";

/** Línea que explica el total convertido; `null` si no se convirtió nada. */
function trmLineOf(spend: ReportSpend): string | null {
  const [first, ...others] = spend.conversions;
  if (!first) return null;

  const native =
    spend.nativeCop !== 0
      ? formatMoney(Math.round(spend.nativeCop), BASE_CURRENCY)
      : null;
  const usd = formatMoney(
    spend.conversions.reduce((total, { usd }) => total + usd, 0),
    TRM_CURRENCY,
  );

  return others.length === 0
    ? REPORT_SPEND_COPY.trmLine(native, usd, formatTrm(first.rate))
    : REPORT_SPEND_COPY.trmMulti(native, usd);
}

/**
 * Prepara el gasto del reporte para pintarlo. Con pesos o dólares convertidos,
 * la cifra es el total en pesos y la línea de la TRM dice de dónde sale; lo
 * que no se pudo convertir va aparte, en su moneda, sin sumarse. Sin nada en
 * pesos, la cifra es la primera moneda y el resto va en `extra`.
 */
export function formatReportSpend(
  spend: ReportSpend,
  options: MoneyFormatOptions = {},
): ReportSpendDisplay {
  const hasCop = spend.nativeCop !== 0 || spend.conversions.length > 0;
  const pending = splitSpendDisplay(spend.pending, options);
  const hasPending = Object.keys(spend.pending).length > 0;

  if (!hasCop && hasPending) {
    return { value: pending.primary, extra: pending.rest, trmLine: null };
  }

  return {
    value: formatMoney(reportSpendCop(spend), BASE_CURRENCY, options),
    extra: hasPending
      ? [pending.primary, pending.rest].filter(Boolean).join(" + ")
      : null,
    trmLine: trmLineOf(spend),
  };
}

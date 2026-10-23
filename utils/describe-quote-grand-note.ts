import { QUOTE_GRAND_COPY } from "@/constants/quote-summary-copy.constants";
import type { QuoteCurrency } from "@/domain/entities/quote";
import { formatQuoteMoney } from "@/domain/use-cases/quote/format-quote-money";
import type { QuoteGrandNote } from "@/types/quote-summary.types";

/**
 * Nota bajo el total general: avisa del descuadre si el total fijo no cuadra
 * con la suma de plataformas, explica el reparto o invita a escribir un total.
 */
export function describeQuoteGrandNote(isFixed: boolean, platformCount: number, sum: number, grand: number, currency: QuoteCurrency): QuoteGrandNote | null {
  const diff = isFixed ? sum - grand : 0;
  if (isFixed && platformCount && Math.abs(diff) > (currency === "COP" ? 1 : 0.01)) {
    const money = (value: number) => formatQuoteMoney(value, currency);
    return { text: `Las plataformas suman ${money(sum)} (${diff > 0 ? "+" : ""}${money(diff)}). Quita un candado o ajusta para cuadrar.`, isWarning: true };
  }
  if (isFixed) return { text: platformCount ? QUOTE_GRAND_COPY.noteSplit : QUOTE_GRAND_COPY.noteFirst, isWarning: false };
  return platformCount > 1 ? { text: QUOTE_GRAND_COPY.noteHint, isWarning: false } : null;
}

import { QUOTE_HEADER_COPY } from "@/constants/quote-summary-copy.constants";
import { QUOTE_TRM_TOLERANCE } from "@/constants/quote-summary.constants";
import type { QuoteOfficialTrm } from "@/domain/entities/quote-catalog";
import type { QuoteTrmTag } from "@/types/quote-summary.types";
import { formatQuoteShortDate } from "@/utils/format-quote-short-date";
import { formatTrmFixed } from "@/utils/format-trm-fixed";

/**
 * Etiqueta junto a la TRM: «Oficial» si coincide con la del día, «Personalizada»
 * si se escribió otra (o a mano sin oficial) y nada si no hay TRM.
 */
export function describeTrmTag(trm: number, isManual: boolean, official: QuoteOfficialTrm | null): QuoteTrmTag | null {
  if (!trm) return null;
  const day = official ? formatQuoteShortDate(official.date) : "";
  const value = official ? `$${formatTrmFixed(official.value)}` : "";
  if (official && Math.abs(trm - official.value) < QUOTE_TRM_TOLERANCE) {
    return { kind: "official", label: QUOTE_HEADER_COPY.trmOfficial, hint: `TRM oficial del ${day}: ${value} (${official.source})` };
  }
  if (!official && !isManual) return null;
  const hint = official ? `TRM escrita por ti. Toca para volver a la oficial del ${day}: ${value}` : QUOTE_HEADER_COPY.trmCustomHint;
  return { kind: "custom", label: QUOTE_HEADER_COPY.trmCustom, hint };
}

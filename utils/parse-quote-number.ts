import type { QuoteCurrency } from "@/domain/entities/quote";

/** Tipo de cifra que se escribe: importe en COP, en USD, porcentaje o TRM. */
export type QuoteNumberKind = QuoteCurrency | "pct" | "trm";

/**
 * Lee lo que escribe el usuario: en COP solo cuentan los dígitos; en USD el
 * punto es decimal; en % y TRM, la coma. Respeta el signo menos inicial.
 */
export function parseQuoteNumber(raw: string, kind: QuoteNumberKind): number {
  const negative = raw.trim().startsWith("-");
  let clean: string;
  if (kind === "COP") clean = raw.replace(/\D/g, "");
  else if (kind === "USD") clean = raw.replace(/[^\d.]/g, "");
  else clean = raw.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, "");
  const value = Number.parseFloat(clean) || 0;
  return negative ? -value : value;
}

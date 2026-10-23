import { formatTrm } from "@/domain/use-cases/quote/format-quote-money";

/** TRM como sale en los textos de la cotización: `$3.156,32 COP`. */
export function formatQuoteTrmText(trm: number): string {
  return `${formatTrm(trm)} COP`;
}

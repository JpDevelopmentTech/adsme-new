import { QUOTE_PRINT_COPY } from "@/constants/quote-summary-copy.constants";
import type { QuotePrintTotalProps } from "@/types/quote-summary.types";

/** Caja oscura del total general en el PDF. */
export function QuotePrintTotal({ amount }: QuotePrintTotalProps) {
  return (
    <div className="mt-[10pt] flex h-[48pt] break-inside-avoid items-center justify-between rounded-[6pt] bg-[#151823] px-[18pt] text-white">
      <span className="text-[9pt] font-semibold tracking-[0.8pt]">{QUOTE_PRINT_COPY.grand}</span>
      <span className="text-[18pt] font-semibold tabular-nums">{amount}</span>
    </div>
  );
}

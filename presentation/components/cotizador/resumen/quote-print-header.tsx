import Image from "next/image";
import { QUOTE_PRINT_COPY } from "@/constants/quote-summary-copy.constants";
import { QUOTE_PRINT_LOGO } from "@/constants/quote-summary.constants";
import type { QuotePrintHeaderProps } from "@/types/quote-summary.types";
import { buildQuoteReferenceCode } from "@/utils/build-quote-reference-code";
import { formatQuoteLongDate } from "@/utils/format-quote-long-date";

/** Encabezado del PDF: logo a la izquierda; «COTIZACIÓN», fecha y referencia a la derecha. */
export function QuotePrintHeader({ printedAt }: QuotePrintHeaderProps) {
  return (
    <div className="flex items-start justify-between border-b-[0.7pt] border-[#DCDFE8] pb-[12pt]">
      <Image src={QUOTE_PRINT_LOGO.src} width={QUOTE_PRINT_LOGO.width} height={QUOTE_PRINT_LOGO.height} alt={QUOTE_PRINT_COPY.logoAlt} priority className="h-[26pt] w-auto brightness-0" />
      <div className="text-right text-[9pt] leading-[12pt] text-[#5D6376]">
        <p className="font-semibold">{QUOTE_PRINT_COPY.heading}</p>
        {printedAt ? <p>{QUOTE_PRINT_COPY.date} {formatQuoteLongDate(printedAt)}</p> : null}
        {printedAt ? <p>{QUOTE_PRINT_COPY.reference} {buildQuoteReferenceCode(printedAt)}</p> : null}
      </div>
    </div>
  );
}

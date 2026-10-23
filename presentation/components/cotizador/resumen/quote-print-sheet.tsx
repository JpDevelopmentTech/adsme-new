"use client";

import { createPortal } from "react-dom";
import { QUOTE_PRINT_COPY } from "@/constants/quote-summary-copy.constants";
import { QuotePrintBlock } from "@/presentation/components/cotizador/resumen/quote-print-block";
import { QuotePrintDetails } from "@/presentation/components/cotizador/resumen/quote-print-details";
import { QuotePrintFooter } from "@/presentation/components/cotizador/resumen/quote-print-footer";
import { QuotePrintHeader } from "@/presentation/components/cotizador/resumen/quote-print-header";
import { QuotePrintPayments } from "@/presentation/components/cotizador/resumen/quote-print-payments";
import { QuotePrintSection } from "@/presentation/components/cotizador/resumen/quote-print-section";
import { QuotePrintTotal } from "@/presentation/components/cotizador/resumen/quote-print-total";
import { useIsClient } from "@/presentation/hooks/use-is-client";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { QuotePrintSheetProps } from "@/types/quote-summary.types";
import { formatQuoteTrmText } from "@/utils/format-quote-trm-text";
import { splitQuoteRow } from "@/utils/split-quote-row";

/**
 * Hoja tamaño carta del PDF. No se ve en pantalla: se monta en `body` para que
 * la impresión no la recorten los contenedores con scroll, y `@media print`
 * oculta todo lo demás.
 */
export function QuotePrintSheet({ document: quote, printedAt }: QuotePrintSheetProps) {
  const { state, reference } = useQuote();
  const isClient = useIsClient();
  if (!isClient) return null;
  const { draft } = state;
  const project = draft.project.trim();
  const details = quote.meta.filter((item) => !item.isProject);
  const currencyNote = quote.usdTrm !== null ? `${QUOTE_PRINT_COPY.usdNote} ${formatQuoteTrmText(quote.usdTrm)}.` : QUOTE_PRINT_COPY.copNote;
  const payments = draft.includePayments ? reference.paymentColumns : [];

  return createPortal(
    <div aria-hidden className="quote-print-sheet hidden min-h-[11in] w-[8.5in] flex-col bg-white font-normal text-[#151823]">
      <div className="h-[6pt] bg-[#5B3FC4]" />
      <div className="flex flex-1 flex-col px-[50pt] pt-[30pt] pb-[30pt]">
        <div className="flex-1">
          <QuotePrintHeader printedAt={printedAt} />
          <p className="mt-[22pt] text-[22pt] leading-[26pt] font-semibold">{quote.client}</p>
          {project ? <p className="mt-[4pt] text-[13pt] font-semibold text-[#5B3FC4]">{project}</p> : <p className="mt-[2pt] text-[12pt] text-[#5D6376]">{quote.subtitle}</p>}
          {details.length ? <QuotePrintDetails meta={details} /> : null}
          {quote.notes ? <QuotePrintSection title={QUOTE_PRINT_COPY.description}><p className="text-[10pt] leading-[14pt] whitespace-pre-line text-[#5D6376]">{quote.notes}</p></QuotePrintSection> : null}
          {quote.blocks.length ? (
            <QuotePrintSection title={QUOTE_PRINT_COPY.investment}>
              {quote.blocks.map((block, index) => <QuotePrintBlock key={`${index}-${block.name}`} block={block} />)}
            </QuotePrintSection>
          ) : null}
          <QuotePrintTotal amount={splitQuoteRow(quote.grandText).value} />
          <p className="mt-[14pt] text-[8.5pt] text-[#5D6376]">{currencyNote}</p>
          {quote.terms ? <QuotePrintSection title={QUOTE_PRINT_COPY.terms}><p className="text-[10pt] leading-[14pt] whitespace-pre-line text-[#5D6376]">{quote.terms}</p></QuotePrintSection> : null}
          {payments.length ? <QuotePrintPayments columns={payments} /> : null}
        </div>
        <QuotePrintFooter client={quote.client} project={project} subtitle={quote.subtitle} />
      </div>
    </div>,
    window.document.body,
  );
}

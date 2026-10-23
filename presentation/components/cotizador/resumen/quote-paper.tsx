import { QUOTE_DOCUMENT_COPY } from "@/constants/quote-summary-copy.constants";
import { QuotePaperBlock } from "@/presentation/components/cotizador/resumen/quote-paper-block";
import type { QuotePaperProps } from "@/types/quote-summary.types";
import { formatQuoteTrmText } from "@/utils/format-quote-trm-text";

/**
 * La cotización como la recibe el cliente, pintada como una hoja clara dentro
 * del vidrio: separa lo que ve el cliente de lo que solo ves tú.
 */
export function QuotePaper({ document }: QuotePaperProps) {
  const isUsd = document.usdTrm !== null;
  const trm = formatQuoteTrmText(document.usdTrm ?? 0);

  return (
    <article
      tabIndex={0}
      aria-label={document.title}
      className="max-h-[560px] overflow-y-auto overscroll-contain rounded-[18px] bg-[#FBFAFF] p-5 text-[13px] leading-relaxed break-words text-[#1A1A1A] shadow-[0_18px_40px_#05010f80] focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
    >
      <h3 className="text-[17px] leading-snug font-semibold">
        {document.title}
        <span className="block text-[13px] font-medium text-[#5D5A6B]">{document.subtitle}</span>
      </h3>
      {isUsd ? <p className="mt-2 text-[#8A4B00] italic">{QUOTE_DOCUMENT_COPY.usdHeader} {trm} {QUOTE_DOCUMENT_COPY.perDollar}</p> : null}
      {document.meta.length ? (
        <div className="mt-3">
          {document.meta.map((item, index) => <p key={`${index}-${item.label}`}><b className="font-semibold">{item.label}:</b> {item.value}</p>)}
        </div>
      ) : null}
      {document.notes ? (
        <div className="mt-3">
          <p><b className="font-semibold">{QUOTE_DOCUMENT_COPY.description}</b></p>
          <p className="whitespace-pre-line">{document.notes}</p>
        </div>
      ) : null}
      {document.blocks.length
        ? document.blocks.map((block, index) => <QuotePaperBlock key={`${block.name}-${index}`} block={block} isUsd={isUsd} />)
        : <p className="mt-4 text-[#5D5A6B]">{QUOTE_DOCUMENT_COPY.empty}</p>}
      <p className="mt-4 border-t border-[#1A1A1A1F] pt-3 text-[15px] font-semibold">{document.grandText}</p>
      {isUsd ? <p className="mt-1 italic">{QUOTE_DOCUMENT_COPY.usedTrm} {trm}</p> : null}
      {document.terms ? (
        <div className="mt-3">
          <p><b className="font-semibold">{QUOTE_DOCUMENT_COPY.terms}</b></p>
          <p className="whitespace-pre-line">{document.terms}</p>
        </div>
      ) : null}
      <p className="mt-3 font-medium text-[#5B3FC4]">{QUOTE_DOCUMENT_COPY.withdrawFrom} {document.entityName}</p>
    </article>
  );
}

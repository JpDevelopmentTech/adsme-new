import type { QuotePrintBlockProps } from "@/types/quote-summary.types";
import { cn } from "@/utils/cn";
import { splitQuoteRow } from "@/utils/split-quote-row";

/** Plataforma en el PDF: conceptos a la izquierda, valores a la derecha y descuentos en cursiva. */
export function QuotePrintBlock({ block }: QuotePrintBlockProps) {
  const total = splitQuoteRow(block.totalText);

  return (
    <div className="mb-[14pt] break-inside-avoid">
      <p className="mb-[4pt] text-[12pt] font-semibold text-[#151823]">{block.name}</p>
      {block.rows.map((row, index) => {
        const parts = splitQuoteRow(row.text);
        return (
          <p key={`${index}-${row.text}`} className={cn("flex justify-between gap-[12pt] pl-[12pt] text-[10pt] leading-[16pt]", row.isDiscount ? "text-[#A9520A] italic" : "text-[#5D6376]")}>
            <span>{parts.concept}</span>
            <span className={cn("tabular-nums", !row.isDiscount && "text-[#151823]")}>{row.isDiscount ? `- ${parts.value}` : parts.value}</span>
          </p>
        );
      })}
      <p className="mt-[4pt] flex justify-between gap-[12pt] border-t-[0.7pt] border-[#EBEDF3] pt-[6pt] pl-[12pt] text-[10.5pt] font-semibold text-[#151823]">
        <span>{total.concept}</span>
        <span className="tabular-nums">{total.value}</span>
      </p>
      {block.note ? <p className="mt-[4pt] pl-[12pt] text-[9.5pt] whitespace-pre-line text-[#5D6376] italic">{block.note}</p> : null}
    </div>
  );
}

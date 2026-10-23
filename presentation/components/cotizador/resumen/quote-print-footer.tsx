import type { QuotePrintFooterProps } from "@/types/quote-summary.types";

/** Pie del PDF: cliente, proyecto y el tipo de documento. */
export function QuotePrintFooter({ client, project, subtitle }: QuotePrintFooterProps) {
  return (
    <footer className="mt-[24pt] border-t-[0.7pt] border-[#DCDFE8] pt-[8pt] text-[8pt] text-[#5D6376]">
      {client}{project ? ` · ${project}` : ""} · {subtitle}
    </footer>
  );
}

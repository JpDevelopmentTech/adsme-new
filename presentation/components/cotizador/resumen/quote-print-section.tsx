import type { QuotePrintSectionProps } from "@/types/quote-summary.types";

/** Sección del PDF: título en mayúsculas con su regla debajo. */
export function QuotePrintSection({ title, children }: QuotePrintSectionProps) {
  return (
    <section className="mt-[18pt]">
      <h2 className="mb-[12pt] border-b-[0.7pt] border-[#DCDFE8] pb-[5pt] text-[8.5pt] font-semibold tracking-[0.8pt] text-[#5B3FC4] uppercase">{title}</h2>
      {children}
    </section>
  );
}

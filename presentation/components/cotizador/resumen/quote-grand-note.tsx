import type { QuoteGrandNoteProps } from "@/types/quote-summary.types";
import { cn } from "@/utils/cn";

/** Nota del total general; en ámbar cuando las plataformas no cuadran con el total fijo. */
export function QuoteGrandNote({ note }: QuoteGrandNoteProps) {
  return (
    <p aria-live="polite" className={cn("text-xs leading-relaxed", note.isWarning ? "text-warning" : "text-text-muted")}>
      {note.text}
    </p>
  );
}

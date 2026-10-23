"use client";

import { PLATFORM_FOOTER_COPY as COPY } from "@/constants/quote-platforms-copy.constants";
import { QuoteTextarea } from "@/presentation/components/cotizador/plataformas/quote-textarea";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { PlatformCardProps } from "@/types/quote-platforms.types";

/** «Descripción / Comentarios de {nombre}»: texto libre que sale en la cotización. */
export function PlatformNotesField({ platform }: PlatformCardProps) {
  const { dispatch } = useQuote();
  const label = (
    <span className="flex flex-wrap items-baseline gap-x-2">
      <span className="text-[13px] text-text-primary">{`${COPY.notesPrefix} ${platform.name}`}</span>
      <span className="text-xs text-text-muted">{COPY.notesNote}</span>
    </span>
  );

  return (
    <QuoteTextarea
      id={`notas-${platform.id}`}
      label={label}
      value={platform.notes}
      rows={2}
      placeholder={COPY.notesPlaceholder}
      onChange={(notes) => dispatch({ type: "setPlatformNotes", platformId: platform.id, notes })}
    />
  );
}

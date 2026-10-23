"use client";

import { PLATFORM_BODY_COPY as COPY } from "@/constants/quote-platforms-copy.constants";
import { FieldHeading } from "@/presentation/components/cotizador/plataformas/field-heading";
import { FixedTag } from "@/presentation/components/cotizador/plataformas/fixed-tag";
import { PautaLineRow } from "@/presentation/components/cotizador/plataformas/pauta-line-row";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { PlatformFiguresProps } from "@/types/quote-platforms.types";
import { cn } from "@/utils/cn";
import { findQuotePreset } from "@/utils/find-quote-preset";
import { QUOTE_TEXT_BUTTON_CLASSES } from "@/utils/quote-text-button";

/** «Pauta real en plataforma»: las líneas de resultado con su reparto y «+ Agregar línea». */
export function PautaLines({ platform, figures }: PlatformFiguresProps) {
  const { dispatch, reference } = useQuote();
  const placeholder = findQuotePreset(reference.catalog.presets, platform.key)?.linePlaceholder ?? "";
  const isFixed = platform.anchor === "pauta" && platform.lines.some((line) => line.amount);

  const addLine = () => {
    dispatch({ type: "addLine", platformId: platform.id });
    window.requestAnimationFrame(() => {
      document.querySelector<HTMLInputElement>(`#lineas-${platform.id} > li:last-child input`)?.focus();
    });
  };

  return (
    <div className="flex flex-col gap-2.5">
      <FieldHeading label={COPY.pauta} tag={isFixed ? <FixedTag label={COPY.fixedPauta} /> : null} note={COPY.pautaNote} />
      <ul id={`lineas-${platform.id}`} className="flex flex-col gap-3 sm:gap-2">
        {platform.lines.map((line, index) => (
          <PautaLineRow key={line.id} platform={platform} figures={figures} line={line} index={index} placeholder={placeholder} />
        ))}
      </ul>
      <button type="button" onClick={addLine} className={cn(QUOTE_TEXT_BUTTON_CLASSES, "self-start text-lilac")}>
        {COPY.addLine}
      </button>
    </div>
  );
}

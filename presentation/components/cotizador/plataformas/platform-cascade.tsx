"use client";

import { ChevronRight } from "lucide-react";
import { PLATFORM_BODY_COPY as COPY, QUOTE_CASCADE_COLORS, QUOTE_CASCADE_LABELS } from "@/constants/quote-platforms-copy.constants";
import { formatQuoteMoney, formatQuotePct } from "@/domain/use-cases/quote/format-quote-money";
import { CascadeBar } from "@/presentation/components/cotizador/plataformas/cascade-bar";
import { CascadeStep } from "@/presentation/components/cotizador/plataformas/cascade-step";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { CascadeStepProps, PlatformFiguresProps } from "@/types/quote-platforms.types";
import { quoteCascadeSegments } from "@/utils/quote-cascade-segments";

/**
 * Cascada del presupuesto: − servicio → valor a trabajar → − % AdsME → pauta
 * real, como pasos conectados, y debajo la barra que lo reparte.
 */
export function PlatformCascade({ platform, figures }: PlatformFiguresProps) {
  const { state } = useQuote();
  const money = (value: number) => formatQuoteMoney(value, state.draft.currency);
  const segments = quoteCascadeSegments(figures);
  const steps: CascadeStepProps[] = [
    { label: COPY.stepService, value: money(figures.service), swatch: QUOTE_CASCADE_COLORS.service },
    { label: COPY.stepWork, value: money(figures.workValue) },
    { label: `${COPY.stepFeePrefix} ${formatQuotePct(platform.fee)}${COPY.stepFeeSuffix}`, value: money(figures.fee), swatch: QUOTE_CASCADE_COLORS.fee },
    { label: COPY.stepPauta, value: money(figures.pauta), swatch: QUOTE_CASCADE_COLORS.pauta, isHighlighted: true },
  ];
  const barLabel = `${COPY.barLabel}: ${segments.map((s) => `${QUOTE_CASCADE_LABELS[s.key]} ${formatQuotePct(s.share * 100)}%`).join(", ")}`;

  return (
    <div className="flex flex-col gap-3">
      <ol className="grid grid-cols-2 gap-2 sm:flex sm:items-stretch sm:gap-1.5">
        {steps.map((step, index) => (
          <li key={step.label} className="flex min-w-0 items-center gap-1.5 sm:flex-1">
            {index > 0 ? <ChevronRight aria-hidden size={16} strokeWidth={1.5} className="hidden shrink-0 text-text-muted sm:block" /> : null}
            <CascadeStep {...step} />
          </li>
        ))}
      </ol>
      <CascadeBar segments={segments} label={barLabel} />
    </div>
  );
}

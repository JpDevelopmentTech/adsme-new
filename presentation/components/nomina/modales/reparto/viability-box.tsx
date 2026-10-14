"use client";

import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { VIABILITY_COPY } from "@/constants/nomina-modales-reparto-copy.constants";
import { MessageList } from "@/presentation/components/nomina/modales/reparto/message-list";
import { ViabilityDetail } from "@/presentation/components/nomina/modales/reparto/viability-detail";
import type { ViabilityBoxProps } from "@/types/nomina-modales-reparto.types";
import { cn } from "@/utils/cn";

/** Tinte, color e icono de cada veredicto. */
const TONES = {
  viable: { box: "border-success/35 bg-success/8", text: "text-success", Icon: CheckCircle2 },
  avisos: { box: "border-warning/40 bg-warning/8", text: "text-warning", Icon: AlertTriangle },
  noViable: { box: "border-danger/45 bg-danger/8", text: "text-danger", Icon: XCircle },
} as const;

/**
 * Caja de viabilidad del modelo: veredicto en color con icono y texto, errores
 * siempre a la vista y el resto del análisis tras «Ver detalle».
 */
export function ViabilityBox({ viability, isInitiallyOpen = false }: ViabilityBoxProps) {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  if (!viability) {
    return <p className="rounded-card border border-border bg-surface p-4 text-[13px] leading-[1.45] font-light text-text-secondary">{VIABILITY_COPY.pending}</p>;
  }

  const tone = TONES[viability.tone];
  return (
    <section aria-live="polite" className={cn("flex flex-col gap-3 rounded-card border p-4", tone.box)}>
      <div className="flex items-center justify-between gap-3">
        <p className={cn("flex items-center gap-2.5 text-sm font-normal", tone.text)}>
          <tone.Icon size={18} strokeWidth={1.75} aria-hidden />
          {VIABILITY_COPY.titles[viability.tone]}
        </p>
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="cursor-pointer rounded-sm text-[13px] font-light text-lilac hover:underline focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
        >
          {isOpen ? VIABILITY_COPY.hideDetail : VIABILITY_COPY.showDetail}
        </button>
      </div>
      <MessageList items={viability.errors} prefix="✕ " className="text-danger" />
      {isOpen ? <ViabilityDetail viability={viability} /> : null}
    </section>
  );
}

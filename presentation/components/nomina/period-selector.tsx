"use client";

import { Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";
import { PeriodPopover } from "@/presentation/components/nomina/period-popover";
import type { PeriodSelectorProps } from "@/types/nomina-ui.types";
import { cn } from "@/utils/cn";

/**
 * Botón del periodo con su rango resuelto siempre visible y el selector en un
 * popover. Hoy solo muestra el periodo por defecto: la interfaz, sin filtrar.
 */
export function PeriodSelector({ label, range }: PeriodSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex cursor-pointer items-center gap-2.5 rounded-pill border border-border-strong bg-surface px-3.5 py-[9px] text-[13px] font-normal transition-colors hover:bg-g-100 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
      >
        <Calendar size={15} strokeWidth={1.5} className="text-lilac" aria-hidden />
        {label}
        <span className="text-xs text-text-muted">{range}</span>
        <ChevronDown size={14} strokeWidth={1.5} className={cn("text-text-secondary transition-transform", isOpen && "rotate-180")} aria-hidden />
      </button>
      {isOpen ? (
        <div className="absolute top-full right-0 z-30 mt-2">
          <PeriodPopover />
        </div>
      ) : null}
    </div>
  );
}

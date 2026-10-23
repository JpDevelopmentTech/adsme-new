"use client";

import { ChevronDown } from "lucide-react";
import { DropdownMenu } from "@/presentation/components/ui/dropdown-menu";
import type { QuoteSplitButtonProps } from "@/types/quote-summary.types";
import { cn } from "@/utils/cn";

/** Botón dividido: la acción principal a la izquierda y un menú con las demás a la derecha. */
export function QuoteSplitButton({ label, hint, onClick, menuLabel, children }: QuoteSplitButtonProps) {
  return (
    <div className="flex min-w-0 flex-1 items-stretch rounded-pill bg-ink text-g-50">
      <button
        type="button"
        title={hint}
        onClick={onClick}
        className="h-11 min-w-0 flex-1 cursor-pointer rounded-l-pill pr-3 pl-5 text-sm font-normal whitespace-nowrap transition-colors hover:bg-g-700 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
      >
        <span aria-live="polite">{label}</span>
      </button>
      <span aria-hidden className="my-2.5 w-px bg-g-50/20" />
      <DropdownMenu label={menuLabel} side="top" align="end" trigger={(isOpen) => (
        <span className="grid h-11 w-11 place-items-center rounded-r-pill transition-colors hover:bg-g-700">
          <ChevronDown size={16} strokeWidth={1.8} aria-hidden className={cn("text-g-50 transition-transform", isOpen && "rotate-180")} />
        </span>
      )}>
        {children}
      </DropdownMenu>
    </div>
  );
}

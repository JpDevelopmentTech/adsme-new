import { ArrowDown } from "lucide-react";
import { PLATFORMS_BAR_COPY as COPY } from "@/constants/quote-platforms-copy.constants";

/** Antes de la primera plataforma: dice qué hacer y señala el bloque de abajo donde se hace. */
export function PlatformsEmpty() {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-dashed border-border-strong px-5 py-6 sm:px-6">
      <p className="text-lg font-light text-text-primary">{COPY.emptyTitle}</p>
      <p className="max-w-[560px] text-[13px] leading-[1.5] text-text-secondary">{COPY.emptyText}</p>
      <a href="#cotizador-agregar" className="flex h-10 w-fit items-center gap-1.5 rounded-pill text-[13px] text-lilac focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none">
        <ArrowDown size={15} strokeWidth={1.75} aria-hidden />
        {COPY.emptyHint}
      </a>
    </div>
  );
}

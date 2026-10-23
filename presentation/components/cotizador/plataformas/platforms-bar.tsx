"use client";

import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { PLATFORMS_BAR_COPY as COPY } from "@/constants/quote-platforms-copy.constants";
import { useQuote } from "@/presentation/hooks/use-quote";
import { QUOTE_TEXT_BUTTON_CLASSES } from "@/utils/quote-text-button";

/** Barra sobre las tarjetas: el rótulo «Plataformas» y recoger o expandir todas a la vez. */
export function PlatformsBar() {
  const { state, dispatch } = useQuote();
  const { platforms } = state.draft;
  if (!platforms.length) return null;
  const isAllCollapsed = platforms.every((platform) => platform.collapsed);
  const Icon = isAllCollapsed ? ChevronsUpDown : ChevronsDownUp;

  return (
    <div className="flex items-center justify-between gap-3 px-1">
      <h2 id="cotizador-plataformas" className="text-[11px] tracking-[1.4px] text-text-muted uppercase">{COPY.title}</h2>
      <button type="button" onClick={() => dispatch({ type: "collapseAllPlatforms", collapsed: !isAllCollapsed })} className={QUOTE_TEXT_BUTTON_CLASSES}>
        <Icon size={15} strokeWidth={1.75} aria-hidden />
        {isAllCollapsed ? COPY.expandAll : COPY.collapseAll}
      </button>
    </div>
  );
}

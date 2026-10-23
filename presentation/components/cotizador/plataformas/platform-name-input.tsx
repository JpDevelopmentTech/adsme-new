"use client";

import { PLATFORM_HEADER_COPY } from "@/constants/quote-platforms-copy.constants";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { PlatformCardProps } from "@/types/quote-platforms.types";
import { findQuotePreset } from "@/utils/find-quote-preset";

/** Punto del color de la plataforma y su nombre, editable en el sitio. */
export function PlatformNameInput({ platform }: PlatformCardProps) {
  const { dispatch, reference } = useQuote();
  const color = findQuotePreset(reference.catalog.presets, platform.key)?.color;

  return (
    <span className="flex min-w-0 flex-1 basis-40 items-center gap-2.5">
      <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      <input
        type="text"
        value={platform.name}
        aria-label={PLATFORM_HEADER_COPY.nameLabel}
        onChange={(event) => dispatch({ type: "renamePlatform", platformId: platform.id, name: event.target.value })}
        className="h-10 w-full min-w-0 rounded-md border border-transparent bg-transparent px-2 text-lg font-light text-text-primary outline-none hover:border-border focus:border-white/40 focus-visible:ring-2 focus-visible:ring-lilac"
      />
    </span>
  );
}

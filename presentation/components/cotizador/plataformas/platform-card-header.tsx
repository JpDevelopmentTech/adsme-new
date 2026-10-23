"use client";

import { PLATFORM_HEADER_COPY } from "@/constants/quote-platforms-copy.constants";
import { LockToggle } from "@/presentation/components/cotizador/plataformas/lock-toggle";
import { PlatformNameInput } from "@/presentation/components/cotizador/plataformas/platform-name-input";
import { PlatformStatusPills } from "@/presentation/components/cotizador/plataformas/platform-status-pills";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { PlatformHeaderProps } from "@/types/quote-platforms.types";
import { cn } from "@/utils/cn";
import { quotePlatformStatus } from "@/utils/quote-platform-status";
import { QUOTE_TEXT_BUTTON_CLASSES } from "@/utils/quote-text-button";

/** Cabecera de la tarjeta: nombre, estado, candado del total, recoger y quitar. */
export function PlatformCardHeader({ platform, figures, bodyId }: PlatformHeaderProps) {
  const { dispatch } = useQuote();
  const isOpen = !platform.collapsed;

  return (
    <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <PlatformNameInput platform={platform} />
      <PlatformStatusPills {...quotePlatformStatus(figures)} />
      <span className="ml-auto flex items-center gap-1">
        <LockToggle
          isLocked={platform.locked}
          label={PLATFORM_HEADER_COPY.lockLabel}
          lockTitle={PLATFORM_HEADER_COPY.lockTitle}
          unlockTitle={PLATFORM_HEADER_COPY.unlockTitle}
          onToggle={() => dispatch({ type: "togglePlatformLock", platformId: platform.id })}
        />
        <button type="button" aria-expanded={isOpen} aria-controls={bodyId} onClick={() => dispatch({ type: "togglePlatformCollapsed", platformId: platform.id })} className={QUOTE_TEXT_BUTTON_CLASSES}>
          {isOpen ? PLATFORM_HEADER_COPY.collapse : PLATFORM_HEADER_COPY.expand}
        </button>
        <button type="button" onClick={() => dispatch({ type: "removePlatform", platformId: platform.id })} className={cn(QUOTE_TEXT_BUTTON_CLASSES, "hover:text-danger")}>
          {PLATFORM_HEADER_COPY.remove}
        </button>
      </span>
    </header>
  );
}

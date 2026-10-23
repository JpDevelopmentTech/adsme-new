"use client";

import { Lock, LockOpen } from "lucide-react";
import type { LockToggleProps } from "@/types/quote-platforms.types";
import { cn } from "@/utils/cn";

/**
 * Candado de 40 px con estado accesible (`aria-pressed`): lila y cerrado
 * cuando fija la cifra, neutro y abierto cuando no.
 */
export function LockToggle({ isLocked, label, lockTitle, unlockTitle, onToggle, isHidden = false }: LockToggleProps) {
  const Icon = isLocked ? Lock : LockOpen;
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isLocked}
      title={isLocked ? unlockTitle : lockTitle}
      disabled={isHidden}
      aria-hidden={isHidden || undefined}
      tabIndex={isHidden ? -1 : undefined}
      onClick={onToggle}
      className={cn(
        "grid size-10 shrink-0 cursor-pointer place-items-center rounded-pill border transition-colors focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
        isLocked ? "border-lilac/50 bg-lilac/15 text-lilac" : "border-border bg-surface text-text-muted hover:border-border-strong hover:text-text-primary",
        isHidden && "invisible",
      )}
    >
      <Icon size={16} strokeWidth={1.75} aria-hidden />
    </button>
  );
}

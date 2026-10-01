"use client";

import { Check, Copy, Link2 } from "lucide-react";
import { useCopyToClipboard } from "@/presentation/hooks/use-copy-to-clipboard";
import type { CopyLinkFieldProps } from "@/types/ui.types";

/** Píldora con un enlace y un botón que lo copia al portapapeles. */
export function CopyLinkField({ url, label }: CopyLinkFieldProps) {
  const { copy, hasCopied } = useCopyToClipboard();

  return (
    <div className="flex h-10 items-center gap-2 rounded-pill border border-border bg-card-elevated pr-1 pl-3.5">
      <Link2 size={14} className="shrink-0 text-text-muted" aria-hidden />

      <span className="min-w-0 flex-1 truncate text-[13px] text-text-secondary">
        {url}
      </span>

      <button
        type="button"
        aria-label={label}
        onClick={() => copy(url)}
        className={`grid size-8 shrink-0 cursor-pointer place-items-center rounded-pill transition-colors focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none ${hasCopied ? "bg-success/16" : "bg-surface text-text-primary hover:bg-g-100"}`}
      >
        {hasCopied ? (
          <Check size={14} className="text-success" aria-hidden />
        ) : (
          <Copy size={14} aria-hidden />
        )}
      </button>

      <span role="status" aria-live="polite" className="sr-only">
        {hasCopied ? "Enlace copiado" : ""}
      </span>
    </div>
  );
}

"use client";

import { Check, Copy, Link2 } from "lucide-react";
import { useCopyToClipboard } from "@/presentation/hooks/use-copy-to-clipboard";
import type { CopyLinkFieldProps } from "@/types/ui.types";

/** Píldora con un enlace y un botón que lo copia al portapapeles. */
export function CopyLinkField({ url, label }: CopyLinkFieldProps) {
  const { copy, hasCopied } = useCopyToClipboard();

  return (
    <div className="flex items-center gap-2 rounded-pill border border-border bg-card-elevated py-[7px] pr-2.5 pl-3">
      <Link2 size={14} className="shrink-0 text-text-muted" aria-hidden />

      <span className="min-w-0 flex-1 truncate text-xs text-text-secondary">
        {url}
      </span>

      <button
        type="button"
        aria-label={label}
        onClick={() => copy(url)}
        className="shrink-0 cursor-pointer rounded-sm p-0.5 text-brand-violet transition-colors hover:text-brand-magenta focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:outline-none"
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

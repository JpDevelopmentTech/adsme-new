"use client";

import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/presentation/hooks/use-copy-to-clipboard";
import type { CopyCodeChipProps } from "@/types/ui.types";

/**
 * Píldora compacta que muestra el código de un enlace y copia la URL completa.
 * En una tabla el dominio se repite en todas las filas, así que solo el código
 * distingue una de otra.
 */
export function CopyCodeChip({ code, value, label }: CopyCodeChipProps) {
  const { copy, hasCopied } = useCopyToClipboard();

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => copy(value)}
      className="flex cursor-pointer items-center gap-1.5 rounded-pill border border-border bg-card-elevated py-1.5 pr-2.5 pl-3 transition-colors hover:border-border-strong focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:outline-none"
    >
      <span className="text-xs whitespace-nowrap text-text-secondary">
        /{code}
      </span>

      {hasCopied ? (
        <Check size={13} className="text-success" aria-hidden />
      ) : (
        <Copy size={13} className="text-brand-violet" aria-hidden />
      )}

      <span role="status" aria-live="polite" className="sr-only">
        {hasCopied ? "Enlace copiado" : ""}
      </span>
    </button>
  );
}

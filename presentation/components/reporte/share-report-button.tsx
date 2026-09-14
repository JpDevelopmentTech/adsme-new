"use client";

import { Check, Share2 } from "lucide-react";
import { REPORT_COPY } from "@/constants/report.constants";
import { useCopyToClipboard } from "@/presentation/hooks/use-copy-to-clipboard";
import { cn } from "@/utils/cn";
import type { ShareReportButtonProps } from "@/types/report.types";

/**
 * Compartir se resuelve copiando la URL: el reporte se abre sin cuenta, así que
 * el enlace es todo lo que el artista necesita reenviar.
 */
export function ShareReportButton({ url, label }: ShareReportButtonProps) {
  const { copy, hasCopied } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(url)}
      className={cn(
        "flex items-center gap-2 rounded-pill border px-[22px] py-3 text-sm font-semibold transition-colors",
        hasCopied
          ? "border-success/40 text-success"
          : "border-border-strong text-text-primary hover:bg-card",
      )}
    >
      {hasCopied ? (
        <Check size={18} aria-hidden />
      ) : (
        <Share2 size={18} aria-hidden />
      )}
      {hasCopied ? REPORT_COPY.copied : label}
    </button>
  );
}

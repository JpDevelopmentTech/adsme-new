"use client";

import { Check, Share2 } from "lucide-react";
import { REPORT_COPY } from "@/constants/report.constants";
import { useCopyToClipboard } from "@/presentation/hooks/use-copy-to-clipboard";
import type { ShareReportButtonProps } from "@/types/report.types";
import { cn } from "@/utils/cn";

/**
 * Compartir se resuelve copiando la URL: el reporte se abre sin cuenta, así que
 * el enlace es todo lo que el artista necesita reenviar. Al copiar, la píldora
 * blanca pasa a verde para confirmar sin abrir nada encima.
 */
export function ShareReportButton({ url, label }: ShareReportButtonProps) {
  const { copy, hasCopied } = useCopyToClipboard();
  const Icon = hasCopied ? Check : Share2;

  return (
    <button
      type="button"
      onClick={() => copy(url)}
      aria-live="polite"
      className={cn(
        "flex shrink-0 cursor-pointer items-center gap-2 rounded-pill border text-sm font-normal whitespace-nowrap transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
        hasCopied
          ? "border-success/35 bg-success/12 px-[18px] py-2.5 text-success"
          : "border-transparent bg-ink px-5 py-[11px] text-g-50 hover:bg-g-700",
      )}
    >
      <Icon size={16} strokeWidth={1.5} aria-hidden />
      {hasCopied ? REPORT_COPY.copied : label}
    </button>
  );
}

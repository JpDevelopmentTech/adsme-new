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
        "glass-field flex cursor-pointer items-center gap-[7px] rounded-md px-[13px] py-2 text-[12px] font-normal transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none",
        hasCopied ? "border-success/50 text-success" : "text-text-primary hover:border-border-strong",
      )}
    >
      {hasCopied ? (
        <Check size={14} strokeWidth={1.75} aria-hidden />
      ) : (
        <Share2 size={14} strokeWidth={1.5} aria-hidden />
      )}
      {hasCopied ? REPORT_COPY.copied : label}
    </button>
  );
}

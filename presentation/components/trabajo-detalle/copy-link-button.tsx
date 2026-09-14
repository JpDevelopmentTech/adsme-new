"use client";

import { Check, Copy } from "lucide-react";
import { JOB_DETAIL_COPY } from "@/constants/job-detail.constants";
import { useCopyToClipboard } from "@/presentation/hooks/use-copy-to-clipboard";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type { CopyLinkButtonProps } from "@/types/job-detail.types";

/** Copia el enlace del reporte; queda deshabilitado si aún no se ha generado. */
export function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const { copy, hasCopied } = useCopyToClipboard();

  return (
    <SecondaryButton
      type="button"
      disabled={!url}
      title={url ? undefined : JOB_DETAIL_COPY.noLink}
      onClick={() => url && copy(url)}
      icon={
        hasCopied ? (
          <Check size={18} strokeWidth={2} className="text-success" aria-hidden />
        ) : (
          <Copy size={18} strokeWidth={2} aria-hidden />
        )
      }
    >
      {JOB_DETAIL_COPY.copyLink}
    </SecondaryButton>
  );
}

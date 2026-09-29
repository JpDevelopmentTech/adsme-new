"use client";

import { Check, Link2, Link2Off } from "lucide-react";
import { useState } from "react";
import { REPORT_LINK_COPY } from "@/constants/report-link.constants";
import { JOBS_COPY } from "@/constants/jobs.constants";
import type { JobReportLinkProps } from "@/types/jobs-list.types";

/** Milisegundos que el icono se queda en «copiado» antes de volver. */
const FEEDBACK_MS = 1600;

/**
 * Enlace del reporte reducido a un icono. Antes era una columna entera que casi
 * siempre decía «Sin enlace»; ese ancho lo necesita el eje temporal, y copiar
 * sigue costando un clic.
 */
export function JobReportLink({ reportUrl, jobTitle }: JobReportLinkProps) {
  const [isCopied, setIsCopied] = useState(false);

  if (!reportUrl) {
    return (
      <span
        title={JOBS_COPY.noLink}
        className="grid size-7 place-items-center rounded-sm text-g-400"
      >
        <Link2Off size={15} strokeWidth={1.5} aria-hidden />
        <span className="sr-only">{JOBS_COPY.noLink}</span>
      </span>
    );
  }

  const copy = async () => {
    await navigator.clipboard.writeText(reportUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), FEEDBACK_MS);
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={REPORT_LINK_COPY.copy}
      aria-label={`${REPORT_LINK_COPY.copy}: ${jobTitle}`}
      className="grid size-7 cursor-pointer place-items-center rounded-sm text-text-secondary transition-colors duration-150 hover:bg-g-100 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
    >
      {isCopied ? (
        <Check size={15} strokeWidth={1.75} className="text-success" aria-hidden />
      ) : (
        <Link2 size={15} strokeWidth={1.5} aria-hidden />
      )}
    </button>
  );
}

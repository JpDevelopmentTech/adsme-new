import { Play, SkipForward } from "lucide-react";
import { REPORT_COPY } from "@/constants/report.constants";
import type { ReportAdPreviewProps } from "@/types/report.types";

/**
 * Cómo se ve el anuncio en YouTube. Es una maqueta del reproductor con la
 * portada real del lanzamiento —la etiqueta amarilla, «Saltar anuncio» y la
 * barra de progreso son los de YouTube—; no muestra suscriptores ni duración
 * porque esos datos no llegan de la plataforma.
 */
export function ReportAdPreview({ job }: ReportAdPreviewProps) {
  return (
    <section className="glass-thick flex flex-col items-center gap-8 rounded-window p-5 sm:p-7 lg:flex-row lg:gap-10">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-[20px] bg-black lg:w-[576px]">
        {job.coverUrl ? (
          <>
            {/* Portada servida desde Storage con URL pública. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={job.coverUrl} alt="" aria-hidden className="absolute inset-0 size-full scale-125 object-cover opacity-70 blur-[40px]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={job.coverUrl}
              alt={`Creativo de ${job.title}`}
              className="absolute top-[19%] left-1/2 aspect-square w-[26%] -translate-x-1/2 rounded-[14px] object-cover"
            />
          </>
        ) : null}

        <span aria-hidden className="absolute bottom-[10%] left-1/2 grid size-[60px] -translate-x-1/2 place-items-center rounded-pill bg-white/90">
          <Play size={24} strokeWidth={1.75} className="translate-x-px fill-g-50 text-g-50" />
        </span>

        <span className="absolute top-4 left-4 rounded-[6px] bg-ad-yellow px-2 py-[3px] text-[11px] font-medium text-ad-ink">
          {REPORT_COPY.adBadge}
        </span>

        <span className="absolute right-4 bottom-[18px] flex items-center gap-1.5 rounded-[4px] border border-white/30 bg-black/70 px-3 py-2 text-xs text-white">
          {REPORT_COPY.adSkip}
          <SkipForward size={13} strokeWidth={1.75} aria-hidden />
        </span>

        <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
          <span className="block h-full w-[26%] bg-ad-yellow" />
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <span className="text-[11px] font-medium tracking-[1.4px] text-text-muted uppercase">{REPORT_COPY.adEyebrow}</span>
        <h2 className="text-[32px] leading-tight font-extralight tracking-[-0.6px] text-text-primary">
          {REPORT_COPY.adPreviewTitle}
        </h2>
        <p className="text-[15px] leading-[1.6] font-light text-text-secondary">{REPORT_COPY.adBody}</p>
      </div>
    </section>
  );
}

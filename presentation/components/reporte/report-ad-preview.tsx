import { Play } from "lucide-react";
import { REPORT_COPY } from "@/constants/report.constants";
import type { ReportAdPreviewProps } from "@/types/report.types";

/**
 * Cómo se ve el anuncio en YouTube. Es una maqueta del creativo con la portada
 * real del lanzamiento; no muestra suscriptores ni duración porque esos datos
 * no llegan de la plataforma.
 */
export function ReportAdPreview({ job }: ReportAdPreviewProps) {
  return (
    <section className="glass-panel flex flex-col items-center gap-6 rounded-card p-[22px] lg:flex-row">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-tile bg-g-700 lg:w-[480px]">
        {job.coverUrl ? (
          // Portada servida desde Storage con URL pública.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={job.coverUrl}
            alt={`Creativo de ${job.title}`}
            className="size-full object-cover"
          />
        ) : null}

        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-14 place-items-center rounded-pill border border-g-50/35 bg-ink/70">
            <Play size={20} strokeWidth={1.75} className="text-g-50" aria-hidden />
          </span>
        </span>

        <span className="absolute top-3.5 left-3.5 rounded-sm bg-ink/80 px-2 py-[3px] text-[10px] text-g-50">
          {REPORT_COPY.adBadge}
        </span>

        <span className="absolute right-3.5 bottom-3.5 rounded-sm border border-g-50/25 bg-ink/80 px-[11px] py-1.5 text-[11px] text-g-50">
          {REPORT_COPY.adSkip}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <span className="text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
          {REPORT_COPY.adEyebrow}
        </span>
        <h2 className="font-display text-[19px] font-normal tracking-[-0.4px] text-text-primary">
          {REPORT_COPY.adPreviewTitle}
        </h2>
        <p className="text-[13px] leading-[1.5] text-text-secondary">
          {REPORT_COPY.adBody}
        </p>
      </div>
    </section>
  );
}

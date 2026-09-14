import { Play, SkipForward } from "lucide-react";
import { REPORT_COPY } from "@/constants/report.constants";
import { YoutubeIcon } from "@/presentation/components/ui/platform-icons/youtube-icon";
import { Avatar } from "@/presentation/components/ui/avatar";
import type { ReportAdPreviewProps } from "@/types/report.types";
import { getInitials } from "@/utils/get-initials";

/**
 * Cómo se ve el anuncio en YouTube. Es una maqueta del creativo con la portada
 * y los textos reales del lanzamiento; no muestra suscriptores ni duración
 * porque esos datos no llegan de la plataforma. Sin portada subida se pinta el
 * gradiente de marca, para que el bloque no desaparezca del reporte.
 */
export function ReportAdPreview({ job }: ReportAdPreviewProps) {
  return (
    <section className="flex flex-col gap-[18px] rounded-card border border-border bg-card p-6">
      <header className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid size-[38px] place-items-center rounded-sm bg-[#FF3B30]/12 text-[#FF3B30]"
        >
          <YoutubeIcon size={19} />
        </span>
        <h2 className="flex-1 font-display text-base font-semibold text-text-primary">
          {REPORT_COPY.adPreviewTitle}
        </h2>
        <p className="text-xs text-text-muted">{REPORT_COPY.adPreviewTag}</p>
      </header>

      <div className="flex flex-col items-center gap-6 lg:flex-row">
        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-md bg-[#0A0A0F] lg:w-[480px]">
          {job.coverUrl ? (
            // Portada servida desde Storage con URL pública.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={job.coverUrl}
              alt={`Creativo de ${job.title}`}
              className="size-full object-cover"
            />
          ) : (
            <span aria-hidden className="block size-full bg-brand-gradient" />
          )}

          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,#0A0A0F00_0%,#0A0A0FCC_100%)]"
          />

          <span
            aria-hidden
            className="absolute top-3.5 left-3.5 rounded-[4px] bg-warning px-2.5 py-[5px] text-[11px] font-bold text-white"
          >
            {REPORT_COPY.adBadge}
          </span>

          <span
            aria-hidden
            className="absolute top-4 right-4 flex items-center gap-1.5 rounded-[4px] bg-black/70 px-2.5 py-[7px] text-xs font-semibold text-white"
          >
            {REPORT_COPY.adSkip}
            <SkipForward size={14} />
          </span>

          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-pill bg-[#FF3B30] shadow-[0_0_20px_#FF3B3080]"
          >
            <Play size={28} className="fill-white text-white" />
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar
              initials={getInitials(job.clientName, "")}
              size={44}
              fontSize={16}
            />
            <p className="text-[15px] font-semibold text-text-primary">
              {job.clientName}
            </p>
          </div>

          <h3 className="font-display text-xl font-semibold text-text-primary">
            {job.title}
          </h3>

          {job.description ? (
            <p className="text-sm leading-[1.5] text-text-secondary">
              {job.description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

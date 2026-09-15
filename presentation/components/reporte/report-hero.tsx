import { REPORT_COPY } from "@/constants/report.constants";
import type { ReportHeroProps } from "@/types/report.types";
import { formatJobPeriod } from "@/utils/format-job-period";

/**
 * Portada del reporte. Abre con cuánta gente vio el lanzamiento, no con la
 * ficha del trabajo: quien recibe este enlace no compra medios, quiere saber si
 * su música llegó a alguien. La portada del sencillo va cuadrada, que es la
 * forma real de un arte de disco.
 */
export function ReportHero({ job, headline }: ReportHeroProps) {
  return (
    <section className="flex flex-col gap-7 rounded-card bg-ink/94 p-7 shadow-lift backdrop-blur-xl md:flex-row md:items-center">
      {job.coverUrl ? (
        // Portada servida desde Storage con URL pública; `next/image` no aporta aquí.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={job.coverUrl}
          alt={`Portada de ${job.title}`}
          className="aspect-square w-full shrink-0 rounded-tile object-cover md:w-60"
        />
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col items-start gap-3.5">
        <p className="flex items-center gap-[7px] rounded-pill border border-g-50/30 px-[11px] py-1">
          <span aria-hidden className="size-[7px] rounded-pill bg-accent-bright" />
          <span className="text-[11px] text-g-50">{REPORT_COPY.live}</span>
        </p>

        <div className="flex flex-col gap-[5px]">
          <p className="text-[11px] font-medium tracking-[2.6px] text-g-400 uppercase">
            {job.clientName}
          </p>
          <h1 className="font-display text-[40px] leading-[1.05] font-light tracking-[-1.4px] text-g-50">
            {job.title}
          </h1>
          <p className="text-[12.5px] text-g-400">
            {job.format} · {formatJobPeriod(job.startsOn, job.endsOn)} ·{" "}
            {REPORT_COPY.liveReport.toLowerCase()}
          </p>
        </div>

        {headline ? (
          <>
            <span aria-hidden className="h-px w-full bg-g-50/15" />

            <div className="flex flex-col gap-1">
              <p className="font-display text-[62px] leading-none font-light tracking-[-2.6px] text-g-50">
                {headline.value}
              </p>
              <p className="text-[14px] text-g-300">{headline.caption}</p>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

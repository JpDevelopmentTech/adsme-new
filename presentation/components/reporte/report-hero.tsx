import { REPORT_COPY } from "@/constants/report.constants";
import type { ReportHeroProps } from "@/types/report.types";

/**
 * Portada del reporte. Abre con cuánta gente vio el lanzamiento, no con la
 * ficha del trabajo: quien recibe este enlace no compra medios, quiere saber si
 * su música llegó a alguien. La portada del sencillo va cuadrada, que es la
 * forma real de un arte de disco, y flota con su sombra sobre el fondo.
 */
export function ReportHero({ job, headline, periodLabel }: ReportHeroProps) {
  return (
    <section className="flex flex-col gap-8 pt-6 pb-2 md:flex-row md:items-center md:gap-12">
      {job.coverUrl ? (
        // Portada servida desde Storage con URL pública; `next/image` no aporta aquí.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={job.coverUrl}
          alt={`Portada de ${job.title}`}
          className="aspect-square w-full max-w-[340px] shrink-0 rounded-[36px] border border-white/20 object-cover shadow-[0_40px_90px_#05010fcc] md:w-[260px] lg:w-[340px]"
        />
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col gap-3.5">
        <div className="flex flex-wrap items-center gap-3">
          <p className="flex items-center gap-2 rounded-pill border border-success/30 bg-success/12 px-3 py-[5px]">
            <span aria-hidden className="size-2 rounded-pill bg-success" />
            <span className="text-xs font-medium text-success">{REPORT_COPY.live}</span>
          </p>
          <p className="text-xs font-medium tracking-[1.6px] text-lilac uppercase">{job.clientName}</p>
        </div>

        <h1 className="text-[clamp(44px,7vw,76px)] leading-none font-extralight tracking-[-2.6px] text-balance text-text-primary">
          {job.title}
        </h1>
        <p className="text-[15px] font-light text-text-secondary">
          {job.format} · {periodLabel} · {REPORT_COPY.liveReport.toLowerCase()}
        </p>

        {headline ? (
          <div className="mt-3 flex flex-col gap-1.5 border-t border-white/20 pt-[26px]">
            {/* La cifra va completa, así que el cuerpo se adapta al ancho:
                a 96px fijos, siete dígitos ya se salen de un móvil. */}
            <p className="text-[clamp(52px,9vw,96px)] leading-none font-extralight tracking-[-4px] text-text-primary tabular-nums">
              {headline.value}
            </p>
            <p className="text-xl font-light text-text-secondary">{headline.caption}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

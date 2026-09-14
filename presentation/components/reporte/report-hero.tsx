import { Calendar } from "lucide-react";
import { JOB_STATUS_BADGE } from "@/constants/client-detail.constants";
import { REPORT_COPY } from "@/constants/report.constants";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { ReportHeroProps } from "@/types/report.types";
import { formatJobPeriod } from "@/utils/format-job-period";

/**
 * Portada del reporte. Abre con cuánta gente vio el lanzamiento, no con la
 * ficha del trabajo: quien recibe este enlace no compra medios, quiere saber si
 * su música llegó a alguien. La portada del sencillo va cuadrada, que es la
 * forma real de un arte de disco.
 */
export function ReportHero({ job, headline }: ReportHeroProps) {
  const status = JOB_STATUS_BADGE[job.status];

  return (
    <section className="flex flex-col-reverse gap-7 rounded-card border border-border bg-[linear-gradient(150deg,#EDE9FE_0%,#FFFFFF_75%)] p-7 md:flex-row md:items-center">
      <div className="flex min-w-0 flex-1 flex-col items-start gap-3.5">
        <StatusBadge label={status.label} tone={status.tone} />

        <p className="text-sm font-semibold tracking-[3px] text-text-secondary uppercase">
          {job.clientName}
        </p>

        <h1 className="font-display text-3xl leading-[1.1] font-bold text-text-primary lg:text-[40px]">
          {job.title}
        </h1>

        <p className="flex items-center gap-2.5 text-sm text-text-secondary">
          <Calendar size={15} aria-hidden />
          {formatJobPeriod(job.startsOn, job.endsOn)} · {job.format} ·{" "}
          {REPORT_COPY.liveReport}
        </p>

        {headline ? (
          <div className="flex flex-col gap-1.5 pt-2">
            <p
              className="font-display text-[42px] leading-[1.05] font-bold text-text-primary lg:text-[56px]"
              style={{ textShadow: "0 0 24px #7C3AED66" }}
            >
              {headline.value}
            </p>
            <p className="text-[15px] text-text-secondary">{headline.caption}</p>
          </div>
        ) : null}
      </div>

      {job.coverUrl ? (
        // Portada servida desde Storage con URL pública; `next/image` no aporta aquí.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={job.coverUrl}
          alt={`Portada de ${job.title}`}
          className="aspect-square w-full shrink-0 rounded-md object-cover md:w-[296px]"
        />
      ) : null}
    </section>
  );
}

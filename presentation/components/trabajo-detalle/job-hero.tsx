import { Calendar, CircleCheck, Disc3, ExternalLink, MicVocal, Music, RefreshCw, SlidersHorizontal } from "lucide-react";
import { JOB_STATUS_BADGE } from "@/constants/client-detail.constants";
import { JOB_DETAIL_COPY } from "@/constants/job-detail.constants";
import { JOB_FORM_FIELDS } from "@/constants/job-wizard.constants";
import { jobReportRoute } from "@/constants/routes.constants";
import { markJobFinishedAction } from "@/presentation/actions/mark-job-finished-action";
import { CopyLinkButton } from "@/presentation/components/trabajo-detalle/copy-link-button";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { JobHeroProps } from "@/types/job-detail.types";
import { formatJobPeriod } from "@/utils/format-job-period";
import { formatRelativeTime } from "@/utils/format-relative-time";

/** Cabecera del detalle: la portada grande, el título, los metadatos y las acciones. */
export function JobHero({ job, clientName, now }: JobHeroProps) {
  const status = JOB_STATUS_BADGE[job.status];

  const meta = [
    { Icon: MicVocal, text: clientName },
    { Icon: Disc3, text: `${job.format} · ${job.startsOn.slice(0, 4)}` },
    { Icon: Calendar, text: formatJobPeriod(job.startsOn, job.endsOn) },
    { Icon: RefreshCw, text: `Actualizado ${formatRelativeTime(job.updatedAt, now)}` },
  ];

  return (
    <section className="flex flex-col gap-[30px] md:flex-row md:items-end">
      {job.coverUrl ? (
        // Portada desde Storage; `next/image` no aporta a este tamaño fijo.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={job.coverUrl}
          alt=""
          className="size-[200px] shrink-0 rounded-[26px] border border-white/20 object-cover shadow-[0_24px_60px_#05010fb3]"
        />
      ) : (
        <span
          aria-hidden
          className="grid size-[200px] shrink-0 place-items-center rounded-[26px] border border-border bg-surface"
        >
          <Music size={56} strokeWidth={1.25} className="text-text-muted" />
        </span>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-3.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[11px] font-medium tracking-[1.4px] text-lilac uppercase">
            {JOB_DETAIL_COPY.eyebrow}
          </span>
          <StatusBadge label={status.label} tone={status.tone} />
        </div>

        <h1 className="text-[56px] leading-none font-extralight tracking-[-1.8px] text-text-primary">
          {job.title}
        </h1>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          {meta.map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-2 text-[13px] font-normal text-text-secondary">
              <Icon size={15} strokeWidth={1.5} className="text-text-muted" aria-hidden />
              {text}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
          <CopyLinkButton url={job.reportUrl} />

          <SecondaryLink href={jobReportRoute(job.id)}>
            <SlidersHorizontal size={16} strokeWidth={1.5} aria-hidden />
            {JOB_DETAIL_COPY.configureReport}
          </SecondaryLink>

          {job.status === "finished" ? null : (
            <form action={markJobFinishedAction}>
              <input type="hidden" name={JOB_FORM_FIELDS.jobId} value={job.id} />
              <SecondaryButton type="submit" icon={<CircleCheck size={16} strokeWidth={1.5} aria-hidden />}>
                {JOB_DETAIL_COPY.markFinished}
              </SecondaryButton>
            </form>
          )}

          {job.reportUrl ? (
            <PrimaryLink href={job.reportUrl}>
              <ExternalLink size={16} strokeWidth={1.5} aria-hidden />
              {JOB_DETAIL_COPY.viewReport}
            </PrimaryLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}

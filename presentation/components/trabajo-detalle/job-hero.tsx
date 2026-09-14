import { Calendar, Disc3, ExternalLink, Flag, Music, RefreshCw, SlidersHorizontal, User } from "lucide-react";
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

/** Cabecera del detalle: portada, identidad, metadatos y acciones. */
export function JobHero({ job, clientName, now }: JobHeroProps) {
  const status = JOB_STATUS_BADGE[job.status];

  const meta = [
    { Icon: User, text: clientName },
    { Icon: Disc3, text: `${job.format} · ${job.startsOn.slice(0, 4)}` },
    { Icon: Calendar, text: formatJobPeriod(job.startsOn, job.endsOn) },
    { Icon: RefreshCw, text: `Actualizado ${formatRelativeTime(job.updatedAt, now)}` },
  ];

  return (
    <section className="flex flex-wrap items-center gap-5 rounded-card border border-border bg-card p-6">
      {job.coverUrl ? (
        // Portada desde Storage; `next/image` no aporta a este tamaño fijo.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={job.coverUrl} alt="" className="size-[88px] shrink-0 rounded-md object-cover" />
      ) : (
        <span
          aria-hidden
          className="grid size-[88px] shrink-0 place-items-center rounded-md"
          style={{
            backgroundImage: `linear-gradient(135deg, ${job.cover.from} 0%, ${job.cover.to} 100%)`,
          }}
        >
          <Music size={32} className="text-white/80" />
        </span>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-[26px] font-bold text-text-primary">
            {job.title}
          </h1>
          <StatusBadge label={status.label} tone={status.tone} />
        </div>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          {meta.map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-2 text-[13px] text-text-secondary">
              <Icon size={15} className="text-text-muted" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <CopyLinkButton url={job.reportUrl} />

        <SecondaryLink href={jobReportRoute(job.id)}>
          <SlidersHorizontal size={18} strokeWidth={2} aria-hidden />
          {JOB_DETAIL_COPY.configureReport}
        </SecondaryLink>

        {job.status === "finished" ? null : (
          <form action={markJobFinishedAction}>
            <input type="hidden" name={JOB_FORM_FIELDS.jobId} value={job.id} />
            <SecondaryButton
              type="submit"
              icon={<Flag size={18} strokeWidth={2} aria-hidden />}
            >
              {JOB_DETAIL_COPY.markFinished}
            </SecondaryButton>
          </form>
        )}

        {job.reportUrl ? (
          <PrimaryLink href={job.reportUrl}>
            <ExternalLink size={18} strokeWidth={2} aria-hidden />
            {JOB_DETAIL_COPY.viewReport}
          </PrimaryLink>
        ) : null}
      </div>
    </section>
  );
}

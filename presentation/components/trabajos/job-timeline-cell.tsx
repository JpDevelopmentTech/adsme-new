import { JOB_COUNTDOWN_TONES, JOB_SPAN_TONES } from "@/constants/jobs.constants";
import type { JobTimelineCellProps } from "@/types/jobs-list.types";
import { positionJob } from "@/utils/build-job-timeline";
import { cn } from "@/utils/cn";
import { formatJobCountdown } from "@/utils/format-job-countdown";
import { formatJobPeriod } from "@/utils/format-job-period";
import { jobSpanTone } from "@/utils/job-span-tone";

/**
 * La ventana de la pauta sobre el eje común de la tabla: fechas y cuenta atrás
 * arriba, el tramo coloreado por estado debajo, y la marca lila de hoy de
 * arriba abajo de la celda, para que forme una sola línea a través de las filas.
 */
export function JobTimelineCell({ job, timeline, today }: JobTimelineCellProps) {
  const span = positionJob(job, timeline);
  const countdown = formatJobCountdown(job, today);
  const baseTone = jobSpanTone(job, today);
  // Un trabajo en curso que acaba en pocos días se pinta en ámbar, como su cuenta atrás.
  const tone = baseTone === "running" && countdown.tone === "warning" ? "ending" : baseTone;

  return (
    <div className="relative flex min-h-[76px] flex-col justify-center gap-3 px-2">
      <div aria-hidden className="absolute inset-x-2 inset-y-0">
        <span
          className="absolute inset-y-0 w-[1.5px] -translate-x-1/2 bg-lilac/50"
          style={{ left: `${timeline.todayPercent}%` }}
        />
      </div>

      <div className="relative flex items-center justify-between gap-3">
        <span className="text-xs font-normal whitespace-nowrap text-text-secondary">
          {formatJobPeriod(job.startsOn, job.endsOn)}
        </span>
        <span className={cn("text-xs whitespace-nowrap", JOB_COUNTDOWN_TONES[countdown.tone])}>
          {countdown.label}
        </span>
      </div>

      <div aria-hidden className="relative h-2 w-full">
        <span
          className={cn("absolute inset-y-0 rounded-pill", JOB_SPAN_TONES[tone])}
          style={{ left: `${span.leftPercent}%`, width: `${span.widthPercent}%` }}
        />
      </div>
    </div>
  );
}

import {
  JOB_COUNTDOWN_TONES,
  JOB_SPAN_TONES,
} from "@/constants/jobs.constants";
import type { JobTimelineCellProps } from "@/types/jobs-list.types";
import { positionJob } from "@/utils/build-job-timeline";
import { cn } from "@/utils/cn";
import { formatJobCountdown } from "@/utils/format-job-countdown";
import { formatJobPeriod } from "@/utils/format-job-period";
import { jobSpanTone } from "@/utils/job-span-tone";

/**
 * La ventana de la pauta sobre el eje común de la tabla. Como todas las filas
 * comparten eje, la marca de hoy cae en la misma vertical y basta bajar la
 * vista para ver qué está corriendo, qué se acaba y qué no ha empezado.
 */
export function JobTimelineCell({ job, timeline, today }: JobTimelineCellProps) {
  const span = positionJob(job, timeline);
  const countdown = formatJobCountdown(job, today);

  return (
    <div className="flex min-w-[170px] flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-xs whitespace-nowrap text-text-secondary">
          {formatJobPeriod(job.startsOn, job.endsOn)}
        </span>
        <span
          className={cn(
            "text-[11.5px] font-semibold whitespace-nowrap",
            JOB_COUNTDOWN_TONES[countdown.tone],
          )}
        >
          {countdown.label}
        </span>
      </div>

      <div aria-hidden className="relative h-[5px] w-full rounded-pill bg-surface">
        <span
          className={cn(
            "absolute inset-y-0 rounded-pill",
            JOB_SPAN_TONES[jobSpanTone(job, today)],
          )}
          style={{
            left: `${span.leftPercent}%`,
            width: `${span.widthPercent}%`,
          }}
        />
        <span
          className="absolute -top-[3px] h-[11px] w-0.5 -translate-x-1/2 rounded-[1px] bg-text-primary"
          style={{ left: `${timeline.todayPercent}%` }}
        />
      </div>
    </div>
  );
}

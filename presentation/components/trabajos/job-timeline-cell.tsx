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
 * comparten eje, la marca de hoy cae en la misma vertical en todas ellas sin
 * necesidad de dibujar nada por encima de la tabla.
 */
export function JobTimelineCell({ job, timeline, today }: JobTimelineCellProps) {
  const span = positionJob(job, timeline);
  const countdown = formatJobCountdown(job, today);

  return (
    <div className="flex flex-col gap-[7px]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11.5px] whitespace-nowrap text-text-secondary">
          {formatJobPeriod(job.startsOn, job.endsOn)}
        </span>
        <span
          className={cn(
            "text-[11.5px] font-normal whitespace-nowrap",
            JOB_COUNTDOWN_TONES[countdown.tone],
          )}
        >
          {countdown.label}
        </span>
      </div>

      <div aria-hidden className="relative h-2 w-full rounded-pill bg-g-200">
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
        {/* Asoma por arriba y por abajo del carril para seguir viéndose cuando
            el tramo del trabajo pasa justo por debajo. */}
        <span
          className="absolute -top-[3px] h-[14px] w-0.5 -translate-x-1/2 rounded-pill bg-ink"
          style={{ left: `${timeline.todayPercent}%` }}
        />
      </div>
    </div>
  );
}

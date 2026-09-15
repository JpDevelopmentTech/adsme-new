import type { JobTimeline, TimelineMonth } from "@/types/jobs-list.types";
import { SHORT_MONTHS } from "@/utils/format-job-period";
import { daysBetween } from "@/utils/month-range";

/** Separación mínima entre rótulos, en porcentaje, para que no se pisen. */
const MIN_GAP = 7;

/**
 * Rótulos de mes sobre el eje común. Dan escala a los tramos: sin ellos la
 * línea de tiempo dice qué dura más, pero no cuándo ocurre.
 */
export function buildTimelineMonths(timeline: JobTimeline): TimelineMonth[] {
  let year = Number(timeline.from.slice(0, 4));
  let month = Number(timeline.from.slice(5, 7)) - 1;

  // El primer rótulo va en el origen del eje, aunque su mes empezara antes.
  const months: TimelineMonth[] = [
    { label: SHORT_MONTHS[month], percent: 0 },
  ];

  for (let step = 0; step < 24; step += 1) {
    month += 1;

    if (month > 11) {
      month = 0;
      year += 1;
    }

    const firstDay = `${year}-${String(month + 1).padStart(2, "0")}-01`;

    if (firstDay > timeline.to) break;

    const percent =
      ((daysBetween(timeline.from, firstDay) - 1) / timeline.totalDays) * 100;
    const previous = months[months.length - 1].percent;

    if (percent - previous >= MIN_GAP && percent <= 100 - MIN_GAP) {
      months.push({ label: SHORT_MONTHS[month], percent });
    }
  }

  return months;
}

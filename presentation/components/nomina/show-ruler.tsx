import { RULER_COLORS } from "@/constants/nomina-buckets.constants";
import type { ShowRulerProps } from "@/types/nomina-ui.types";

/** Color de la barra del show `index` (desde 1) según en qué se fue su dinero. */
function colorOf(index: number, { shows, minShows, serviceShows }: ShowRulerProps["progress"]): string {
  if (index > shows) return RULER_COLORS.pending;
  if (index <= serviceShows) return RULER_COLORS.service;
  return index <= minShows ? RULER_COLORS.untilMin : RULER_COLORS.afterMin;
}

/**
 * Regla de shows: una barra por show del mes hasta la meta. Gris si cubrió el
 * Servicio, lila hasta el mínimo, verde y más alta después; un filete marca el
 * mínimo cuando se supera.
 */
export function ShowRuler({ progress, size = "sm" }: ShowRulerProps) {
  const total = Math.max(progress.shows, progress.minShows);
  const low = size === "sm" ? 10 : 12;
  const high = size === "sm" ? 16 : 18;

  return (
    <div
      role="img"
      aria-label={`${progress.shows} de ${progress.minShows} shows del mínimo`}
      className="flex w-full items-end gap-[3px]"
    >
      {Array.from({ length: total }, (_, offset) => {
        const index = offset + 1;
        return (
          <span key={index} className="contents">
            <span
              className="min-w-[3px] flex-1 rounded-[2px]"
              style={{ height: index > progress.minShows ? high : low, backgroundColor: colorOf(index, progress) }}
            />
            {index === progress.minShows && total > progress.minShows ? (
              <span aria-hidden className="w-px shrink-0 bg-white/55" style={{ height: high + 6 }} />
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

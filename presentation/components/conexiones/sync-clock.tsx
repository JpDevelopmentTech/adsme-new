import { CONNECTIONS_SUMMARY_COPY } from "@/constants/connections.constants";
import type { SyncClockProps } from "@/types/connections.types";

/** Grosor del anillo, en píxeles. */
const RING = 6;

/**
 * Cuánto falta para la próxima importación. La vida del dato de adsme depende
 * de un ciclo que se repite cada hora, y hasta ahora eso era un número suelto
 * entre otras tres cifras: aquí es el objeto que abre la pantalla.
 */
export function SyncClock({ minutesLeft, elapsedPercent }: SyncClockProps) {
  const mask = `radial-gradient(farthest-side, transparent calc(100% - ${RING}px), #000 calc(100% - ${RING}px))`;

  return (
    <div className="flex shrink-0 flex-col items-center gap-[7px]">
      <div className="relative grid size-[66px] place-items-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-pill"
          style={{
            background: `conic-gradient(var(--color-accent-bright) ${elapsedPercent}%, #1f2a271a 0)`,
            mask,
            WebkitMask: mask,
          }}
        />

        <span className="flex flex-col items-center leading-none">
          <span className="font-display text-[19px] font-light tracking-[-0.5px] text-g-50">
            {minutesLeft ?? "—"}
          </span>
          <span className="text-[9px] text-g-400">
            {minutesLeft === null ? "" : CONNECTIONS_SUMMARY_COPY.minutes}
          </span>
        </span>
      </div>

      <span className="text-[10px] font-medium tracking-[0.6px] text-g-500 uppercase">
        {CONNECTIONS_SUMMARY_COPY.nextLabel}
      </span>
    </div>
  );
}

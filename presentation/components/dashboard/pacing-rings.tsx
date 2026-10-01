import { PACING_RINGS } from "@/constants/pacing.constants";
import type { PacingRingsProps } from "@/types/dashboard-home.types";

/** Longitud del arco que ocupa `percent` en un anillo de radio `radius`. */
function arc(radius: number, percent: number): string {
  const length = 2 * Math.PI * radius;
  const filled = (Math.min(100, Math.max(0, percent)) / 100) * length;

  return `${filled} ${length}`;
}

/**
 * Ritmo del gasto en dos anillos concéntricos, al estilo del `radialBar` de
 * ApexCharts: el de fuera, blanco, es el plan gastado; el de dentro, lila, la
 * parte del período que ya pasó. Si el blanco va por delante, se gasta más rápido.
 */
export function PacingRings({
  spendPercent,
  calendarPercent,
  elapsedDays,
  totalDays,
}: PacingRingsProps) {
  const { size, outer, inner } = PACING_RINGS;
  const center = size / 2;

  return (
    <div className="flex shrink-0 flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          role="img"
          aria-label={`${Math.round(spendPercent)}% del plan gastado; día ${elapsedDays} de ${totalDays} del período`}
        >
          {[
            { ring: outer, percent: spendPercent, color: "#ffffff" },
            { ring: inner, percent: calendarPercent, color: "var(--color-lilac)" },
          ].map(({ ring, percent, color }) => (
            <g key={ring.radius}>
              <circle cx={center} cy={center} r={ring.radius} fill="none" stroke="#ffffff14" strokeWidth={ring.stroke} />
              <circle
                cx={center}
                cy={center}
                r={ring.radius}
                fill="none"
                stroke={color}
                strokeWidth={ring.stroke}
                strokeDasharray={arc(ring.radius, percent)}
              />
            </g>
          ))}
        </svg>

        <span className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[26px] leading-none font-extralight text-text-primary tabular-nums">
            {Math.round(spendPercent)}%
          </span>
          <span className="mt-1 text-[11px] font-normal text-text-muted">del plan</span>
        </span>
      </div>

      <ul className="flex flex-col gap-1 text-[11px] font-normal text-text-secondary">
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="size-[7px] rounded-pill bg-white" />
          Plan gastado · {Math.round(spendPercent)}%
        </li>
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="size-[7px] rounded-pill bg-lilac" />
          Calendario · día {elapsedDays} de {totalDays}
        </li>
      </ul>
    </div>
  );
}

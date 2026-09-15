import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { REPORT_COPY } from "@/constants/report.constants";
import { ReportGrowthColumn } from "@/presentation/components/reporte/report-growth-column";
import type { ReportGrowthPanelProps } from "@/types/report.types";
import { formatShortDate } from "@/utils/format-job-period";

/**
 * Cómo fue creciendo el lanzamiento. Una sola gráfica con las tres plataformas
 * apiladas en lugar de una curva por plataforma: el artista quiere ver sus días
 * grandes, no comparar tres dibujos idénticos separados por pantallas.
 */
/** Margen, en porcentaje, desde el que «hoy» se solaparía con los extremos. */
const EDGE_ROOM = 10;

export function ReportGrowthPanel({ growth, period }: ReportGrowthPanelProps) {
  const first = growth.days[0];
  const last = growth.days[growth.days.length - 1];

  return (
    <section className="glass-panel flex flex-col gap-[18px] rounded-card p-[22px]">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-[3px]">
          <h2 className="font-display text-[15px] font-normal tracking-[-0.2px] text-text-primary">
            {REPORT_COPY.growthTitle}
          </h2>
          <p className="text-[12px] text-text-secondary">
            {REPORT_COPY.growthSubtitle(period)}
          </p>
        </div>

        <ul className="flex flex-wrap items-center gap-3.5">
          {PLATFORM_ORDER.map((platform) => (
            <li
              key={platform}
              className="flex items-center gap-[6px] text-[10.5px] text-text-secondary"
            >
              <span
                aria-hidden
                className="size-[7px] rounded-pill"
                style={{ backgroundColor: PLATFORM_META[platform].chartColor }}
              />
              {PLATFORM_META[platform].label}
            </li>
          ))}
        </ul>
      </header>

      <div
        role="img"
        aria-label={REPORT_COPY.growthSubtitle(period)}
        className="flex h-[130px] items-stretch gap-[3px] sm:h-[150px]"
      >
        {growth.days.map((day) => (
          <ReportGrowthColumn key={day.date} day={day} peak={growth.peak} />
        ))}
      </div>

      {/* «Hoy» se sitúa por su proporción real del período, no centrado: solo
          caería bien si el lanzamiento estuviera justo por la mitad. */}
      <div className="relative flex items-center justify-between text-[10.5px] text-text-muted">
        <span>{formatShortDate(first.date)}</span>
        <span>{formatShortDate(last.date)}</span>

        {growth.todayPercent > EDGE_ROOM &&
        growth.todayPercent < 100 - EDGE_ROOM ? (
          <span
            className="absolute -translate-x-1/2 font-normal text-text-secondary"
            style={{ left: `${growth.todayPercent}%` }}
          >
            {REPORT_COPY.growthToday}
          </span>
        ) : null}
      </div>
    </section>
  );
}

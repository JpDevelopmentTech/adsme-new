import { SampleDataBadge } from "@/presentation/components/reporte/sample-data-badge";
import type { ReportTrendChartProps } from "@/types/report.types";
import { buildSeriesPath } from "@/utils/build-series-path";

const WIDTH = 660;
const HEIGHT = 200;
/** Líneas guía del fondo, en cuartos de la altura. */
const GRID = [0.25, 0.5, 0.75];

/** Evolución de las reproducciones a lo largo del período de la pauta. */
export function ReportTrendChart({
  series,
  subtitle,
  color,
  isSample = false,
}: ReportTrendChartProps) {
  const path = buildSeriesPath(series.points, WIDTH, HEIGHT);

  if (!path) return null;

  const gradientId = `trend-${color.replace("#", "")}`;

  return (
    <section className="flex flex-col gap-4 rounded-card border border-border bg-card p-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-[3px]">
          <h2 className="font-display text-[15px] font-semibold text-text-primary">
            {series.label}
          </h2>
          <p className="text-xs text-text-secondary">{subtitle}</p>
        </div>
        {isSample ? <SampleDataBadge /> : null}
      </header>

      <div className="flex flex-col gap-3">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-[200px] w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label={series.label}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.36" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>

          {GRID.map((ratio) => (
            <line
              key={ratio}
              x1="0"
              x2={WIDTH}
              y1={HEIGHT * ratio}
              y2={HEIGHT * ratio}
              stroke="currentColor"
              className="text-border"
              strokeWidth="1"
            />
          ))}

          <path d={path.area} fill={`url(#${gradientId})`} />
          <path
            d={path.line}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={path.end.x} cy={path.end.y} r="5" fill={color} />
        </svg>

        <div className="flex justify-between">
          {series.ticks.map((tick, index) => (
            <span key={`${tick}-${index}`} className="text-[11px] text-text-muted">
              {tick}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

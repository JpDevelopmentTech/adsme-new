import { Eye, Music } from "lucide-react";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { STEP_THREE_COPY } from "@/constants/report-config.constants";
import type { ReportPreviewDeviceProps } from "@/types/job-wizard.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/** Alturas de las barras del mini gráfico, tomadas del `.pen`. */
const BAR_HEIGHTS = [84, 130, 105, 164, 122, 185, 147, 200, 168, 139];

/** Maqueta reducida del reporte, para ver el efecto de cada interruptor. */
export function ReportPreviewDevice({
  job,
  clientName,
  kpis,
  platforms,
}: ReportPreviewDeviceProps) {
  return (
    <div className="flex w-full flex-col gap-3 xl:w-[380px] xl:shrink-0">
      <p className="flex items-center gap-2 text-[13px] font-semibold text-text-secondary">
        <Eye size={16} className="text-brand-violet" aria-hidden />
        {STEP_THREE_COPY.previewTitle}
      </p>

      <div className="flex flex-col overflow-hidden rounded-md border border-border-strong bg-canvas">
        <div className="flex items-center gap-3 border-b border-border bg-surface p-4">
          {job.coverUrl ? (
            // Portada desde Storage; `next/image` no aporta a este tamaño.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={job.coverUrl} alt="" className="size-10 rounded-sm object-cover" />
          ) : (
            <span
              className="grid size-10 place-items-center rounded-sm"
              style={{
                backgroundImage: `linear-gradient(135deg, ${job.cover.from} 0%, ${job.cover.to} 100%)`,
              }}
            >
              <Music size={16} className="text-white" aria-hidden />
            </span>
          )}
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[13px] font-semibold text-text-primary">
              {job.title}
            </span>
            <span className="truncate text-xs text-text-muted">
              {clientName} · {STEP_THREE_COPY.liveReport}
            </span>
          </div>
        </div>

        <div className="flex gap-2.5 p-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="flex flex-1 flex-col gap-1 rounded-sm border border-border bg-card p-2.5"
            >
              <span className="font-display text-base font-bold text-brand-violet">
                {kpi.value}
              </span>
              <span className="text-xs text-text-muted">{kpi.label}</span>
            </div>
          ))}
        </div>

        {platforms.length > 0 ? (
          <div className="flex flex-col gap-2 px-4 pb-3.5">
            <span className="text-[9px] font-bold tracking-[0.5px] text-text-muted">
              {STEP_THREE_COPY.platformsTitle}
            </span>

            {platforms.map((split) => (
              <div key={split.platform} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-medium text-text-secondary">
                    {PLATFORM_META[split.platform].label}
                  </span>
                  <span className="text-[10px] font-semibold text-text-primary">
                    {formatCompactCurrency(split.amount)}
                  </span>
                </div>
                <div className="h-1 rounded-pill bg-card-elevated">
                  <div
                    className="h-full rounded-pill"
                    style={{
                      width: `${split.percent}%`,
                      backgroundColor: PLATFORM_META[split.platform].chartColor,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div aria-hidden className="flex items-end gap-1.5 px-4 pb-4">
          {BAR_HEIGHTS.map((height, index) => (
            <span
              key={index}
              className="flex-1 rounded-[3px] bg-brand-gradient"
              style={{ height: height / 2, opacity: 0.35 + (index % 5) * 0.13 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

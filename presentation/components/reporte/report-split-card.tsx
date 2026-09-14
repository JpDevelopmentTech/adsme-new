import { PieChart } from "lucide-react";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { REPORT_COPY, REPORT_PLATFORM_BAR } from "@/constants/report.constants";
import type { ReportSplitCardProps } from "@/types/report.types";
import {
  formatCompactNumber,
  formatPercent,
  share,
} from "@/utils/format-compact-number";

/**
 * Reparto de reproducciones entre plataformas. Sustituye a la serie temporal
 * del diseño con datos que sí tenemos: los totales acumulados de cada una.
 */
export function ReportSplitCard({ platforms }: ReportSplitCardProps) {
  const total = platforms.reduce((sum, metrics) => sum + metrics.videoPlays, 0);

  if (platforms.length < 2 || total === 0) return null;

  return (
    <section className="flex flex-col gap-4 rounded-card border border-border bg-card p-5">
      <header className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="grid size-[34px] place-items-center rounded-sm bg-data-cyan/12"
        >
          <PieChart size={17} className="text-data-cyan" />
        </span>
        <div className="flex flex-col gap-[3px]">
          <h2 className="font-display text-base font-semibold text-text-primary">
            {REPORT_COPY.splitTitle}
          </h2>
          <p className="text-xs text-text-secondary">{REPORT_COPY.splitSubtitle}</p>
        </div>
      </header>

      <div className="flex flex-col gap-3">
        {platforms.map((metrics) => {
          const percent = share(metrics.videoPlays, total);

          return (
            <div key={metrics.platform} className="flex items-center gap-3">
              <span className="w-[86px] shrink-0 text-[13px] text-text-secondary">
                {PLATFORM_META[metrics.platform].label}
              </span>

              <span className="h-2.5 flex-1 overflow-hidden rounded-pill bg-surface">
                <span
                  className="block h-full rounded-pill"
                  style={{
                    width: `${percent}%`,
                    backgroundImage: REPORT_PLATFORM_BAR[metrics.platform],
                  }}
                />
              </span>

              <span className="w-[74px] shrink-0 text-right text-[13px] text-text-muted">
                {formatCompactNumber(metrics.videoPlays)}
              </span>
              <span className="w-12 shrink-0 text-right font-display text-[13px] font-semibold text-text-primary">
                {formatPercent(percent)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

import {
  REPORT_METRIC_ICONS,
  REPORT_TONE_CLASSES,
  REPORT_TONE_GLOW,
} from "@/constants/report.constants";
import type { ReportMetricCardProps } from "@/types/report.types";
import { cn } from "@/utils/cn";

/** Tarjeta de métrica del reporte: etiqueta, cifra destacada y dato de apoyo. */
export function ReportMetricCard({ metric }: ReportMetricCardProps) {
  const tone = REPORT_TONE_CLASSES[metric.tone];
  const noteTone = REPORT_TONE_CLASSES[metric.note.tone];
  const Icon = REPORT_METRIC_ICONS[metric.icon];
  const NoteIcon = REPORT_METRIC_ICONS[metric.note.icon];

  return (
    <article className="flex flex-col gap-4 rounded-card border border-border bg-card p-5">
      <header className="flex items-center justify-between gap-3">
        <h3 className="text-[13px] font-medium text-text-secondary">
          {metric.label}
        </h3>
        <span
          aria-hidden
          className={cn("grid size-[34px] place-items-center rounded-sm", tone.chip)}
        >
          <Icon size={17} className={tone.icon} />
        </span>
      </header>

      <p
        className="font-display text-[32px] leading-none font-bold text-text-primary"
        style={{ textShadow: `0 0 20px ${REPORT_TONE_GLOW[metric.tone]}` }}
      >
        {metric.value}
      </p>

      {/* La cifra de apoyo y su icono van juntos: si la etiqueta no cabe, salta
          entera de línea en vez de partir el número por la mitad. */}
      <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
        <span className="flex items-center gap-1.5">
          <NoteIcon size={15} className={noteTone.icon} aria-hidden />
          <span className={cn("text-[13px] font-semibold", noteTone.text)}>
            {metric.note.value}
          </span>
        </span>
        <span className="text-xs text-text-muted">{metric.note.label}</span>
      </p>
    </article>
  );
}

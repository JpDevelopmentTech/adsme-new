import type { ReportPanelHeaderProps } from "@/types/report.types";

/** Cabecera común de los paneles del reporte: título fino, subtítulo y lo que va a la derecha. */
export function ReportPanelHeader({ title, subtitle, aside }: ReportPanelHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex min-w-0 flex-col gap-1">
        <h2 className="text-2xl leading-tight font-light text-text-primary">{title}</h2>
        {subtitle ? <p className="text-[13px] font-normal text-text-muted">{subtitle}</p> : null}
      </div>

      {aside}
    </header>
  );
}

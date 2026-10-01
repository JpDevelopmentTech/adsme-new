import type { ReportCardHeaderProps } from "@/types/report.types";

/** Cabecera de las tarjetas de «Tu público»: icono lila en su cuadro y título. */
export function ReportCardHeader({ icon: Icon, title }: ReportCardHeaderProps) {
  return (
    <header className="flex items-center gap-2.5">
      <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-[12px] bg-surface">
        <Icon size={17} strokeWidth={1.5} className="text-lilac" />
      </span>
      <h3 className="text-xl font-light text-text-primary">{title}</h3>
    </header>
  );
}

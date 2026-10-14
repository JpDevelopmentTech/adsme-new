import type { NominaPanelProps } from "@/types/nomina-ui.types";
import { cn } from "@/utils/cn";

/**
 * Panel de vidrio de la nómina: medio para lo que se mira de un vistazo, grueso
 * para lo que se lee en filas. Cabecera opcional con título, subtítulo y acciones.
 */
export function NominaPanel({ title, subtitle, isThick = false, actions, className, children }: NominaPanelProps) {
  return (
    <section className={cn(isThick ? "glass-thick" : "glass-panel", "flex min-w-0 flex-col gap-[18px] rounded-card p-6", className)}>
      {title ? (
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <h2 className="text-lg font-light text-text-primary">{title}</h2>
            {subtitle ? <p className="text-[13px] leading-[1.4] text-text-muted">{subtitle}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2.5">{actions}</div> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}

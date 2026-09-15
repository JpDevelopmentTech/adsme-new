import type { PageHeaderProps } from "@/types/dashboard.types";

/**
 * Cabecera de un bloque de contenido. El `h1` de la pantalla lo pone ya la
 * topbar, así que aquí el título baja a `h2` y sirve de rótulo de la sección.
 */
export function PageHeader({
  title,
  subtitle,
  hasStatusDot = false,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-[19px] font-normal tracking-[-0.4px] text-text-primary">
          {title}
        </h2>
        {subtitle ? (
          <p className="flex items-center gap-2 text-[12px] text-text-secondary">
            {hasStatusDot ? (
              <span aria-hidden className="size-[6px] bg-g-600" />
            ) : null}
            {subtitle}
          </p>
        ) : null}
      </div>

      {actions ? <div className="flex items-center gap-2.5">{actions}</div> : null}
    </div>
  );
}

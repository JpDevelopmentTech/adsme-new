import type { PageHeaderProps } from "@/types/dashboard.types";

/** Encabezado del área de contenido: título, estado de sincronización y acciones. */
export function PageHeader({
  title,
  subtitle,
  hasStatusDot = false,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-col gap-[5px]">
        <h1 className="font-display text-[26px] font-bold text-text-primary">
          {title}
        </h1>
        {subtitle ? (
          <p className="flex items-center gap-2 text-[13px] text-text-secondary">
            {hasStatusDot ? (
              <span aria-hidden className="size-[7px] rounded-full bg-success" />
            ) : null}
            {subtitle}
          </p>
        ) : null}
      </div>

      {actions ? <div className="flex items-center gap-2.5">{actions}</div> : null}
    </div>
  );
}

import { Search } from "lucide-react";
import { NOMINA_SHELL_COPY } from "@/constants/nomina-copy.constants";
import { NotificationsButton } from "@/presentation/components/dashboard/notifications-button";
import type { NominaTopbarProps } from "@/types/nomina-ui.types";

/**
 * Cabecera de las pantallas de la nómina: título con su subtítulo y, a la
 * derecha, el buscador de artistas, las notificaciones y la acción principal.
 */
export function NominaTopbar({ title, subtitle, hasSearch = false, action }: NominaTopbarProps) {
  return (
    <header className="flex flex-wrap items-center gap-3">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h1 className="text-[28px] leading-tight font-light tracking-[-0.5px] text-text-primary">{title}</h1>
        {subtitle ? <p className="text-[13px] text-text-muted">{subtitle}</p> : null}
      </div>

      {hasSearch ? (
        <>
          <label className="hidden h-[42px] w-[300px] items-center gap-2.5 rounded-pill border border-border bg-surface px-4 md:flex">
            <Search size={16} strokeWidth={1.5} className="shrink-0 text-text-muted" aria-hidden />
            <span className="sr-only">{NOMINA_SHELL_COPY.searchLabel}</span>
            <input
              type="search"
              name="q"
              placeholder={NOMINA_SHELL_COPY.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-muted"
            />
          </label>
          <NotificationsButton />
        </>
      ) : null}

      {action}
    </header>
  );
}

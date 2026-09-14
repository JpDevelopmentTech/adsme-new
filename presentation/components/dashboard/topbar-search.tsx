import { Search } from "lucide-react";
import { TOPBAR_COPY } from "@/constants/dashboard-copy.constants";

/** Buscador global de la topbar, con el atajo de teclado indicado a la derecha. */
export function TopbarSearch() {
  return (
    <label className="flex w-[420px] max-w-full items-center gap-[11px] rounded-md border border-border bg-card px-4 py-[11px] transition-colors focus-within:border-brand-violet/70">
      <Search size={18} strokeWidth={1.75} className="text-text-muted" aria-hidden />
      <input
        type="search"
        placeholder={TOPBAR_COPY.searchPlaceholder}
        aria-label={TOPBAR_COPY.searchLabel}
        className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
      />
      <kbd className="rounded-sm border border-border bg-card-elevated px-2 py-[3px] text-[11px] font-semibold text-text-secondary">
        ⌘K
      </kbd>
    </label>
  );
}

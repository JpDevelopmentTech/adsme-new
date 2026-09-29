import { Search } from "lucide-react";
import { TOPBAR_COPY } from "@/constants/dashboard-copy.constants";

/** Buscador global de la topbar, con el atajo de teclado indicado a la derecha. */
export function TopbarSearch() {
  return (
    <label className="flex w-[260px] max-w-full items-center gap-[9px] rounded-md border border-border bg-card px-[11px] py-2 transition-colors duration-150 focus-within:border-border-strong">
      <Search size={15} strokeWidth={1.5} className="text-text-muted" aria-hidden />
      <input
        type="search"
        placeholder={TOPBAR_COPY.searchPlaceholder}
        aria-label={TOPBAR_COPY.searchLabel}
        className="min-w-0 flex-1 bg-transparent text-[12.5px] text-text-primary outline-none placeholder:text-text-muted"
      />
      <kbd className="rounded-sm border border-border px-[6px] py-px text-[10px] font-normal text-text-muted">
        ⌘K
      </kbd>
    </label>
  );
}

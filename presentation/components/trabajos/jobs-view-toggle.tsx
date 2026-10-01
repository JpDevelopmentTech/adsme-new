import { LayoutGrid, List } from "lucide-react";
import { JOBS_COPY } from "@/constants/jobs.constants";

/**
 * Selector de vista. La rejilla queda deshabilitada mientras no exista su
 * diseño, pero se muestra para que se vea en qué vista estás.
 */
export function JobsViewToggle() {
  return (
    <div className="flex h-10 shrink-0 items-center gap-0.5 rounded-pill border border-border bg-surface p-1">
      <span
        aria-current="true"
        className="grid h-full w-8 place-items-center rounded-pill bg-ink text-g-50"
      >
        <List size={15} strokeWidth={1.5} aria-hidden />
        <span className="sr-only">{JOBS_COPY.listView}</span>
      </span>

      <button
        type="button"
        disabled
        title={JOBS_COPY.gridPending}
        className="grid h-full w-8 cursor-not-allowed place-items-center rounded-pill text-text-primary opacity-35"
      >
        <LayoutGrid size={15} strokeWidth={1.5} aria-hidden />
        <span className="sr-only">{JOBS_COPY.gridView}</span>
      </button>
    </div>
  );
}

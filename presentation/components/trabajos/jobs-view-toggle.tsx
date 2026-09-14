import { LayoutGrid, List } from "lucide-react";
import { JOBS_COPY } from "@/constants/jobs.constants";

/**
 * Selector de vista. La rejilla queda deshabilitada mientras no exista su
 * diseño, pero se muestra para que se vea en qué vista estás.
 */
export function JobsViewToggle() {
  return (
    <div className="flex shrink-0 items-center gap-0.5 rounded-pill border border-border bg-surface p-[3px]">
      <span
        aria-current="true"
        className="grid size-[30px] place-items-center rounded-pill bg-brand-violet/15 text-brand-violet"
      >
        <List size={15} aria-hidden />
        <span className="sr-only">{JOBS_COPY.listView}</span>
      </span>

      <button
        type="button"
        disabled
        title={JOBS_COPY.gridPending}
        className="grid size-[30px] cursor-not-allowed place-items-center rounded-pill text-text-muted"
      >
        <LayoutGrid size={15} aria-hidden />
        <span className="sr-only">{JOBS_COPY.gridView}</span>
      </button>
    </div>
  );
}

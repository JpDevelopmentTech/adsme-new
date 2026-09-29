import { LayoutGrid, List } from "lucide-react";
import { JOBS_COPY } from "@/constants/jobs.constants";

/**
 * Selector de vista. La rejilla queda deshabilitada mientras no exista su
 * diseño, pero se muestra para que se vea en qué vista estás.
 */
export function JobsViewToggle() {
  return (
    <div className="flex shrink-0 items-center gap-0.5 rounded-md bg-g-200 p-[3px]">
      <span
        aria-current="true"
        className="grid size-7 place-items-center rounded-sm bg-white/95 text-text-primary shadow-[0_1px_3px_#1f2a271a]"
      >
        <List size={15} strokeWidth={1.5} aria-hidden />
        <span className="sr-only">{JOBS_COPY.listView}</span>
      </span>

      <button
        type="button"
        disabled
        title={JOBS_COPY.gridPending}
        className="grid size-7 cursor-not-allowed place-items-center rounded-sm text-g-400"
      >
        <LayoutGrid size={15} strokeWidth={1.5} aria-hidden />
        <span className="sr-only">{JOBS_COPY.gridView}</span>
      </button>
    </div>
  );
}

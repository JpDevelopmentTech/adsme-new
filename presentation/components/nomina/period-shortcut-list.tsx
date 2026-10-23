import { PERIOD_COPY } from "@/constants/nomina-period.constants";
import type { PeriodShortcutListProps } from "@/types/nomina-period.types";
import { cn } from "@/utils/cn";

/** Columna de atajos del selector de periodo, con el elegido resaltado. */
export function PeriodShortcutList({ shortcuts, onSelect }: PeriodShortcutListProps) {
  return (
    <ul className="flex w-[170px] shrink-0 flex-col gap-0.5 border-border pr-3.5 max-sm:w-full sm:border-r">
      <li className="pb-1 text-[10px] tracking-[1.2px] text-text-muted uppercase">{PERIOD_COPY.shortcutsTitle}</li>
      {shortcuts.map((shortcut) => (
        <li key={shortcut.id}>
          <button
            type="button"
            aria-pressed={shortcut.isActive}
            onClick={() => onSelect?.(shortcut.id)}
            className={cn("w-full cursor-pointer rounded-sm px-2.5 py-2 text-left text-[13px]", shortcut.isActive ? "bg-lilac/12 font-normal text-lilac" : "text-text-secondary hover:bg-surface")}
          >
            {shortcut.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

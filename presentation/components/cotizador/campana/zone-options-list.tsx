"use client";

import { CAMPAIGN_COPY } from "@/constants/quote-campaign-copy.constants";
import { FloatingPanel } from "@/presentation/components/ui/floating-panel";
import type { ZoneOptionsListProps } from "@/types/quote-campaign.types";
import { cn } from "@/utils/cn";

const COPY = CAMPAIGN_COPY.zones;

/** Desplegable de zonas agrupado por tipo; las agrupadas muestran qué ciudades incluyen. */
export function ZoneOptionsList({ listId, groups, query, activeIndex, optionId, onHover, onPick }: ZoneOptionsListProps) {
  const text = query.trim();
  const hasOptions = groups.length > 0;
  const starts = groups.map((_, groupIndex) => groups.slice(0, groupIndex).reduce((sum, group) => sum + group.options.length, 0));

  return (
    <FloatingPanel className="left-0 max-h-80 overflow-y-auto">
      <div onMouseDown={(event) => event.preventDefault()}>
        {text && hasOptions ? <p className="px-3 pt-1 pb-2 text-[11px] text-text-muted">{COPY.enterAdds(text)}</p> : null}
        {!hasOptions ? <p className="px-3 py-3 text-[13px] text-text-muted">{text ? COPY.enterToAdd(text) : COPY.noOptions}</p> : null}
        <ul id={listId} role="listbox" aria-label={COPY.label} className="flex flex-col gap-2">
          {groups.map((group, groupIndex) => (
            <li key={group.label} role="presentation">
              <p className="px-3 pt-1 pb-1 text-[11px] tracking-[1.2px] text-text-muted uppercase">{group.label}</p>
              <ul role="group" aria-label={group.label}>
                {group.options.map((option, optionIndex) => {
                  const position = starts[groupIndex] + optionIndex;
                  return (
                    <li
                      key={option.id}
                      id={optionId(position)}
                      role="option"
                      aria-selected={position === activeIndex}
                      onMouseEnter={() => onHover(position)}
                      onClick={() => onPick(option)}
                      className={cn("flex min-h-10 cursor-pointer flex-col justify-center rounded-md px-3 py-1.5", position === activeIndex ? "bg-white/10" : "hover:bg-white/5")}
                    >
                      <span className="text-[13px] text-text-primary">{option.name}</span>
                      {option.composition ? <small className="text-[11px] leading-snug text-text-muted">{option.composition}</small> : null}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </FloatingPanel>
  );
}

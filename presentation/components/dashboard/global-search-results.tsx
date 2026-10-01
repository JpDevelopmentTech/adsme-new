import { SearchX } from "lucide-react";
import { GLOBAL_SEARCH_COPY } from "@/constants/global-search.constants";
import { GlobalSearchOption } from "@/presentation/components/dashboard/global-search-option";
import type { GlobalSearchResultsProps, SearchGroupKey } from "@/types/global-search.types";

const GROUP_ORDER: SearchGroupKey[] = ["clients", "jobs", "campaigns"];

/** Filas esqueleto a la altura final, para que el panel no salte al llegar datos. */
const SKELETON_ROWS = 4;

/**
 * Contenido del desplegable del buscador: resultados agrupados por tipo (los
 * grupos vacíos no se muestran), o el estado de carga, de error o sin resultados.
 */
export function GlobalSearchResults({
  listId,
  term,
  state,
  activeIndex,
  optionId,
  onHover,
  onSelect,
}: GlobalSearchResultsProps) {
  if (state.status === "loading" && state.items.length === 0) {
    return (
      <ul aria-label={GLOBAL_SEARCH_COPY.loading} className="flex flex-col gap-1 p-1">
        {Array.from({ length: SKELETON_ROWS }, (_, index) => (
          <li key={index} className="flex items-center gap-3 px-2.5 py-2">
            <span className="size-8 shrink-0 animate-pulse rounded-[10px] bg-white/10" />
            <span className="flex flex-1 flex-col gap-1.5">
              <span className="h-3 w-2/5 animate-pulse rounded-pill bg-white/10" />
              <span className="h-2.5 w-1/4 animate-pulse rounded-pill bg-white/[0.06]" />
            </span>
          </li>
        ))}
      </ul>
    );
  }

  if (state.status === "error") {
    return <p className="px-3 py-6 text-center text-[13px] text-danger">{GLOBAL_SEARCH_COPY.error}</p>;
  }

  if (state.status === "ready" && state.items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-4 py-7 text-center">
        <SearchX size={22} strokeWidth={1.5} className="text-text-muted" aria-hidden />
        <p className="text-sm font-normal text-text-primary">{GLOBAL_SEARCH_COPY.empty(term.trim())}</p>
        <p className="max-w-[300px] text-xs text-text-muted">{GLOBAL_SEARCH_COPY.emptyHint}</p>
      </div>
    );
  }

  return (
    <div id={listId} role="listbox" aria-label={GLOBAL_SEARCH_COPY.resultsLabel} className="flex flex-col gap-2">
      {GROUP_ORDER.map((group) => {
        const items = state.items
          .map((item, index) => ({ item, index }))
          .filter(({ item }) => item.group === group);

        if (items.length === 0) return null;

        return (
          <ul key={group} role="group" aria-label={GLOBAL_SEARCH_COPY.groups[group]} className="flex flex-col">
            <li role="presentation" className="flex items-center gap-2 px-2.5 pt-1.5 pb-1">
              <span className="text-[11px] font-normal tracking-[1.4px] text-text-muted uppercase">
                {GLOBAL_SEARCH_COPY.groups[group]}
              </span>
              <span className="text-[11px] font-normal text-text-muted">{items.length}</span>
            </li>
            {items.map(({ item, index }) => (
              <GlobalSearchOption
                key={item.key}
                id={optionId(index)}
                item={item}
                term={term}
                isActive={index === activeIndex}
                onHover={() => onHover(index)}
                onSelect={() => onSelect(item)}
              />
            ))}
          </ul>
        );
      })}
    </div>
  );
}

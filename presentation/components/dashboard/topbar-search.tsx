"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";
import { TOPBAR_COPY } from "@/constants/dashboard-copy.constants";
import { GLOBAL_SEARCH_COPY, GLOBAL_SEARCH_MIN_CHARS } from "@/constants/global-search.constants";
import { GlobalSearchResults } from "@/presentation/components/dashboard/global-search-results";
import { FloatingPanel } from "@/presentation/components/ui/floating-panel";
import { useFocusShortcut } from "@/presentation/hooks/use-focus-shortcut";
import { useGlobalSearch } from "@/presentation/hooks/use-global-search";
import { useListboxNavigation } from "@/presentation/hooks/use-listbox-navigation";
import type { SearchItem } from "@/types/global-search.types";

/**
 * Buscador global de la topbar: un combobox que busca a la vez en clientes,
 * trabajos y campañas mientras se escribe y muestra los resultados agrupados en
 * un desplegable. ⌘K lo enfoca desde cualquier pantalla.
 */
export function TopbarSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [term, setTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const search = useGlobalSearch(term);

  function select(item: SearchItem) {
    setIsOpen(false);
    setTerm("");
    inputRef.current?.blur();
    router.push(item.href);
  }

  const navigation = useListboxNavigation(search.items, select, () => setIsOpen(false));
  useFocusShortcut(inputRef);

  const query = term.trim();
  const isPanelVisible = isOpen && query.length > 0;
  const optionId = (index: number) => `${listId}-option-${index}`;
  const hasItems = search.status !== "idle" && search.items.length > 0;

  return (
    <div className="relative">
      <label className="flex h-[42px] w-[340px] max-w-full items-center gap-2.5 rounded-pill border border-border bg-surface pr-2 pl-4 transition-colors duration-150 focus-within:border-white/40">
        <Search size={16} strokeWidth={1.5} className="shrink-0 text-text-muted" aria-hidden />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-label={TOPBAR_COPY.searchLabel}
          aria-expanded={isPanelVisible}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            isPanelVisible && navigation.activeIndex >= 0 ? optionId(navigation.activeIndex) : undefined
          }
          placeholder={TOPBAR_COPY.searchPlaceholder}
          value={term}
          onChange={(event) => {
            setTerm(event.target.value);
            setIsOpen(true);
            navigation.setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onKeyDown={navigation.onKeyDown}
          className="min-w-0 flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-muted [&::-webkit-search-cancel-button]:hidden"
        />
        <kbd className="rounded-[8px] bg-surface px-2 py-[3px] font-body text-[11px] font-normal text-text-muted">
          ⌘K
        </kbd>
      </label>

      <p aria-live="polite" className="sr-only">
        {search.status === "ready" ? GLOBAL_SEARCH_COPY.resultsCount(search.items.length) : ""}
      </p>

      {isPanelVisible ? (
        <FloatingPanel className="w-[440px] max-w-[calc(100vw-2rem)]">
          {query.length < GLOBAL_SEARCH_MIN_CHARS ? (
            <p className="px-3 py-4 text-center text-[13px] text-text-muted">{GLOBAL_SEARCH_COPY.minChars}</p>
          ) : (
            <GlobalSearchResults
              listId={listId}
              term={query}
              state={search}
              activeIndex={navigation.activeIndex}
              optionId={optionId}
              onHover={navigation.setActiveIndex}
              onSelect={select}
            />
          )}

          {hasItems ? (
            <p className="mt-1 border-t border-border px-3 pt-2 pb-1 text-[11px] font-normal text-text-muted">
              {GLOBAL_SEARCH_COPY.hint}
            </p>
          ) : null}
        </FloatingPanel>
      ) : null}
    </div>
  );
}

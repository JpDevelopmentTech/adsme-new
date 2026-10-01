"use client";

import { useEffect, useState } from "react";
import {
  GLOBAL_SEARCH_DEBOUNCE_MS,
  GLOBAL_SEARCH_ENDPOINT,
  GLOBAL_SEARCH_MIN_CHARS,
} from "@/constants/global-search.constants";
import type { GlobalSearchResults } from "@/domain/entities/global-search";
import type { GlobalSearchState } from "@/types/global-search.types";
import { toSearchItems } from "@/utils/to-search-items";

const IDLE: GlobalSearchState = { status: "idle", items: [] };

/**
 * Busca el término en clientes, trabajos y campañas mientras se escribe. Espera
 * a que la persona deje de teclear y cancela la petición anterior si llega otra,
 * para que una respuesta lenta nunca pise a una más reciente.
 */
export function useGlobalSearch(term: string): GlobalSearchState {
  const [state, setState] = useState<GlobalSearchState>(IDLE);
  const query = term.trim();
  const isSearchable = query.length >= GLOBAL_SEARCH_MIN_CHARS;

  useEffect(() => {
    if (!isSearchable) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setState((previous) => ({ status: "loading", items: previous.items }));

      try {
        const response = await fetch(
          `${GLOBAL_SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error(`Búsqueda fallida: ${response.status}`);

        const results = (await response.json()) as GlobalSearchResults;
        setState({ status: "ready", items: toSearchItems(results) });
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setState({ status: "error", items: [] });
      }
    }, GLOBAL_SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, isSearchable]);

  return isSearchable ? state : IDLE;
}

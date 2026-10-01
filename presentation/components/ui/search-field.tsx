"use client";

import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useQueryParams } from "@/presentation/hooks/use-query-params";
import type { SearchFieldProps } from "@/types/ui.types";

/** Milisegundos de espera antes de llevar lo escrito a la URL. */
const DEBOUNCE_MS = 300;

/** Buscador que sincroniza lo escrito con un parámetro de la URL. */
export function SearchField({ value, paramName, placeholder }: SearchFieldProps) {
  const { setParam, isPending } = useQueryParams();
  const [term, setTerm] = useState(value);

  useEffect(() => {
    if (term === value) return;

    const timer = setTimeout(() => {
      setParam(paramName, term.trim() || null);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [term, value, paramName, setParam]);

  return (
    <label className="flex h-10 w-[300px] max-w-full items-center gap-2.5 rounded-pill border border-border bg-surface px-4 transition-colors duration-150 focus-within:border-white/40">
      {isPending ? (
        <Loader2 size={16} className="animate-spin text-text-muted" aria-hidden />
      ) : (
        <Search size={16} strokeWidth={1.5} className="text-text-muted" aria-hidden />
      )}
      <input
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-muted [&::-webkit-search-cancel-button]:hidden"
      />
    </label>
  );
}

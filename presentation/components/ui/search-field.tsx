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
    <label className="glass-field flex w-[250px] max-w-full items-center gap-[9px] rounded-md px-[11px] py-2 transition-colors duration-150 focus-within:border-ink">
      {isPending ? (
        <Loader2 size={15} className="animate-spin text-text-muted" aria-hidden />
      ) : (
        <Search size={15} strokeWidth={1.5} className="text-text-muted" aria-hidden />
      )}
      <input
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[12.5px] text-text-primary outline-none placeholder:text-text-muted"
      />
    </label>
  );
}

import { Check, Plus } from "lucide-react";
import { SEARCHABLE_CREATE_VALUE } from "@/constants/searchable-select.constants";
import type { SearchableOptionLabelProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";

/**
 * Cómo se pinta cada opción del selector con buscador: en el menú, la marca de
 * la elegida; la opción «crear» lleva el signo más y el color de acción para
 * que se lea como un paso, no como un dato más de la lista.
 */
export function SearchableOptionLabel({ option, context, selectedValue }: SearchableOptionLabelProps) {
  if (option.value === SEARCHABLE_CREATE_VALUE) {
    return (
      <span className="flex min-w-0 items-center gap-2 text-lilac">
        <Plus size={14} strokeWidth={1.75} aria-hidden className="shrink-0" />
        <span className="truncate">{option.label}</span>
      </span>
    );
  }

  return (
    <span className="flex min-w-0 items-center gap-2">
      {context === "menu" ? (
        <Check
          size={14}
          aria-hidden
          className={cn("shrink-0 text-lilac", selectedValue === option.value ? "opacity-100" : "opacity-0")}
        />
      ) : null}
      <span className="truncate">{option.label}</span>
    </span>
  );
}

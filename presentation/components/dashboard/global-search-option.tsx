import { CornerDownLeft } from "lucide-react";
import { SearchItemThumb } from "@/presentation/components/dashboard/search-item-thumb";
import { HighlightedText } from "@/presentation/components/ui/highlighted-text";
import type { GlobalSearchOptionProps } from "@/types/global-search.types";
import { cn } from "@/utils/cn";

/**
 * Un resultado del buscador: miniatura, título con la coincidencia resaltada y
 * subtítulo. La fila activa —por ratón o por teclado— se marca con vidrio.
 */
export function GlobalSearchOption({
  id,
  item,
  term,
  isActive,
  onHover,
  onSelect,
}: GlobalSearchOptionProps) {
  return (
    <li
      id={id}
      role="option"
      aria-selected={isActive}
      onMouseEnter={onHover}
      // Se elige en `mousedown` para que el blur del input no cierre antes el panel.
      onMouseDown={(event) => {
        event.preventDefault();
        onSelect();
      }}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-[12px] px-2.5 py-2 transition-colors duration-100",
        isActive ? "bg-white/10" : "bg-transparent",
      )}
    >
      <SearchItemThumb visual={item.visual} />

      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-light text-text-primary">
          <HighlightedText text={item.title} term={term} />
        </span>
        <span className="truncate text-xs font-normal text-text-muted">{item.subtitle}</span>
      </span>

      {isActive ? (
        <CornerDownLeft size={14} strokeWidth={1.5} className="shrink-0 text-text-muted" aria-hidden />
      ) : null}
    </li>
  );
}

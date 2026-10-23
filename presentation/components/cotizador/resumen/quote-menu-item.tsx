import type { QuoteMenuItemProps } from "@/types/quote-summary.types";
import { cn } from "@/utils/cn";
import { MENU_ITEM_CLASSES } from "@/utils/menu-item-styles";

/** Opción del menú de formatos de la cotización. */
export function QuoteMenuItem({ label, hint, onSelect }: QuoteMenuItemProps) {
  return (
    <button type="button" role="menuitem" title={hint} onClick={onSelect} className={cn(MENU_ITEM_CLASSES, "min-h-10 text-[13px] focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none")}>
      {label}
    </button>
  );
}

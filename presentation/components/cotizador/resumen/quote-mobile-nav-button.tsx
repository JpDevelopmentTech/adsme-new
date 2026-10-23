import type { QuoteMobileNavButtonProps } from "@/types/quote-summary.types";
import { cn } from "@/utils/cn";

/** Botón de la barra móvil que salta a una parte del cotizador; marca la que está a la vista. */
export function QuoteMobileNavButton({ label, isActive, onClick }: QuoteMobileNavButtonProps) {
  return (
    <button
      type="button"
      aria-current={isActive ? "true" : undefined}
      onClick={onClick}
      className={cn(
        "h-10 cursor-pointer rounded-pill px-3.5 text-[13px] whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
        isActive ? "bg-ink text-g-50" : "text-text-secondary hover:text-text-primary",
      )}
    >
      {label}
    </button>
  );
}

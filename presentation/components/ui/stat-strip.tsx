import type { StatStripProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";

/**
 * Banda de cifras bajo el título de una pantalla. Sin tarjetas: solo separadores
 * verticales, para que no compita con el contenido que encabeza.
 */
export function StatStrip({ items }: StatStripProps) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-b border-border pb-[15px] sm:flex sm:gap-0">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={cn(
            "flex flex-col-reverse gap-1 sm:flex-1",
            index > 0 && "sm:border-l sm:border-border sm:pl-[26px]",
            index < items.length - 1 && "sm:pr-[26px]",
          )}
        >
          <dt className="text-xs text-text-muted">{item.label}</dt>
          <dd className="font-display text-[22px] leading-[1.1] font-bold text-text-primary">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

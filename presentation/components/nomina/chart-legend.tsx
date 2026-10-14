import type { ChartLegendProps, LegendSwatch } from "@/types/nomina-ui.types";

/** Clases de cada tipo de muestra de la leyenda. */
const SWATCH_CLASSES: Record<LegendSwatch, string> = {
  square: "size-[9px] rounded-[2px]",
  dot: "size-2 rounded-pill",
  line: "h-[3px] w-3.5 rounded-pill",
  dash: "h-0.5 w-3.5 [mask-image:repeating-linear-gradient(90deg,#000_0_4px,transparent_4px_6px)]",
};

/** Leyenda de una gráfica: una muestra de color por serie con su nombre. */
export function ChartLegend({ items }: ChartLegendProps) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5 text-xs text-text-secondary">
          <span aria-hidden className={SWATCH_CLASSES[item.swatch ?? "square"]} style={{ backgroundColor: item.color }} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

import type { ToggleGroupProps } from "@/types/ui.types";

/** Bloque de interruptores con su encabezado, como en `B6 · Wizard Paso 3`. */
export function ToggleGroup({ title, children }: ToggleGroupProps) {
  return (
    <section className="overflow-hidden rounded-md border border-border bg-card-elevated">
      <h3 className="border-b border-border px-[18px] py-2.5 text-[11px] font-bold tracking-[0.5px] text-text-muted">
        {title}
      </h3>
      {children}
    </section>
  );
}

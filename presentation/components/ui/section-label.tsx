import type { SectionLabelProps } from "@/types/dashboard.types";

/** Encabezado de grupo dentro de la navegación lateral. */
export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="px-3 pt-4 pb-2 text-[11px] font-semibold tracking-[1.2px] text-text-muted">
      {children}
    </p>
  );
}

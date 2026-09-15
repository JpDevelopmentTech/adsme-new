import type { SectionLabelProps } from "@/types/dashboard.types";

/** Encabezado de grupo dentro de la navegación lateral. */
export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="px-[11px] pb-[7px] text-[10px] font-medium tracking-[0.6px] text-text-secondary uppercase">
      {children}
    </p>
  );
}

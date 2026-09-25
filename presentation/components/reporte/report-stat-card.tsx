import type { ReportStatCardProps } from "@/types/report.types";

/**
 * Un dato, una tarjeta. Van neutras a propósito: el color lo lleva la cabecera
 * de su plataforma, así que una rejilla de ocho tarjetas se lee como una tabla
 * de cifras y no como ocho avisos compitiendo entre sí.
 */
export function ReportStatCard({ stat }: ReportStatCardProps) {
  return (
    <article className="glass-field flex flex-col gap-1.5 rounded-tile px-4 py-3.5">
      {/* Dos líneas reservadas: «Personas alcanzadas» no cabe en una a este
          ancho, y cortarla con puntos suspensivos deja al artista adivinando.
          Con la altura fija, las cifras de la fila siguen alineadas entre sí. */}
      <span className="min-h-[22px] text-[10px] leading-[1.1] font-medium tracking-[0.6px] text-text-muted uppercase">
        {stat.label}
      </span>
      <span className="font-display text-[19px] leading-none font-light tracking-[-0.6px] text-text-primary">
        {stat.value}
      </span>
    </article>
  );
}

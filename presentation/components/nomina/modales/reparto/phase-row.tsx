import type { PhaseRowProps } from "@/types/nomina-modales-reparto.types";

/** Fila de la tabla de fases con el filete de color de su tramo. */
export function PhaseRow({ phase }: PhaseRowProps) {
  return (
    <tr className="border-t border-border">
      <th scope="row" className="py-3 pr-3 text-left font-light text-text-primary">
        <span className="flex items-center gap-2.5">
          <span aria-hidden className="h-3.5 w-[3px] shrink-0 rounded-[2px]" style={{ backgroundColor: phase.color }} />
          {phase.label}
        </span>
      </th>
      <td className="py-3 pr-3 font-light text-text-secondary">{phase.how}</td>
      <td className="py-3 pr-3 text-right font-light text-text-primary tabular-nums">{phase.accumulated}</td>
      <td className="py-3 text-right font-light whitespace-nowrap text-text-secondary">{phase.show}</td>
    </tr>
  );
}

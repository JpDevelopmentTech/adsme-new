import { VIABILITY_COPY } from "@/constants/nomina-modales-reparto-copy.constants";
import { PhaseRow } from "@/presentation/components/nomina/modales/reparto/phase-row";
import type { PhaseTableProps } from "@/types/nomina-modales-reparto.types";

/** Tabla «Fase · Cómo se reparte · Acumulado · Show» del modelo. */
export function PhaseTable({ phases }: PhaseTableProps) {
  const [phase, how, accumulated, show] = VIABILITY_COPY.headers;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[460px] text-[13px]">
        <thead>
          <tr className="text-[11px] text-text-muted">
            <th scope="col" className="pb-2 text-left font-light">{phase}</th>
            <th scope="col" className="pb-2 text-left font-light">{how}</th>
            <th scope="col" className="pb-2 text-right font-light">{accumulated}</th>
            <th scope="col" className="pb-2 text-right font-light">{show}</th>
          </tr>
        </thead>
        <tbody>
          {phases.map((row) => (
            <PhaseRow key={row.key} phase={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { FlaskConical } from "lucide-react";
import { SAMPLE_DATA_LABEL } from "@/constants/report.constants";

/**
 * Marca las secciones que aún no traen datos de la plataforma. Sin ella, el
 * artista leería estas cifras como resultados reales de su lanzamiento.
 */
export function SampleDataBadge() {
  return (
    <span className="flex shrink-0 items-center gap-1.5 rounded-pill border border-warning/25 bg-warning/10 px-2.5 py-1 text-[11px] font-semibold text-warning">
      <FlaskConical size={12} aria-hidden />
      {SAMPLE_DATA_LABEL}
    </span>
  );
}

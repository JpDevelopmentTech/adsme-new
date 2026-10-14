import { Info } from "lucide-react";
import { NOMINA_ARTISTAS_COPY as COPY } from "@/constants/nomina-artistas-copy.constants";

/** Nota bajo el roster que explica qué hace la fila y qué hace el «+». */
export function ArtistsRosterHint() {
  return (
    <p className="-mt-3 flex items-start gap-2 text-xs leading-[1.5] text-text-muted">
      <Info size={14} strokeWidth={1.5} className="mt-px shrink-0" aria-hidden />
      {COPY.hint}
    </p>
  );
}

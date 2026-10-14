import { NOMINA_RESUMEN_COPY as COPY } from "@/constants/nomina-resumen-copy.constants";
import { ShowRuler } from "@/presentation/components/nomina/show-ruler";
import type { TopArtistScalabilityProps } from "@/types/nomina-resumen.types";
import { showProgressPercent } from "@/utils/show-progress-percent";

/** Avance del artista hacia su mínimo de shows: la cifra y la regla de shows. */
export function TopArtistScalability({ progress }: TopArtistScalabilityProps) {
  return (
    <div className="flex w-full flex-col gap-2 sm:w-[300px]">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="text-text-muted">{COPY.scalability}</span>
        <span className="text-text-primary tabular-nums">
          {COPY.shows(progress.shows, progress.minShows, showProgressPercent(progress))}
        </span>
      </div>
      <ShowRuler progress={progress} />
    </div>
  );
}

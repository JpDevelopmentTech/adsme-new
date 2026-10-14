import { ChevronRight, Trophy } from "lucide-react";
import Link from "next/link";
import { NOMINA_RESUMEN_COPY as COPY } from "@/constants/nomina-resumen-copy.constants";
import { NOMINA_ARTISTS_ROUTE } from "@/constants/routes.constants";
import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import { TopArtistRow } from "@/presentation/components/nomina/resumen/top-artist-row";
import { ShowRulerLegend } from "@/presentation/components/nomina/show-ruler-legend";
import { EmptyStatePanel } from "@/presentation/components/ui/empty-state-panel";
import type { TopArtistsPanelProps } from "@/types/nomina-resumen.types";

/**
 * Ranking de los artistas con más ingresos del mes. Cada fila abre el perfil y
 * la regla de shows dice de un vistazo quién ya es escalable.
 */
export function TopArtistsPanel({ artists, hasArtists }: TopArtistsPanelProps) {
  const seeRoster = (
    <Link
      href={NOMINA_ARTISTS_ROUTE}
      className="flex items-center gap-1 rounded-sm text-[13px] text-text-secondary transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
    >
      {COPY.seeRoster}
      <ChevronRight size={14} strokeWidth={1.5} aria-hidden />
    </Link>
  );

  return (
    <NominaPanel title={COPY.topTitle} subtitle={COPY.topSubtitle} isThick actions={seeRoster}>
      {artists.length === 0 ? (
        <EmptyStatePanel
          icon={<Trophy size={22} strokeWidth={1.5} aria-hidden />}
          title={COPY.emptyTitle}
          description={hasArtists ? COPY.emptyWithArtists : COPY.emptyWithoutArtists}
        />
      ) : (
        <>
          <ol className="flex flex-col">
            {artists.map((artist, index) => (
              <TopArtistRow key={artist.id} artist={artist} position={index + 1} />
            ))}
          </ol>
          <div className="pl-1 sm:pl-[52px]">
            <ShowRulerLegend />
          </div>
        </>
      )}
    </NominaPanel>
  );
}

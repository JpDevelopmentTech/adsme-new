import type { ReactNode } from "react";
import type { NominaArtistSummary } from "@/domain/entities/nomina-artist";

export interface RouteGateProps {
  /** Prefijos de ruta en los que el contenido no se pinta. */
  hiddenOn: readonly string[];
  children: ReactNode;
}

export interface NominaActiveArtistsProps {
  artists: NominaArtistSummary[];
}

export interface ArtistAvatarProps {
  name: string;
  photoUrl: string | null;
  size: number;
  /** Semáforo del mes en la esquina; sin él solo se pinta la foto. */
  semaphore?: NominaArtistSummary["semaphore"];
}

import { Users } from "lucide-react";
import { NOMINA_ARTISTAS_COPY as COPY } from "@/constants/nomina-artistas-copy.constants";
import { NewArtistButton } from "@/presentation/components/nomina/modales/new-artist-button";
import { EmptyStatePanel } from "@/presentation/components/ui/empty-state-panel";
import type { ArtistsEmptyStateProps } from "@/types/nomina-artistas.types";

/** Roster sin artistas: la salida es inscribir al primero de tus clientes. */
export function ArtistsEmptyState({ eligibleClients }: ArtistsEmptyStateProps) {
  return (
    <EmptyStatePanel
      isStandalone
      icon={<Users size={22} strokeWidth={1.5} aria-hidden />}
      title={COPY.emptyTitle}
      description={COPY.emptyDescription}
      action={<NewArtistButton eligibleClients={eligibleClients} />}
    />
  );
}

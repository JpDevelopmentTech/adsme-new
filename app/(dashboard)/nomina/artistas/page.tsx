import type { Metadata } from "next";
import { NOMINA_ARTISTAS_COPY as COPY } from "@/constants/nomina-artistas-copy.constants";
import { createGetNominaOverview } from "@/domain/use-cases/get-nomina-overview";
import { createListNominaEligibleClients } from "@/domain/use-cases/list-nomina-eligible-clients";
import { createListNominaRoster } from "@/domain/use-cases/list-nomina-roster";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { createSupabaseNominaEnrollmentRepository } from "@/infrastructure/repositories/supabase-nomina-enrollment-repository";
import { createSupabaseNominaRepository } from "@/infrastructure/repositories/supabase-nomina-repository";
import { ArtistsEmptyState } from "@/presentation/components/nomina/artistas/artists-empty-state";
import { ArtistsMonthBand } from "@/presentation/components/nomina/artistas/artists-month-band";
import { ArtistsRosterHint } from "@/presentation/components/nomina/artistas/artists-roster-hint";
import { ArtistsRosterTable } from "@/presentation/components/nomina/artistas/artists-roster-table";
import { NewArtistButton } from "@/presentation/components/nomina/modales/new-artist-button";
import { NominaTopbar } from "@/presentation/components/nomina/nomina-topbar";

export const metadata: Metadata = { title: COPY.metaTitle };

/**
 * Pantalla Artistas de la Nómina Plan: las cifras del mes en una banda y el
 * roster completo debajo, cada fila con su acceso al perfil y al alta de ingreso.
 */
export default async function NominaArtistasPage() {
  const supabase = await createServerSupabaseClient();
  const repository = createSupabaseNominaRepository(supabase, new Date());
  const [roster, overview, eligibleClients] = await Promise.all([
    createListNominaRoster(repository)(),
    createGetNominaOverview(repository)(),
    createListNominaEligibleClients(createSupabaseNominaEnrollmentRepository(supabase))(),
  ]);

  return (
    <>
      <NominaTopbar title={COPY.title} subtitle={COPY.subtitle(roster.length)} hasSearch action={<NewArtistButton eligibleClients={eligibleClients} />} />

      {roster.length === 0 ? (
        <ArtistsEmptyState eligibleClients={eligibleClients} />
      ) : (
        <>
          <ArtistsMonthBand kpis={overview.kpis} month={overview.month} />
          <ArtistsRosterTable entries={roster} />
          <ArtistsRosterHint />
        </>
      )}
    </>
  );
}

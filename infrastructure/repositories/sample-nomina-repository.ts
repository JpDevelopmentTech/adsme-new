import type { NominaRepository } from "@/domain/interfaces/nomina-repository";
import { buildSampleArtist } from "@/infrastructure/sample-data/nomina/build-sample-artist";
import { buildSampleFinance } from "@/infrastructure/sample-data/nomina/build-sample-finance";
import { buildSampleOverview } from "@/infrastructure/sample-data/nomina/build-sample-overview";
import { buildSampleProfile } from "@/infrastructure/sample-data/nomina/build-sample-profile";
import { buildSampleRosterEntry } from "@/infrastructure/sample-data/nomina/build-sample-roster";
import { SAMPLE_ARTISTS } from "@/infrastructure/sample-data/nomina/sample-artists";

/**
 * Repositorio de la Nómina Plan con los datos de muestra del diseño. Sirve a la
 * interfaz mientras no exista la base real; cambiarlo por otro adaptador no
 * toca ni el dominio ni las pantallas.
 */
export function createSampleNominaRepository(): NominaRepository {
  const roster = SAMPLE_ARTISTS.map(buildSampleArtist);

  return {
    async getOverview() {
      return buildSampleOverview(roster);
    },
    async listRoster() {
      return roster.map(buildSampleRosterEntry);
    },
    async getArtistProfile(artistId) {
      const facts = roster.find((item) => item.spec.id === artistId);
      return facts ? buildSampleProfile(facts) : null;
    },
    async getFinance() {
      return buildSampleFinance(roster);
    },
  };
}

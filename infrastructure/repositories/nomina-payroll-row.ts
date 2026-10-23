import type { NominaArtistConfig } from "@/domain/entities/nomina-artist-config";
import type { NominaEnrollment } from "@/domain/entities/nomina-enrollment";
import type { NominaSocialLink, NominaSocialNetwork } from "@/domain/entities/nomina-social";

/** Fila de `client_payroll` con el cliente embebido. */
export interface PayrollRow {
  client_id: string;
  nomina: number;
  min_shows: number;
  starts_on: string;
  has_service: boolean;
  service: number | null;
  service_payer: "cliente" | "adsme";
  has_scalability: boolean;
  profit_percent: number | string;
  profit_per_show_after_min: number;
  has_fixed_profit: boolean;
  fixed_profit: number;
  clients: { id: string; name: string; avatar_url: string | null; socials: Record<string, string> | null };
}

/** Columnas que se leen de una inscripción, con su cliente. */
export const PAYROLL_COLUMNS =
  "client_id, nomina, min_shows, starts_on, has_service, service, service_payer, has_scalability, profit_percent, profit_per_show_after_min, has_fixed_profit, fixed_profit, clients!inner(id, name, avatar_url, socials)";

const NETWORKS: NominaSocialNetwork[] = ["instagram", "facebook", "tiktok", "spotify", "youtube", "x"];

/** Las 6 redes en el orden del perfil; las que no tienen enlace van sin `url`. */
export function toSocialLinks(socials: Record<string, string> | null): NominaSocialLink[] {
  return NETWORKS.map((network) => ({ network, url: socials?.[network] || undefined }));
}

/** Configuración de nómina a partir de la fila. `numeric` llega como texto. */
export function toArtistConfig(row: PayrollRow): NominaArtistConfig {
  return {
    clientId: row.client_id,
    nomina: Number(row.nomina),
    minShows: row.min_shows,
    startsOn: row.starts_on,
    split: {
      hasService: row.has_service,
      service: row.service === null ? null : Number(row.service),
      servicePayer: row.service_payer,
      hasScalability: row.has_scalability,
      profitPercent: Number(row.profit_percent),
      profitPerShowAfterMin: Number(row.profit_per_show_after_min),
      hasFixedProfit: row.has_fixed_profit,
      fixedProfit: Number(row.fixed_profit),
    },
  };
}

/** Inscripción completa: identidad del cliente, sus redes y su configuración. */
export function toEnrollment(row: PayrollRow): NominaEnrollment {
  return {
    clientId: row.client_id,
    name: row.clients.name,
    avatarUrl: row.clients.avatar_url,
    socials: toSocialLinks(row.clients.socials),
    config: toArtistConfig(row),
  };
}

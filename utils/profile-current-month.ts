import type { NominaArtistProfile } from "@/domain/entities/nomina-profile";

/**
 * Mes en curso del perfil: el último del histórico, que va del más antiguo al
 * actual. Sin histórico se usa el mes de hoy.
 */
export function profileCurrentMonth(profile: NominaArtistProfile): string {
  return profile.history.at(-1)?.month ?? new Date().toISOString().slice(0, 7);
}

import { MIN_VIABLE_NOMINA, NOMINA_TIERS } from "@/constants/nomina-modales.constants";

/** Umbral base del tramo de la nómina, o `null` si la nómina no es viable. */
export function resolveNominaThreshold(nomina: number): number | null {
  if (nomina < MIN_VIABLE_NOMINA) return null;
  return NOMINA_TIERS.find((tier) => nomina >= tier.from)?.threshold ?? null;
}

import { resolveNominaThreshold } from "@/utils/resolve-nomina-threshold";

/** Mínimo de Shows sugerido: ⌈umbral del tramo ÷ nómina⌉, o `null` sin tramo. */
export function suggestMinShows(nomina: number): number | null {
  const threshold = resolveNominaThreshold(nomina);
  return threshold === null ? null : Math.ceil(threshold / nomina);
}

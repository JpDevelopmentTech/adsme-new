import { FLOW_ARTIST_LIMIT, FLOW_CONCEPT_LABELS } from "@/constants/nomina-finanzas.constants";
import { SANKEY_COLORS } from "@/constants/nomina-sankey.constants";
import type { NominaFinance } from "@/domain/entities/nomina-finance";
import type { SankeyMode, SankeyNodeSpec } from "@/types/nomina-sankey.types";

/** Nodo de origen en la primera columna. */
function origin(id: string, label: string, value: number, color: string = SANKEY_COLORS.origin): SankeyNodeSpec {
  return { id, label, value, color, column: 0 };
}

/**
 * Orígenes del flujo: por concepto (Shows, Express, Inversión Única, Otros) o
 * por artista, con los 7 que más ingresan y el resto juntos en «Otros (n)».
 */
export function buildSankeyOrigins(finance: NominaFinance, mode: SankeyMode): SankeyNodeSpec[] {
  if (mode === "concepto") {
    return finance.incomeByConcept
      .filter((item) => item.amount > 0)
      .sort((a, b) => b.amount - a.amount)
      .map((item) => origin(`concepto-${item.concept}`, FLOW_CONCEPT_LABELS[item.concept], item.amount));
  }

  const ranked = finance.artists.filter((artist) => artist.income > 0).sort((a, b) => b.income - a.income);
  const named = ranked.slice(0, FLOW_ARTIST_LIMIT).map((artist) => origin(`artista-${artist.id}`, artist.name, artist.income));
  const rest = ranked.slice(FLOW_ARTIST_LIMIT);
  if (rest.length === 0) return named;

  const restIncome = rest.reduce((sum, artist) => sum + artist.income, 0);
  return [...named, origin("artista-otros", `Otros (${rest.length})`, restIncome, SANKEY_COLORS.others)];
}

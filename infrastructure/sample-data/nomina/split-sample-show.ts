import type { SampleArtistSpec, SampleShowSplit } from "@/infrastructure/sample-data/nomina/sample-nomina.types";

/**
 * Reparte un show según el modelo del artista y lo facturado antes en el mes:
 * primero cubre el Servicio, hasta el punto de equilibrio va el % de Utilidad
 * y, pasado el mínimo, una Utilidad fija por show. Si AdsME asume el Servicio,
 * la Utilidad lo paga primero.
 */
export function splitSampleShow(
  spec: SampleArtistSpec,
  amount: number,
  billedBefore: number,
  serviceCoveredBefore: number,
): SampleShowSplit {
  const breakEven = spec.minShows * spec.nomina;
  let rest = amount;
  let service = 0;

  if (!spec.adsmeAssumesService) {
    service = Math.min(rest, Math.max(0, spec.service - billedBefore));
    rest -= service;
  }

  const cursor = billedBefore + service;
  const untilBreakEven = Math.min(rest, Math.max(0, breakEven - cursor));
  let profit = (untilBreakEven * spec.profitPercent) / 100;
  rest -= untilBreakEven;
  if (rest > 0) profit += Math.min(rest, (spec.profitPerShowAfterMin * rest) / spec.nomina);

  const investment = amount - service - profit;

  if (spec.adsmeAssumesService) {
    const coverage = Math.min(profit, Math.max(0, spec.service - serviceCoveredBefore));
    return { service: Math.round(coverage), profit: Math.round(profit - coverage), investment: Math.round(investment) };
  }

  return { service: Math.round(service), profit: Math.round(profit), investment: Math.round(investment) };
}

import type { NominaFinance } from "@/domain/entities/nomina-finance";
import type { BusinessHealth } from "@/types/nomina-finanzas.types";
import { countProfitableArtists } from "@/utils/count-profitable-artists";
import { netMargin } from "@/utils/net-margin";
import { resolveProfitLevel } from "@/utils/resolve-profit-level";
import { shareOf } from "@/utils/share-of";
import { toFinanceFigures } from "@/utils/to-finance-figures";

/** Veredicto de «¿Es rentable el negocio?» para el periodo. */
export function buildBusinessHealth(finance: NominaFinance): BusinessHealth {
  const figures = toFinanceFigures(finance.totals);
  const margin = netMargin(figures.service, figures.profit);

  return {
    hasIncome: figures.income > 0,
    margin,
    level: resolveProfitLevel(margin, figures.netProfit),
    grossShare: shareOf(figures.netProfit, figures.income),
    profitableCount: countProfitableArtists(finance.artists),
    artistCount: finance.artists.length,
  };
}

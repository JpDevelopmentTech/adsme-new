import { RULER_EXTRA_SHOWS } from "@/constants/nomina-modales.constants";
import { VIABILITY_COPY } from "@/constants/nomina-modales-reparto-copy.constants";
import type { NominaSplitModel, NominaViability } from "@/types/nomina-modales.types";
import { buildModelPhases } from "@/utils/build-model-phases";
import { collectModelChecks } from "@/utils/collect-model-checks";
import { collectModelErrors } from "@/utils/collect-model-errors";
import { collectModelWarnings } from "@/utils/collect-model-warnings";
import { findShowReaching } from "@/utils/find-show-reaching";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { simulateMonthProfit } from "@/utils/simulate-month-profit";

/**
 * Revisa un modelo de reparto: simula un mes de shows del valor de la nómina y
 * devuelve el veredicto con sus errores, avisos, confirmaciones, la tabla de
 * fases y la regla de shows de ejemplo.
 */
export function analyzeSplitModel(model: NominaSplitModel): NominaViability {
  const cumulative = simulateMonthProfit(model);
  const fixedShow = model.hasFixedProfit && model.fixedProfit > 0 ? findShowReaching(cumulative, model.fixedProfit) : null;
  const adsmeShow = model.hasService && model.servicePayer === "adsme" ? findShowReaching(cumulative, model.service, true) : null;

  const errors = collectModelErrors(model, fixedShow);
  const warnings = errors.length > 0 ? [] : collectModelWarnings(model, fixedShow, adsmeShow);
  const confirmations = errors.length > 0 ? [] : collectModelChecks(model, cumulative, fixedShow, adsmeShow);
  const paysService = model.hasService && model.servicePayer === "cliente" && model.nomina > 0;
  const minShows = Math.max(model.minShows, 0);

  return {
    tone: errors.length > 0 ? "noViable" : warnings.length > 0 ? "avisos" : "viable",
    errors,
    warnings,
    confirmations,
    phases: errors.length > 0 ? [] : buildModelPhases(model),
    ruler: {
      shows: minShows + RULER_EXTRA_SHOWS,
      minShows,
      serviceShows: paysService ? Math.min(Math.ceil(model.service / model.nomina), minShows) : 0,
    },
    footnote: VIABILITY_COPY.footnote(formatExactCurrency(model.nomina)),
  };
}

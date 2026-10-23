"use client";

import { useState } from "react";
import { EXPRESS_OTHER, EXPRESS_PRESETS } from "@/constants/nomina-modales.constants";
import type { NominaMovement } from "@/domain/entities/nomina-movement";
import type { NominaEditableBucket, NominaIncomeFormState, NominaIncomeValues } from "@/types/nomina-modales-ingreso.types";
import type { NominaModalArtist } from "@/types/nomina-modals.types";
import { buildIncomeDraft } from "@/utils/build-income-draft";
import { buildIncomeNote } from "@/utils/build-income-note";
import { buildIncomeSplit } from "@/utils/build-income-split";
import { completeSplit } from "@/utils/complete-split";
import { initialIncomeValues } from "@/utils/initial-income-values";
import { monthBillingBefore } from "@/utils/month-billing-before";
import { resolveSplitModel } from "@/utils/resolve-split-model";
import { toBillingEntry } from "@/utils/to-billing-entry";
import { todayIso } from "@/utils/today-iso";

/** Acumulado vacío para cuando todavía no hay mes elegido. */
const NO_BILLING = { billed: 0, serviceCovered: 0, count: 0 };

/**
 * Estado del modal de ingreso. La distribución se recalcula con el modelo del
 * artista (o los parámetros de esta transacción) y con lo facturado antes en el
 * mes; si se ajusta un rubro a mano, o se edita un ingreso, se respeta el
 * desglose hasta que cambie el concepto, el monto, el costo o los parámetros.
 * Como el original, en un ingreso nuevo cambiar de mes vuelve a repartir.
 */
export function useIncomeForm(artist: NominaModalArtist, movement?: NominaMovement): NominaIncomeFormState {
  const [values, setValues] = useState(() => initialIncomeValues(artist.nomina, todayIso(), movement));
  const set = (patch: Partial<NominaIncomeValues>) => setValues((current) => ({ ...current, ...patch }));
  const setSplitInput = (patch: Partial<NominaIncomeValues>) => set({ ...patch, manualSplit: null });
  const setMonthInput = (patch: Partial<NominaIncomeValues>) => {
    const moved = (patch.assignedMonth ?? values.assignedMonth) !== values.assignedMonth || (patch.coveredMonth ?? values.coveredMonth) !== values.coveredMonth;
    if (moved && !movement) setSplitInput(patch);
    else set(patch);
  };

  const artistModel = resolveSplitModel(artist.split, artist.nomina, artist.minShows);
  const artistParams = { profitPercent: artistModel.profitPercent, profitPerShowAfterMin: artistModel.profitPerShowAfterMin };
  const params = values.params ?? artistParams;
  const model = { ...artistModel, ...params };

  const presetAmount = EXPRESS_PRESETS.find((preset) => preset.value === values.expressPreset)?.amount ?? 0;
  const effectiveAmount = values.concept !== "express" ? (values.amount ?? 0) : values.expressPreset === EXPRESS_OTHER ? (values.expressOther ?? 0) : presetAmount;
  const cost = values.cost ?? 0;
  const month = values.concept === "express" ? values.coveredMonth : values.assignedMonth;
  const billing = month && values.concept !== "inversion" ? monthBillingBefore(artist.billing, month, movement && toBillingEntry(movement)) : NO_BILLING;
  const split =
    values.manualSplit ??
    buildIncomeSplit({ concept: values.concept, amount: effectiveAmount, cost, model, monthBilled: billing.billed, serviceCovered: billing.serviceCovered });

  const editBucket = (bucket: NominaEditableBucket, value: number) => {
    const next = { ...split, [bucket]: value };
    set({ manualSplit: completeSplit(next.service, next.profit, next.investment) });
  };

  const hasDates = values.eventDate !== "" && values.incomeDate !== "";
  const isConceptReady =
    values.concept === "express" ? values.coveredMonth !== "" : values.concept === "otro" ? values.otherConcept.trim() !== "" && values.assignedMonth !== "" : values.assignedMonth !== "";
  const context = { minShows: artist.minShows, monthBilled: billing.billed, monthMovementCount: billing.count };

  return {
    values,
    set,
    setSplitInput,
    setMonthInput,
    editBucket,
    effectiveAmount,
    split,
    artistParams,
    hasScalability: artistModel.hasScalability,
    note: buildIncomeNote({ concept: values.concept, amount: effectiveAmount, cost, month, model, context }),
    threshold: artistModel.minShows * artist.nomina,
    canSave: effectiveAmount > 0 && hasDates && isConceptReady,
    draft: buildIncomeDraft(values, { artist, amount: effectiveAmount, split, params }),
  };
}

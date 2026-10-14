"use client";

import { useState } from "react";
import { DEFAULT_SPLIT_SETTINGS, EXPRESS_OTHER, EXPRESS_PRESETS } from "@/constants/nomina-modales.constants";
import type { NominaMovement } from "@/domain/entities/nomina-movement";
import type { NominaEditableBucket, NominaIncomeContext, NominaIncomeFormState, NominaIncomeValues } from "@/types/nomina-modales-ingreso.types";
import { buildIncomeNote } from "@/utils/build-income-note";
import { buildIncomeSplit } from "@/utils/build-income-split";
import { completeSplit } from "@/utils/complete-split";
import { initialIncomeValues } from "@/utils/initial-income-values";
import { resolveSplitModel } from "@/utils/resolve-split-model";
import { todayIso } from "@/utils/today-iso";

/**
 * Estado del modal de ingreso. La distribución se recalcula en el cliente con
 * el modelo del artista (o los parámetros de esta transacción); si se ajusta un
 * rubro a mano se respeta hasta que cambie el concepto, el monto o los parámetros.
 */
export function useIncomeForm(nomina: number, context: NominaIncomeContext, movement?: NominaMovement): NominaIncomeFormState {
  const [values, setValues] = useState(() => initialIncomeValues(nomina, todayIso(), movement));
  const set = (patch: Partial<NominaIncomeValues>) => setValues((current) => ({ ...current, ...patch }));
  const setSplitInput = (patch: Partial<NominaIncomeValues>) => set({ ...patch, manualSplit: null });

  const artistModel = resolveSplitModel(DEFAULT_SPLIT_SETTINGS, nomina, context.minShows);
  const artistParams = { profitPercent: artistModel.profitPercent, profitPerShowAfterMin: artistModel.profitPerShowAfterMin };
  const model = { ...artistModel, ...(values.params ?? {}) };

  const presetAmount = EXPRESS_PRESETS.find((preset) => preset.value === values.expressPreset)?.amount ?? 0;
  const effectiveAmount = values.concept !== "express" ? (values.amount ?? 0) : values.expressPreset === EXPRESS_OTHER ? (values.expressOther ?? 0) : presetAmount;
  const cost = values.cost ?? 0;
  const split = values.manualSplit ?? buildIncomeSplit({ concept: values.concept, amount: effectiveAmount, cost, model, monthBilled: context.monthBilled });

  const editBucket = (bucket: NominaEditableBucket, value: number) => {
    const next = { ...split, [bucket]: value };
    set({ manualSplit: completeSplit(next.service, next.profit, next.investment) });
  };

  const hasDates = values.eventDate !== "" && values.incomeDate !== "";
  const isConceptReady =
    values.concept === "express" ? values.coveredMonth !== "" : values.concept === "otro" ? values.otherConcept.trim() !== "" && values.assignedMonth !== "" : values.assignedMonth !== "";

  return {
    values,
    set,
    setSplitInput,
    editBucket,
    effectiveAmount,
    split,
    artistParams,
    hasScalability: artistModel.hasScalability,
    note: buildIncomeNote({ concept: values.concept, amount: effectiveAmount, cost, month: values.assignedMonth, model, context }),
    threshold: artistModel.minShows * nomina,
    canSave: effectiveAmount > 0 && hasDates && isConceptReady,
  };
}

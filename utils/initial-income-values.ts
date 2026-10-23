import { EXPRESS_OTHER, EXPRESS_PRESETS } from "@/constants/nomina-modales.constants";
import type { NominaMovement } from "@/domain/entities/nomina-movement";
import type { NominaIncomeValues } from "@/types/nomina-modales-ingreso.types";

/** Monto base del `select` de Express que corresponde a un monto, u «Otro monto...». */
function presetFor(amount: number): string {
  return EXPRESS_PRESETS.find((preset) => preset.amount === amount)?.value ?? EXPRESS_OTHER;
}

/**
 * Valores con los que abre el modal de ingreso: los del movimiento al editar
 * (conservando su desglose guardado) o un Show por la nómina, con fecha de hoy.
 */
export function initialIncomeValues(nomina: number, today: string, movement?: NominaMovement): NominaIncomeValues {
  if (!movement) {
    return {
      concept: "show", otherConcept: "", amount: nomina, cost: null, costPurpose: "",
      expressPreset: EXPRESS_PRESETS[0].value, expressOther: null, coveredMonth: "", params: null, manualSplit: null,
      eventDate: today, incomeDate: today, assignedMonth: today.slice(0, 7), description: "", fileName: null,
    };
  }

  const isExpress = movement.concept === "express";
  const preset = isExpress ? presetFor(movement.amount) : EXPRESS_PRESETS[0].value;
  return {
    concept: movement.concept,
    otherConcept: movement.otherConcept ?? "",
    amount: movement.amount,
    cost: movement.concept === "inversion" && movement.serviceCost > 0 ? movement.serviceCost : null,
    costPurpose: movement.serviceCostPurpose ?? "",
    expressPreset: preset,
    expressOther: isExpress && preset === EXPRESS_OTHER ? movement.amount : null,
    coveredMonth: isExpress ? movement.assignedMonth : "",
    params: movement.params,
    manualSplit: movement.split,
    eventDate: movement.eventDate,
    incomeDate: movement.incomeDate,
    assignedMonth: movement.assignedMonth,
    description: movement.description ?? "",
    fileName: movement.document ?? null,
  };
}

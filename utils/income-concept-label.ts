import { INCOME_CONCEPT_OPTIONS } from "@/constants/nomina-modales.constants";
import type { NominaMovement } from "@/domain/entities/nomina-movement";

/** Nombre del concepto de un movimiento; en «Otro», el texto libre si lo tiene. */
export function incomeConceptLabel(movement: NominaMovement): string {
  if (movement.concept === "otro" && movement.otherConcept) return movement.otherConcept;
  return INCOME_CONCEPT_OPTIONS.find((option) => option.value === movement.concept)?.label ?? movement.concept;
}

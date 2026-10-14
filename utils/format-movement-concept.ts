import { MOVEMENT_CONCEPT_LABELS } from "@/constants/nomina-perfil-copy.constants";
import type { NominaMovement } from "@/domain/entities/nomina-movement";

/** Concepto legible del movimiento; «Otro» muestra su texto libre si lo tiene. */
export function formatMovementConcept(movement: NominaMovement): string {
  if (movement.concept === "otro") return movement.otherConcept?.trim() || MOVEMENT_CONCEPT_LABELS.otro;
  return MOVEMENT_CONCEPT_LABELS[movement.concept];
}

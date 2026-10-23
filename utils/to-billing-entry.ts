import type { NominaBillingEntry } from "@/domain/entities/nomina-billing-entry";
import type { NominaMovement } from "@/domain/entities/nomina-movement";

/** Lo que necesita el reparto de un ingreso nuevo de uno ya registrado. */
export function toBillingEntry(movement: NominaMovement): NominaBillingEntry {
  return {
    id: movement.id,
    concept: movement.concept,
    assignedMonth: movement.assignedMonth,
    amount: movement.amount,
    service: movement.split.service,
    serviceAssumed: movement.serviceAssumed,
    createdAt: movement.createdAt,
  };
}

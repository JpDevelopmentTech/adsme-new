import type { NominaIncomeConcept } from "@/domain/entities/nomina-movement";

/**
 * Lo mínimo de un ingreso ya registrado para repartir uno nuevo: el reparto
 * depende de lo facturado antes en el mismo Mes Asignado y del Servicio que ya
 * cubrió la Utilidad cuando AdsME lo asume.
 */
export interface NominaBillingEntry {
  id: string;
  concept: NominaIncomeConcept;
  assignedMonth: string;
  amount: number;
  service: number;
  serviceAssumed: boolean;
  createdAt: string;
}

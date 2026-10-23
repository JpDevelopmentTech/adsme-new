import type { NominaSplit } from "@/domain/entities/nomina-bucket";
import type { NominaTransactionParams } from "@/domain/entities/nomina-transaction-params";

/** Conceptos con los que se registra un ingreso. */
export type NominaIncomeConcept = "show" | "inversion" | "express" | "otro";

/** Movimiento de ingreso de un artista con su reparto congelado al registrarlo. */
export interface NominaMovement {
  id: string;
  concept: NominaIncomeConcept;
  /** Texto libre cuando el concepto es «Otro». */
  otherConcept?: string;
  amount: number;
  eventDate: string;
  incomeDate: string;
  /** Mes contable en formato `AAAA-MM` (en un Express, el mes que cubre). */
  assignedMonth: string;
  split: NominaSplit;
  /** Parámetros con los que se repartió, o `null` si es una Inversión Única. */
  params: NominaTransactionParams | null;
  /** `true` si AdsME asumía el Servicio cuando se registró. */
  serviceAssumed: boolean;
  /** Costo de servicio propio de una Inversión Única. */
  serviceCost: number;
  serviceCostPurpose?: string;
  description?: string;
  document?: string;
  /** Momento de registro: ordena el acumulado del mes. */
  createdAt: string;
}

/** Movimiento con el cliente al que pertenece. */
export interface NominaClientMovement extends NominaMovement {
  clientId: string;
}

/** Totales de todos los movimientos del artista. */
export interface NominaMovementTotals extends NominaSplit {
  count: number;
  amount: number;
}

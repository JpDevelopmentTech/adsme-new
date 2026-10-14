import type { NominaSplit } from "@/domain/entities/nomina-bucket";

/** Conceptos con los que se registra un ingreso. */
export type NominaIncomeConcept = "show" | "inversion" | "express" | "otro";

/** Movimiento de ingreso de un artista con su reparto ya calculado. */
export interface NominaMovement {
  id: string;
  concept: NominaIncomeConcept;
  /** Texto libre cuando el concepto es «Otro». */
  otherConcept?: string;
  amount: number;
  eventDate: string;
  incomeDate: string;
  /** Mes contable en formato `AAAA-MM`. */
  assignedMonth: string;
  split: NominaSplit;
  description?: string;
  document?: string;
}

/** Totales de todos los movimientos del artista. */
export interface NominaMovementTotals extends NominaSplit {
  count: number;
  amount: number;
}

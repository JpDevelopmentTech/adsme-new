import type { NominaIncomeConcept } from "@/domain/entities/nomina-movement";
import type { NominaTransactionParams } from "@/domain/entities/nomina-transaction-params";

/** Datos de un ingreso al registrarlo o editarlo; el reparto llega ya calculado. */
export interface NominaIncomeDraft {
  clientId: string;
  concept: NominaIncomeConcept;
  otherConcept: string | null;
  amount: number;
  eventDate: string;
  incomeDate: string;
  /** `AAAA-MM`. */
  assignedMonth: string;
  service: number;
  profit: number;
  investment: number;
  params: NominaTransactionParams | null;
  serviceAssumed: boolean;
  serviceCost: number;
  serviceCostPurpose: string | null;
  description: string | null;
  documentName: string | null;
}

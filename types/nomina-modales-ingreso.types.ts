import type { ReactNode } from "react";
import type { NominaSplit } from "@/domain/entities/nomina-bucket";
import type { NominaIncomeDraft } from "@/domain/entities/nomina-income-draft";
import type { NominaIncomeConcept, NominaMovement } from "@/domain/entities/nomina-movement";
import type { NominaTransactionParams as DomainTransactionParams } from "@/domain/entities/nomina-transaction-params";
import type { NominaSplitModel } from "@/types/nomina-modales.types";
import type { NominaModalArtist } from "@/types/nomina-modals.types";

/** Rubros de la distribución que se pueden ajustar a mano. */
export type NominaEditableBucket = "investment" | "service" | "profit";

export interface DistributionPanelProps {
  idPrefix: string;
  amount: number;
  split: NominaSplit;
  /** Sin él las cajas son de solo lectura. */
  onEdit?: (bucket: NominaEditableBucket, value: number) => void;
  note?: ReactNode;
}

export interface AmountBoxProps {
  id: string;
  label: string;
  color: string;
  value: number;
  /** «66,7% del monto». */
  share: string;
  onChange?: (value: number) => void;
  editLabel?: string;
}

/** Parámetros propios de una transacción (ver la entidad del dominio). */
export type NominaTransactionParams = DomainTransactionParams;

/** Datos del mes que necesita el modal para la nota del acumulado. */
export interface NominaIncomeContext {
  minShows: number;
  monthBilled: number;
  monthMovementCount: number;
}

/** Datos de la nota que acompaña a la distribución del ingreso. */
export interface NominaIncomeNoteInput {
  concept: NominaIncomeConcept;
  amount: number;
  cost: number;
  /** Mes `AAAA-MM` del acumulado (en Express, el que cubre). */
  month: string;
  model: NominaSplitModel;
  context: NominaIncomeContext;
}

export interface IncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  artist: NominaModalArtist;
  /** Con él, el modal abre en modo edición precargado. */
  movement?: NominaMovement;
}

/** Valores de los campos del formulario de ingreso. */
export interface NominaIncomeValues {
  concept: NominaIncomeConcept;
  otherConcept: string;
  amount: number | null;
  cost: number | null;
  costPurpose: string;
  expressPreset: string;
  expressOther: number | null;
  coveredMonth: string;
  params: NominaTransactionParams | null;
  manualSplit: NominaSplit | null;
  eventDate: string;
  incomeDate: string;
  assignedMonth: string;
  description: string;
  fileName: string | null;
}

/** Formulario de ingreso: valores, cambio parcial y derivados. */
export interface NominaIncomeFormState {
  values: NominaIncomeValues;
  set: (patch: Partial<NominaIncomeValues>) => void;
  /** Cambia un valor que altera el reparto: descarta los ajustes a mano. */
  setSplitInput: (patch: Partial<NominaIncomeValues>) => void;
  /** Cambia fechas o mes: en un ingreso nuevo, si cambia el mes, vuelve a repartir. */
  setMonthInput: (patch: Partial<NominaIncomeValues>) => void;
  editBucket: (bucket: NominaEditableBucket, value: number) => void;
  effectiveAmount: number;
  split: NominaSplit;
  artistParams: NominaTransactionParams;
  hasScalability: boolean;
  note: string;
  threshold: number;
  canSave: boolean;
  /** El ingreso como se guardaría ahora. */
  draft: NominaIncomeDraft;
}

export interface IncomeSectionProps {
  form: NominaIncomeFormState;
  artist: NominaModalArtist;
}

export interface ClientChipProps {
  artist: NominaModalArtist;
}

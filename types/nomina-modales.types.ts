import type { NominaServicePayer as DomainServicePayer, NominaSplitTerms } from "@/domain/entities/nomina-split-terms";
import type { NominaShowProgress } from "@/domain/entities/nomina-artist";
import type { NominaSocialNetwork } from "@/domain/entities/nomina-social";
import type { NominaIncomeConcept } from "@/domain/entities/nomina-movement";

/** Quién paga el Servicio (ver la entidad del dominio). */
export type NominaServicePayer = DomainServicePayer;

/** Lo que se edita del modelo de reparto; `service: null` = sugerido (2/7). */
export type NominaSplitSettings = NominaSplitTerms;

/** Modelo completo, con la nómina, el mínimo y el Servicio ya resuelto. */
export interface NominaSplitModel extends Omit<NominaSplitSettings, "service"> {
  nomina: number;
  minShows: number;
  service: number;
}

/** Veredicto de la caja de viabilidad. */
export type NominaViabilityTone = "viable" | "avisos" | "noViable";

/** Fila de la tabla de fases del modelo. */
export interface NominaPhaseRow {
  key: "servicio" | "hastaMinimo" | "despuesMinimo";
  label: string;
  how: string;
  accumulated: string;
  show: string;
  color: string;
}

/** Resultado de revisar un modelo de reparto. */
export interface NominaViability {
  tone: NominaViabilityTone;
  errors: string[];
  warnings: string[];
  confirmations: string[];
  phases: NominaPhaseRow[];
  ruler: NominaShowProgress;
  footnote: string;
}

/** Reparto de un show dentro del acumulado del mes. */
export interface NominaShowShare {
  service: number;
  profit: number;
  investment: number;
}

/** Entrada para repartir un ingreso en el modal. */
export interface NominaIncomeSplitInput {
  concept: NominaIncomeConcept;
  amount: number;
  /** Costo de servicio de una Inversión Única. */
  cost: number;
  model: NominaSplitModel;
  /** Lo facturado en el mes antes de este ingreso. */
  monthBilled: number;
  /** Servicio que ya cubrió la Utilidad ese mes (cuando AdsME lo asume). */
  serviceCovered: number;
}

/** Opción de un grupo de botones o de un `select`. */
export interface NominaChoice<TValue extends string> {
  value: TValue;
  label: string;
}

/** Resultado de revisar un enlace: error (bloquea) o aviso (se puede guardar). */
export type NominaSocialUrlCheck = "ok" | "invalid" | "foreign";

/** Datos fijos de una red social en el formulario de enlaces. */
export interface NominaSocialMeta {
  key: NominaSocialNetwork;
  label: string;
  color: string;
  domains: string[];
  placeholder: string;
}

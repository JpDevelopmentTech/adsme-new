import type { NominaExpenseDraft } from "@/domain/entities/nomina-expense-draft";
import type { NominaIncomeDraft } from "@/domain/entities/nomina-income-draft";
import type { NominaSocialLink } from "@/domain/entities/nomina-social";
import type { NominaSplitTerms } from "@/domain/entities/nomina-split-terms";

/** Respuesta de las acciones de Nómina: si salió bien y, si no, qué decir. */
export interface NominaActionState {
  ok: boolean;
  message: string | null;
}

export interface EnrollNominaArtistInput {
  clientId: string;
  nomina: number;
  minShows: number;
  startsOn: string;
  split: NominaSplitTerms;
}

export interface SaveNominaConfigInput {
  clientId: string;
  minShows: number;
  split: NominaSplitTerms;
}

export interface SaveNominaSocialsInput {
  clientId: string;
  socials: NominaSocialLink[];
}

/** Alta (sin `id`) o edición de un ingreso. */
export interface SaveNominaIncomeInput {
  id?: string;
  draft: NominaIncomeDraft;
}

/** Alta (sin `id`) o edición de un gasto. */
export interface SaveNominaExpenseInput {
  id?: string;
  draft: NominaExpenseDraft;
}

/** Ingreso o gasto a eliminar, con el artista para refrescar sus pantallas. */
export interface DeleteNominaRecordInput {
  id: string;
  clientId: string;
}

/** Estado de una acción de Nómina lanzada desde un modal o una fila. */
export interface NominaActionRunner<TInput> {
  run: (input: TInput) => void;
  isPending: boolean;
  error: string | null;
}

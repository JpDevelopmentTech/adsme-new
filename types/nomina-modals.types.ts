import type { NominaSplitTerms } from "@/domain/entities/nomina-split-terms";
import type { NominaEligibleClient } from "@/domain/entities/nomina-eligible-client";
import type { NominaArtistSummary } from "@/domain/entities/nomina-artist";
import type { NominaBillingEntry } from "@/domain/entities/nomina-billing-entry";
import type { NominaExpense } from "@/domain/entities/nomina-expense";
import type { NominaMovement } from "@/domain/entities/nomina-movement";
import type { NominaSocialLink } from "@/domain/entities/nomina-social";

/** Artista sobre el que actúa un modal: lo mínimo, su nómina y lo que necesita el reparto. */
export interface NominaModalArtist extends NominaArtistSummary {
  nomina: number;
  minShows: number;
  /** Modelo de reparto guardado del artista. */
  split: NominaSplitTerms;
  /** Ingresos ya registrados, para el acumulado del mes al repartir. */
  billing: NominaBillingEntry[];
}

export interface NewArtistButtonProps {
  /** Clientes que todavía no están en Nómina. */
  eligibleClients: NominaEligibleClient[];
}

export interface NewIncomeButtonProps {
  artist: NominaModalArtist;
  /** `primary`: píldora «Nuevo Ingreso»; `icon`: el «+» de la fila del roster. */
  variant: "primary" | "icon";
}

export interface NewExpenseButtonProps {
  artist: NominaModalArtist;
}

export interface ProfileActionsProps {
  artist: NominaModalArtist;
  socials: NominaSocialLink[];
  minShows: number;
  movementCount: number;
  /** Modelo de reparto guardado, para precargar la configuración. */
  split: NominaSplitTerms;
}

export interface MovementRowActionsProps {
  artist: NominaModalArtist;
  movement: NominaMovement;
}

export interface ExpenseRowActionsProps {
  artist: NominaModalArtist;
  expense: NominaExpense;
}

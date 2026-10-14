import type { NominaArtistSummary } from "@/domain/entities/nomina-artist";
import type { NominaExpense } from "@/domain/entities/nomina-expense";
import type { NominaMovement } from "@/domain/entities/nomina-movement";
import type { NominaSocialLink } from "@/domain/entities/nomina-social";

/** Artista sobre el que actúa un modal: lo mínimo más su nómina. */
export interface NominaModalArtist extends NominaArtistSummary {
  nomina: number;
}

export interface NewArtistButtonProps {
  /** Nombres ya usados, para avisar «Ya existe un artista con ese nombre.». */
  existingNames?: string[];
}

/** Datos opcionales del mes para el modal de ingreso (nota del acumulado). */
export interface NominaIncomeMonthProps {
  /** Mínimo de Shows del artista; sin él se usa el sugerido por su nómina. */
  minShows?: number;
  /** Facturado en el mes en curso antes del nuevo ingreso. */
  monthBilled?: number;
  monthMovementCount?: number;
}

export interface NewIncomeButtonProps extends NominaIncomeMonthProps {
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
  /** Meta de Utilidad fija del artista, para precargar la configuración. */
  fixedProfitGoal?: number | null;
  /** Si AdsME asume el Servicio del artista. */
  serviceAssumedByAdsme?: boolean;
}

export interface MovementRowActionsProps extends NominaIncomeMonthProps {
  artist: NominaModalArtist;
  movement: NominaMovement;
}

export interface ExpenseRowActionsProps {
  artist: NominaModalArtist;
  expense: NominaExpense;
}

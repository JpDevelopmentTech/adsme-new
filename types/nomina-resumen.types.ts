import type { NominaMonthKpis, NominaTopArtist } from "@/domain/entities/nomina-overview";

export interface ResumenKpiRowProps {
  kpis: NominaMonthKpis;
  /** Mes en curso `AAAA-MM`. */
  month: string;
}

export interface GrossIncomeCardProps {
  label: string;
  amount: number;
  note: string;
}

export interface TopArtistsPanelProps {
  artists: NominaTopArtist[];
  /** Si el roster tiene artistas, para elegir el texto del estado vacío. */
  hasArtists: boolean;
}

export interface TopArtistRowProps {
  artist: NominaTopArtist;
  position: number;
}

export interface TopArtistScalabilityProps {
  progress: NominaTopArtist["progress"];
}

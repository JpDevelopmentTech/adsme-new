import type { JobPlatform } from "@/domain/entities/job";
import type { ReportArtist, ReportArtistLaunch } from "@/domain/entities/report-artist";
import type { ReportJob } from "@/domain/entities/report-job";
import type {
  ReportPlatformMetrics,
  ReportTotals,
} from "@/domain/entities/report-metrics";

/** Acento de una tarjeta; cada uno tiñe el chip del icono, la cifra y su halo. */
export type ReportTone =
  | "violet"
  | "cyan"
  | "lime"
  | "magenta"
  | "warning"
  | "youtube"
  | "meta"
  | "tiktok";

/**
 * Icono de una métrica. Se referencia por clave y no por componente para que
 * los `utils` que arman las tarjetas no dependan de la capa de presentación.
 */
export type ReportMetricIcon =
  | "views"
  | "reach"
  | "impressions"
  | "clicks"
  | "spend"
  | "engagement"
  | "comments"
  | "shares"
  | "cost"
  | "campaigns"
  | "ratio";

/**
 * Línea inferior de la tarjeta. El diseño la usa para una variación semanal;
 * como todavía no hay histórico, aquí lleva una segunda métrica real que sitúa
 * la cifra principal (su reparto, su coste unitario o su volumen asociado).
 */
export interface ReportMetricNote {
  icon: ReportMetricIcon;
  value: string;
  label: string;
  tone: ReportTone;
}

export interface ReportMetric {
  label: string;
  value: string;
  icon: ReportMetricIcon;
  tone: ReportTone;
  note: ReportMetricNote;
}

export interface ReportPreviewProps {
  job: ReportJob;
  totals: ReportTotals;
  platforms: ReportPlatformMetrics[];
  /** Curva de cada plataforma; falta la que todavía no tiene serie importada. */
  trends: ReportTrends;
  /** Plataforma seleccionada en las pestañas; `null` las muestra todas. */
  activePlatform: JobPlatform | null;
  /** URL pública del propio reporte, para el botón de compartir. */
  reportUrl: string;
  /** Ruta del reporte, base de los enlaces de las pestañas. */
  basePath: string;
  /** Ruta del reporte consolidado del artista. */
  artistHref: string;
  /** Instante de render en ISO, para calcular «hace X» sin desajustes. */
  now: string;
}

export interface ReportTopbarProps {
  subtitle: string;
  platforms: JobPlatform[];
  activePlatform: JobPlatform | null;
  /** Ruta del reporte, base sobre la que se arman los enlaces de las pestañas. */
  basePath: string;
  syncedAt: string | null;
  now: string;
  reportUrl: string;
}

export interface ReportPlatformTabsProps {
  platforms: JobPlatform[];
  activePlatform: JobPlatform | null;
  basePath: string;
}

/**
 * Cifra que abre el reporte, en las palabras de quien lo lee. Es `null` cuando
 * todavía no hay alcance medido y no hay nada que titular.
 */
export interface ReportHeadline {
  value: string;
  caption: string;
}

export interface ReportHeroProps {
  job: ReportJob;
  headline: ReportHeadline | null;
}

export interface ReportMetricCardProps {
  metric: ReportMetric;
}

export interface ReportMetricGridProps {
  metrics: ReportMetric[];
}

export interface ReportPlatformSectionProps {
  metrics: ReportPlatformMetrics;
  /** Inversión total del reporte, para expresar el peso de esta plataforma. */
  totalSpend: number;
}

export interface ArtistHeroProps {
  artist: ReportArtist;
  headline: ReportHeadline | null;
  activeCampaigns: number;
}

export interface ReportSplitCardProps {
  platforms: ReportPlatformMetrics[];
}

export interface ReportAdPreviewProps {
  job: ReportJob;
}

export interface ReportFooterProps {
  label: string;
}

export interface ShareReportButtonProps {
  url: string;
  label: string;
}

export interface ArtistReportProps {
  artist: ReportArtist;
  /** Lanzamiento desde el que se llegó, para poder volver. */
  originTitle: string;
  originHref: string;
  reportUrl: string;
}

export interface ArtistLaunchesTableProps {
  launches: ReportArtistLaunch[];
}

export interface ArtistPlatformCardsProps {
  platforms: ReportPlatformMetrics[];
}

/** Una porción de un desglose porcentual del reporte. */
export interface ReportShare {
  label: string;
  percent: number;
}

export interface ReportTerritory {
  name: string;
  percent: number;
}

export interface ReportAudience {
  gender: ReportShare[];
  age: ReportShare[];
}

export interface ReportHouseholds {
  income: ReportShare[];
  parental: ReportShare[];
}

export interface ReportKeyword {
  term: string;
  /** Volumen ya formateado, como lo entrega la plataforma. */
  volume: string;
}

/** Serie temporal de una métrica, para el gráfico de evolución. */
export interface ReportSeries {
  label: string;
  points: number[];
  /** Etiquetas del eje horizontal, repartidas de extremo a extremo. */
  ticks: string[];
}

/** Curvas del reporte por plataforma; ausente la que no tiene datos diarios. */
export type ReportTrends = Partial<Record<JobPlatform, ReportSeries>>;

export interface ReportTrendChartProps {
  series: ReportSeries;
  subtitle: string;
  /** Color de la línea y del degradado, según la plataforma. */
  color: string;
  /** Marca la curva como dato de muestra en lugar de métrica importada. */
  isSample?: boolean;
}

export interface ReportTrendSectionProps {
  platform: JobPlatform;
  /** Serie importada de la plataforma; `undefined` si todavía no hay ninguna. */
  series: ReportSeries | undefined;
  /** Período que cubre la curva, ya formateado para el subtítulo. */
  period: string;
}

export interface ReportTerritoriesCardProps {
  territories: ReportTerritory[];
}

export interface ReportAudienceCardProps {
  audience: ReportAudience;
}

export interface ReportHouseholdsCardProps {
  households: ReportHouseholds;
}

export interface ReportKeywordsCardProps {
  keywords: ReportKeyword[];
}

export interface ReportBarListProps {
  title: string;
  shares: ReportShare[];
  /** Color de las barras; por defecto el violeta de marca. */
  color?: string;
}

export interface ReportPasswordGateProps {
  /** Código corto del enlace, que el formulario devuelve al validar. */
  code: string;
  /** Nombre del lanzamiento, si se pudo saber sin abrir el reporte. */
  jobTitle: string | null;
  hasError: boolean;
}

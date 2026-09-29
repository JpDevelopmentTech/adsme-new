import type { JobPlatform } from "@/domain/entities/job";
import type { ReportArtist, ReportArtistLaunch } from "@/domain/entities/report-artist";
import type { ReportJob } from "@/domain/entities/report-job";
import type { ReportSection } from "@/domain/entities/report-section";
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
  /** Serie diaria del lanzamiento; `null` si todavía no hay ningún día con entrega. */
  growth: ReportGrowth | null;
  /** Vistas de YouTube presupuestadas frente a generadas; `null` sin optimización de CPV. */
  cpvComparison: ReportCpvComparison | null;
  /** Sexo y edad de quien vio la pauta; `null` si ninguna plataforma lo entregó. */
  audience: ReportAudience | null;
  /** Regiones de las que vino la gente; vacío si ninguna plataforma las entregó. */
  territories: ReportTerritory[];
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
  /** Última importación de métricas; `null` mientras no haya ninguna. */
  syncedAt: string | null;
  /** Momento de render en ISO, para que «hace X» no varíe en hidratación. */
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

export interface ArtistHeroProps {
  artist: ReportArtist;
  headline: ReportHeadline | null;
  activeCampaigns: number;
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
  /** Si el lanzamiento de origen deja ver la inversión. */
  showSpend: boolean;
}

export interface ArtistLaunchesTableProps {
  launches: ReportArtistLaunch[];
  showSpend: boolean;
}

export interface ArtistPlatformCardsProps {
  platforms: ReportPlatformMetrics[];
  showSpend: boolean;
}

/** Una porción de un desglose porcentual del reporte. */
/** Métrica de `ReportPlatformMetrics` que la columna sabe enseñar. */
export type ReportMetricKey =
  | "reach"
  | "impressions"
  | "videoPlays"
  | "clicks"
  | "engagement"
  | "comments"
  | "shares"
  | "reactions";

/** Una métrica ya formateada, lista para pintar en una fila. */
export interface ReportStat {
  label: string;
  value: string;
}

export interface ReportStatCardProps {
  stat: ReportStat;
}

export interface ReportPlatformDetailProps {
  metrics: ReportPlatformMetrics;
  showSpend: boolean;
}

export interface ReportPlatformDetailsProps {
  platforms: ReportPlatformMetrics[];
  /** Plataforma elegida en las pestañas; `null` las muestra todas. */
  activePlatform: JobPlatform | null;
  showSpend: boolean;
}

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

/** Un día del lanzamiento, con las reproducciones repartidas por plataforma. */
export interface ReportGrowthDay {
  date: string;
  byPlatform: Record<JobPlatform, number>;
  total: number;
  /** El día todavía no ha llegado: se dibuja como carril vacío, no como cero. */
  isPending: boolean;
}

/** Serie diaria del lanzamiento entero, con el desglose por plataforma. */
export interface ReportGrowth {
  days: ReportGrowthDay[];
  /**
   * Día más alto de una sola plataforma. Las áreas se superponen en vez de
   * apilarse, así que la escala la fija la mayor curva, no la suma de las tres.
   */
  platformPeak: number;
  /** Reproducciones del período por plataforma, para rotular la leyenda. */
  totals: Record<JobPlatform, number>;
  /** Dónde cae hoy sobre el período, en porcentaje, para rotular el eje. */
  todayPercent: number;
}

/** Una plataforma como serie del área, en el formato que espera ApexCharts. */
export interface ReportGrowthSeries {
  platform: JobPlatform;
  /** Nombre con el que la plataforma aparece en el tooltip. */
  name: string;
  color: string;
  /** Un punto por día del período; `null` en los que aún no han llegado. */
  data: { x: string; y: number | null }[];
}

export interface ReportGrowthChartProps {
  growth: ReportGrowth;
  /** Descripción de la gráfica para quien no puede verla. */
  label: string;
}

export interface ReportGrowthPanelProps {
  growth: ReportGrowth;
  /** Período de la pauta, ya formateado, para el subtítulo. */
  period: string;
}

export interface ReportSummaryStripProps {
  totals: ReportTotals;
  /** Presupuesto comprometido del trabajo, para el porcentaje gastado. */
  investment: number;
  /** Cifras que el gestor ocultó al cliente. */
  hiddenSections: ReportSection[];
}

export interface ReportPlatformsPanelProps {
  platforms: ReportPlatformMetrics[];
  activePlatform: JobPlatform | null;
  basePath: string;
  showSpend: boolean;
}

export interface ReportPlatformColumnProps {
  metrics: ReportPlatformMetrics;
  /** Reproducciones de todo el lanzamiento, para el peso de esta plataforma. */
  totalPlays: number;
  /** Si el pie enseña lo invertido o solo el número de campañas. */
  showSpend: boolean;
}

export interface ReportTerritoriesCardProps {
  territories: ReportTerritory[];
}

export interface ReportAudienceCardProps {
  audience: ReportAudience;
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

/** Un día de la comparación de vistas de YouTube, en acumulado. */
export interface ReportCpvDay {
  date: string;
  /** Vistas que el presupuesto compromete hasta ese día, a ritmo constante. */
  planned: number;
  /** Vistas reales acumuladas; `null` en los días que aún no han llegado. */
  actual: number | null;
}

/**
 * Vistas presupuestadas frente a las generadas en YouTube. Lo presupuestado
 * sale de la parte de la inversión que toca a YouTube dividida por el CPV
 * cobrado; lo generado, de la serie diaria importada de Google Ads.
 */
export interface ReportCpvComparison {
  days: ReportCpvDay[];
  /** Parte de la inversión del trabajo asignada a YouTube. */
  budget: number;
  chargedCpv: number;
  /** Vistas que compromete el presupuesto en todo el período. */
  plannedViews: number;
  /** Lo comprometido hasta hoy, para comparar con lo que ya se generó. */
  plannedToDate: number;
  actualToDate: number;
  /** Lo que ha salido cada vista con el presupuesto consumido hasta hoy. */
  effectiveCpv: number | null;
  /** Diferencia de lo generado sobre lo comprometido a la fecha, en porcentaje. */
  deltaPercent: number | null;
  isFinished: boolean;
}

export interface ReportCpvPanelProps {
  comparison: ReportCpvComparison;
  /** Con la inversión oculta, las cifras no enseñan el presupuesto. */
  showSpend: boolean;
  /** Período de la pauta, ya formateado, para el subtítulo. */
  period: string;
}

export interface ReportCpvChartProps {
  days: ReportCpvDay[];
  /** Descripción de la gráfica para quien no puede verla. */
  label: string;
}

export interface ReportCpvStat {
  label: string;
  value: string;
  note: string;
}

import {
  Activity,
  Eye,
  Heart,
  MessageCircle,
  MousePointerClick,
  Play,
  Share2,
  Megaphone,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { ReportMetricIcon, ReportMetricKey } from "@/types/report.types";
import { formatExactNumber } from "@/utils/format-exact-number";

export const REPORT_COPY = {
  territoriesTitle: "Territorios",
  territoriesSubtitle: "REPARTO POR REGIÓN",
  audienceTitle: "Audiencia",
  audienceGender: "SEXO",
  audienceAge: "EDAD",
  trendSubtitle: (platform: string) => `Últimos 30 días · ${platform}`,
  trendPeriod: (platform: string, period: string) =>
    `Acumulado del período · ${period} · ${platform}`,
  trendPlays: "Reproducciones acumuladas",
  trendImpressions: "Impresiones acumuladas",
  crossSummaryTitle: "Resumen del lanzamiento · las tres plataformas juntas",
  audienceSectionTitle: "Tu público",
  audienceSectionSubtitle: "quién vio tus anuncios",
  otherLaunches: "Otros lanzamientos",
  platformTabs: "Plataformas del reporte",
  liveReport: "Reporte en vivo",
  live: "En vivo",
  allPlatforms: "Todas",
  platformsTitle: "Dónde te vieron",
  platformsSubtitle: "Reparto de las reproducciones entre plataformas",
  platformFoot: (campaigns: number, spend: string) =>
    `${campaigns} ${campaigns === 1 ? "campaña" : "campañas"} · ${spend}`,
  detailTitle: "Cada plataforma en detalle",
  detailSubtitle: "Todo lo que reportó cada cuenta durante el período",
  detailCampaigns: (campaigns: number) =>
    `${campaigns} ${campaigns === 1 ? "campaña" : "campañas"}`,
  growthTitle: "Cómo fue creciendo",
  growthSubtitle: (period: string) => `Reproducciones por día · ${period}`,
  growthEmpty:
    "Todavía no hay días con entrega que dibujar. En cuanto la pauta empiece a moverse, aparecerán aquí automáticamente.",
  adEyebrow: "YouTube · in-stream saltable",
  adBody:
    "El creativo que se mostró antes de los vídeos durante todo el período. Quien no lo saltó vio los primeros cinco segundos completos.",
  share: "Compartir",
  copied: "Enlace copiado",
  updated: (relative: string) => `Actualizado ${relative}`,
  neverSynced: "Sin sincronizar todavía",
  crossSummary: "Resumen del lanzamiento",
  spendShare: (percent: string) => `${percent} de la inversión`,
  footer: "Datos actualizados automáticamente cada hora · Reporte generado por adsme",
  artistFooter: "Datos consolidados actualizados cada hora · adsme",
  evolutionTitle: "Evolución del lanzamiento",
  evolutionSubtitle: "Vistas diarias · últimos 30 días",
  evolutionEmpty:
    "Todavía no hay días con entrega que dibujar. En cuanto la pauta empiece a gastar, la curva aparecerá aquí automáticamente.",
  splitTitle: "Reparto por plataforma",
  splitSubtitle: "Peso de cada plataforma sobre las reproducciones del lanzamiento",
  noMetricsTitle: "Todavía no hay métricas que mostrar",
  noMetricsBody:
    "Este lanzamiento aún no tiene campañas vinculadas. En cuanto empiecen a entregar, sus resultados aparecerán aquí automáticamente.",
  adPreviewTitle: "Así se veía tu anuncio",
  adPreviewTag: "In-stream · Saltable",
  adBadge: "Anuncio",
  adSkip: "Saltar anuncio",
  artistLink: (name: string) => `Ver el reporte consolidado de ${name}`,
  backToLaunch: (title: string) => `Volver a ${title}`,
  artistSubtitle: "Reporte del artista",
  artistSummary: "Resumen de todos tus lanzamientos",
  artistLaunches: "Lanzamientos",
  artistPlatforms: "Dónde te vieron",
  artistActiveCampaigns: (count: number) =>
    count === 1 ? "1 campaña activa" : `${count} campañas activas`,
  launchesSummary: (total: number, active: number) =>
    `${total} ${total === 1 ? "lanzamiento" : "lanzamientos"} · ${active} ${
      active === 1 ? "activo" : "activos"
    }`,
  artistPlatformNote: (percent: string, spend: string | null) =>
    spend ? `${percent} de las reproducciones · ${spend} invertidos` : `${percent} de las reproducciones`,
  view: "Ver",
  noLaunchLink: "Sin enlace",
} as const;

/**
 * Colores de la barra partida por sexo, en el orden en que llegan las porciones
 * (mujeres, hombres, sin determinar): lila, blanco y blanco tenue.
 */
export const REPORT_GENDER_COLORS = ["var(--color-lilac)", "#ffffffcc", "#ffffff40"] as const;

/** Barras de las franjas de edad: blancas, para no competir con el lila de las regiones. */
export const REPORT_AGE_BAR_COLOR = "#ffffffcc";

/** Las tres cifras de contexto que acompañan al titular del reporte. */
export const REPORT_SUMMARY_COPY = {
  plays: "Reproducciones",
  engagement: "Interacciones",
  spend: "Inversión",
  campaigns: (count: number) =>
    count === 1 ? "1 campaña" : `${count} campañas`,
  social: (count: number) =>
    `${formatExactNumber(count)} ${count === 1 ? "comentario o compartido" : "comentarios y compartidos"}`,
  budget: (percent: string) => `${percent} del presupuesto`,
} as const;

/**
 * Métricas que cada plataforma enseña, una por tarjeta, en el orden en que le
 * importan a quien lee el reporte: primero cuánta gente, después cuánto se le
 * mostró y por último qué hizo con ello. La inversión cierra la serie porque es
 * la única que no habla de la audiencia sino del bolsillo.
 */
export const PLATFORM_STATS: { key: ReportMetricKey; label: string }[] = [
  { key: "reach", label: "Personas alcanzadas" },
  { key: "impressions", label: "Impresiones" },
  { key: "videoPlays", label: "Reproducciones" },
  { key: "clicks", label: "Clics" },
  { key: "engagement", label: "Interacciones" },
  { key: "comments", label: "Comentarios" },
  { key: "shares", label: "Compartidos" },
  { key: "reactions", label: "Reacciones" },
];

/** Cierra la serie de tarjetas; no es una métrica de audiencia como el resto. */
export const PLATFORM_SPEND_LABEL = "Inversión";

/** Columna de la tabla de lanzamientos que se retira con la inversión oculta. */
export const ARTIST_SPEND_HEADER = "Inversión";

/** Encabezados de la tabla de lanzamientos del reporte consolidado. */
export const ARTIST_TABLE_HEADERS: readonly string[] = [
  "Lanzamiento",
  "Tipo",
  "Estado",
  "Views",
  ARTIST_SPEND_HEADER,
  "Enlace",
];

/**
 * Provisional: el reporte enseña las tres plataformas aunque el trabajo no
 * tenga campañas en alguna, para poder revisar con el cliente cómo queda el
 * informe completo. Las que no tienen datos salen en cero, no inventadas.
 * Cambiar a `false` para que solo aparezcan las plataformas contratadas.
 */
export const SHOW_ALL_REPORT_PLATFORMS = true;

export const REPORT_METRIC_ICONS: Record<ReportMetricIcon, LucideIcon> = {
  views: Play,
  reach: Users,
  impressions: Eye,
  clicks: MousePointerClick,
  spend: Wallet,
  engagement: Heart,
  comments: MessageCircle,
  shares: Share2,
  cost: Activity,
  campaigns: Megaphone,
  ratio: Activity,
};

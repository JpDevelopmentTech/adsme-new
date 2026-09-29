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
import type { JobPlatform } from "@/domain/entities/job";
import type {
  ReportMetricIcon,
  ReportMetricKey,
  ReportTone,
} from "@/types/report.types";
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
  audienceSectionTitle: "Tu público · quién vio tus anuncios",
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
  view: "Ver",
  noLaunchLink: "Sin enlace",
} as const;

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

/** Nombre comercial y redes de cada plataforma, tal como los escribe el diseño. */
/**
 * Provisional: el reporte enseña las tres plataformas aunque el trabajo no
 * tenga campañas en alguna, para poder revisar con el cliente cómo queda el
 * informe completo. Las que no tienen datos salen en cero, no inventadas.
 * Cambiar a `false` para que solo aparezcan las plataformas contratadas.
 */
export const SHOW_ALL_REPORT_PLATFORMS = true;

export const REPORT_PLATFORM_SECTION: Record<
  JobPlatform,
  { title: string; networks: string; tone: ReportTone }
> = {
  youtube: { title: "YouTube Ads", networks: "Google Ads", tone: "youtube" },
  meta: {
    title: "Meta Ads",
    networks: "Facebook · Instagram · Reels",
    tone: "meta",
  },
  tiktok: { title: "TikTok Ads", networks: "Spark Ads · In-feed", tone: "tiktok" },
};

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

/**
 * Cada acento aporta tres piezas: el fondo tenue del chip, el color del icono y
 * el halo de la cifra. Se escriben completas porque Tailwind necesita ver la
 * clase literal para generarla.
 */
export const REPORT_TONE_CLASSES: Record<
  ReportTone,
  { chip: string; icon: string; text: string; border: string }
> = {
  violet: {
    chip: "bg-brand-violet/12",
    icon: "text-brand-violet",
    text: "text-brand-violet",
    border: "border-brand-violet/40",
  },
  cyan: {
    chip: "bg-data-cyan/12",
    icon: "text-data-cyan",
    text: "text-data-cyan",
    border: "border-data-cyan/40",
  },
  lime: {
    chip: "bg-data-lime/12",
    icon: "text-data-lime",
    text: "text-data-lime",
    border: "border-data-lime/40",
  },
  magenta: {
    chip: "bg-brand-magenta/12",
    icon: "text-brand-magenta",
    text: "text-brand-magenta",
    border: "border-brand-magenta/40",
  },
  warning: {
    chip: "bg-warning/12",
    icon: "text-warning",
    text: "text-warning",
    border: "border-warning/40",
  },
  youtube: {
    chip: "bg-[#C4553F]/12",
    icon: "text-[#C4553F]",
    text: "text-[#C4553F]",
    border: "border-[#C4553F]/40",
  },
  meta: {
    chip: "bg-[#4A6FA5]/12",
    icon: "text-[#4A6FA5]",
    text: "text-[#4A6FA5]",
    border: "border-[#4A6FA5]/40",
  },
  tiktok: {
    chip: "bg-[#2E8C87]/12",
    icon: "text-[#2E8C87]",
    text: "text-[#2E8C87]",
    border: "border-[#2E8C87]/40",
  },
};

/** Color del halo de la cifra principal, en el orden de `REPORT_TONE_CLASSES`. */
export const REPORT_TONE_GLOW: Record<ReportTone, string> = {
  violet: "#1F2A2733",
  cyan: "#5B7C8D44",
  lime: "#7D8F5E44",
  magenta: "#6E8F8044",
  warning: "#8F5E1444",
  youtube: "#C4553F55",
  meta: "#4A6FA566",
  tiktok: "#2E8C8755",
};

/** Barras del reparto por plataforma, con el color de cada marca. */
export const REPORT_PLATFORM_BAR: Record<JobPlatform, string> = {
  youtube: "linear-gradient(90deg, #C4553F 0%, #C4553F99 100%)",
  meta: "linear-gradient(90deg, #4A6FA5 0%, #4A6FA599 100%)",
  tiktok: "linear-gradient(90deg, #2E8C87 0%, #5FB3AE 100%)",
};

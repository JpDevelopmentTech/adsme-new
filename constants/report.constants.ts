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
import type { ReportMetricIcon, ReportTone } from "@/types/report.types";

export const REPORT_COPY = {
  territoriesTitle: "Territorios y ciudades",
  territoriesSubtitle: "REPARTO POR CIUDAD",
  audienceTitle: "Audiencia",
  audienceGender: "SEXO",
  audienceAge: "EDAD",
  householdsTitle: "Ingresos y estado parental",
  householdsIncome: "INGRESOS DEL HOGAR",
  householdsParental: "ESTADO PARENTAL",
  keywordsTitle: "Top palabras clave",
  trendSubtitle: (platform: string) => `Últimos 30 días · ${platform}`,
  trendPeriod: (platform: string, period: string) =>
    `Acumulado del período · ${period} · ${platform}`,
  trendPlays: "Reproducciones acumuladas",
  trendImpressions: "Impresiones acumuladas",
  crossSummaryTitle: "Resumen del lanzamiento · las tres plataformas juntas",
  audienceSectionTitle: "Tu público · quién vio tus anuncios",
  liveReport: "Reporte en vivo",
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
  adPreviewTitle: "Vista previa del anuncio",
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

/** Encabezados de la tabla de lanzamientos del reporte consolidado. */
export const ARTIST_TABLE_HEADERS = [
  "Lanzamiento",
  "Tipo",
  "Estado",
  "Views",
  "Inversión",
  "Enlace",
] as const;

/** Nombre comercial y redes de cada plataforma, tal como los escribe el diseño. */
/**
 * Provisional: el reporte enseña las tres plataformas aunque el trabajo no
 * tenga campañas en alguna, para poder revisar con el cliente cómo queda el
 * informe completo. Las que no tienen datos salen en cero, no inventadas.
 * Cambiar a `false` para que solo aparezcan las plataformas contratadas.
 */
export const SHOW_ALL_REPORT_PLATFORMS = true;

/**
 * Provisional: territorios, audiencia, evolución y palabras clave se rellenan
 * con los datos de muestra del diseño porque todavía no se importan de las
 * plataformas. Van marcados en pantalla para que nadie los lea como reales.
 * Al conectar los datos de verdad, poner en `false` y borrar
 * `constants/report-sample.constants.ts`.
 */
export const SHOW_SAMPLE_REPORT_SECTIONS = true;

/** Aviso que acompaña a toda sección alimentada con datos de muestra. */
export const SAMPLE_DATA_LABEL = "Datos de muestra";

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
    chip: "bg-[#FF3B30]/12",
    icon: "text-[#FF3B30]",
    text: "text-[#FF3B30]",
    border: "border-[#FF3B30]/40",
  },
  meta: {
    chip: "bg-[#0866FF]/12",
    icon: "text-[#0866FF]",
    text: "text-[#0866FF]",
    border: "border-[#0866FF]/40",
  },
  tiktok: {
    chip: "bg-[#FE2C55]/12",
    icon: "text-[#FE2C55]",
    text: "text-[#FE2C55]",
    border: "border-[#FE2C55]/40",
  },
};

/** Color del halo de la cifra principal, en el orden de `REPORT_TONE_CLASSES`. */
export const REPORT_TONE_GLOW: Record<ReportTone, string> = {
  violet: "#7C3AED66",
  cyan: "#0891B255",
  lime: "#4D7C0F55",
  magenta: "#DB277766",
  warning: "#B4530955",
  youtube: "#FF3B3055",
  meta: "#0866FF66",
  tiktok: "#FE2C5555",
};

/** Barras del reparto por plataforma, con el color de cada marca. */
export const REPORT_PLATFORM_BAR: Record<JobPlatform, string> = {
  youtube: "linear-gradient(90deg, #FF3B30 0%, #FF3B3099 100%)",
  meta: "linear-gradient(90deg, #0866FF 0%, #0866FF99 100%)",
  tiktok: "linear-gradient(90deg, #FE2C55 0%, #25F4EE 100%)",
};
